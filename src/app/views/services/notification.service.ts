import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { Socket,io } from 'socket.io-client';
import { RxStompService } from './rx-stomp-service.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private socket: Socket;

  private notifications: string[] = [];
  private lastNotification:any;
  private unreadNotifications = 0;
  private notificationsSubject: Subject<string[]> = new Subject<string[]>();
  private notificationNumberSubject: Subject<number> = new Subject<number>();
  notification: string='';

  constructor(private stompService: RxStompService) {
    this.socket = io('http://localhost:3001', { transports: ['websocket'] });
    this.init();

  }

  listenForNotifications(): Observable<string> {
    return new Observable<string>(observer => {
      this.socket.on('notification', (data: string) => {
        observer.next(data);
      });
    });
  }


  private init(): void {
    const storedNotifications = localStorage.getItem('notifications');
    if (storedNotifications) {
      this.notifications = JSON.parse(storedNotifications);
    }

    const storedUnreadNotifications = localStorage.getItem('unreadNotifications');
    if (storedUnreadNotifications) {
      this.unreadNotifications = JSON.parse(storedUnreadNotifications);
    }

    this.listenForNotifications().subscribe(data => {
      this.notification = data;
console.log(this.notification)  ;
if (this.notification !== this.lastNotification) {
  this.notifications.push(this.notification);
  this.unreadNotifications = this.unreadNotifications + 1;
  this.lastNotification = this.notification;
  localStorage.setItem('notifications', JSON.stringify(this.notifications));
  localStorage.setItem('unreadNotifications', JSON.stringify(this.unreadNotifications));
  this.notificationsSubject.next(this.notifications.slice().reverse());
  this.notificationNumberSubject.next(this.unreadNotifications);
}  });


  }

  getNotifications(): string[] {
    return this.notifications.slice().reverse();
  }

  getNotificationNumber() {
    return this.unreadNotifications;
  }
  getNotificationsObservable(): Observable<string[]> {
    return this.notificationsSubject.asObservable();
  }

  // Exposer l'Observable pour le nombre de notifications non lues
  getNotificationNumberObservable(): Observable<number> {
    return this.notificationNumberSubject.asObservable();
  }

  resetNotificationNumber() {
    this.unreadNotifications = 0;
    localStorage.setItem('unreadNotifications', JSON.stringify(this.unreadNotifications));
    this.notificationNumberSubject.next(this.unreadNotifications);

  }



}
