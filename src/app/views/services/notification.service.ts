import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { Socket,io } from 'socket.io-client';
import { KeycloakService } from 'keycloak-angular';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  PATH_OF_API = "http://localhost:3003";

  private socket: Socket;
<<<<<<< HEAD
  private notifications:any;
  private notifNumber:any;
=======
>>>>>>> 1459f06eb693b6483cd05cbc177f59143d69fdf4

  constructor(private keycloakService: KeycloakService,private httpclient: HttpClient) {
    this.socket = io('http://localhost:3001', { transports: ['websocket'] });
    this.init();

  }

  listenForNotifications(): Observable<string> {

    return new Observable<string>(observer => {
      this.socket.on('notification', (data: any) => {
        location.reload();


        observer.next(data.message);
        const formData = {
          userId: data.userId,
          message: data.message,
        };
        this.add(formData).subscribe(
          response => {
            console.log(response);


          },

        );

      });
    });
  }

  public add(form: any) {
    return this.httpclient.post(`${this.PATH_OF_API}/notification/`,form);
  }
  private init(): void {


    this.listenForNotifications().subscribe(data => {console.log(data)
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
