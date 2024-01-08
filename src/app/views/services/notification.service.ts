import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Socket ,io} from 'socket.io-client';
import { KeycloakService } from 'keycloak-angular';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  PATH_OF_API = 'http://localhost:3003';

  private socket1: Socket;
  private socket2: Socket;

  constructor(private keycloakService: KeycloakService, private httpclient: HttpClient) {
    this.socket1 = this.createSocket('http://localhost:3001');
    this.socket2 = this.createSocket('http://localhost:3005');

    this.init();
  }

  private createSocket(url: string): Socket {
    return io(url, { transports: ['websocket'] });
  }

  listenForNotifications(socket: Socket): Observable<string> {
    return new Observable<string>((observer) => {
      socket.on('notification', (data: any) => {
        location.reload();

        observer.next(data.message);
        const formData = {
          userId: data.userId,
          message: data.message,
        };
        this.add(formData).subscribe(
          (response) => {
            console.log(response);
          },
        );
      });
    });
  }

  public add(form: any) {
    return this.httpclient.post(`${this.PATH_OF_API}/notification/`, form);
  }

  private init(): void {
    this.listenForNotifications(this.socket1).subscribe((data) => {
      console.log('Socket 1:', data);
    });

    this.listenForNotifications(this.socket2).subscribe((data) => {
      console.log('Socket 2:', data);
    });
  }

  getNotifications() {
    return this.httpclient.get(`${this.PATH_OF_API}/notification/${this.keycloakService.getKeycloakInstance().tokenParsed!!.sub}`);
  }

  getNotificationNumber() {
    return this.httpclient.get(`${this.PATH_OF_API}/unreadNotification/${this.keycloakService.getKeycloakInstance().tokenParsed!!.sub}`);
  }
  resetNotificationNumber() {
    return this.httpclient.put(`${this.PATH_OF_API}/notification/${this.keycloakService.getKeycloakInstance().tokenParsed!!.sub}`,null);

  }



}
