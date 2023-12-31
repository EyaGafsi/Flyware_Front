import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { NotificationService } from '../services/notification.service';
@Component({
  selector: 'app-client-layout',
  templateUrl: './client-layout.component.html',
  styleUrls: ['./client-layout.component.css']
})
export class ClientLayoutComponent implements OnInit {
  notifNumber:any;
  number:any;
  isOnEmployeePage: boolean = false;
  notif:string[];

  constructor(private notificationService:NotificationService,private keycloakService: KeycloakService, private router: Router) {  this.notif=this.notificationService.getNotifications();this.notifNumber=this.notificationService.getNotificationNumber(); }

  ngOnInit(): void {this.notificationService.getNotificationsObservable().subscribe(
    (notifications) => {
      this.notif = notifications;
    }
  );

  this.notificationService.getNotificationNumberObservable().subscribe(
    (notificationNumber) => {
      this.notifNumber = notificationNumber;
    });
   this.router.events.subscribe((event) => {
    if (event instanceof NavigationEnd) {
      this.isOnEmployeePage = this.router.url === '/employee';
    }
  });
  }
  isLoggedIn(): boolean {
    return this.keycloakService.isLoggedIn();
  }

  login(): void {
    this.keycloakService.login();
  }

  logout(): void {
    this.keycloakService.logout("http://localhost:4200/");
  }
  noticationNumber(){
    this.number=this.notifNumber;
    this.notificationService.resetNotificationNumber();
  }
}
