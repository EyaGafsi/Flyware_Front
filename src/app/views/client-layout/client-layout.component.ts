import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { NotificationService } from '../services/notification.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-client-layout',
  templateUrl: './client-layout.component.html',
  styleUrls: ['./client-layout.component.css']
})
export class ClientLayoutComponent implements OnInit {
  notifNumber:any;
  number:any;
  isOnEmployeePage: boolean = false;
  notifications:any;
  role: string[] = []
  constructor(private notificationService:NotificationService,private keycloakService: KeycloakService) {


   }
  isDropdownOpen: boolean = false;

  ngOnInit(): void {
   this.getNotificationNumber();
   this.getNotifications();
   this.getRole();

  }
  isLoggedIn(): boolean {
    return this.keycloakService.isLoggedIn();
  }
  getNotifications(){  this.notificationService.getNotifications().subscribe(
    notifications => {
      this.notifications = notifications;
      console.log(this.notifications);

    },
    error => {
      console.error('Error fetching notifications:', error);
    }
  );}
  getNotificationNumber(){  this.notificationService.getNotificationNumber().subscribe(
    notifNumber => {
      this.notifNumber = notifNumber;
      console.log(this.notifNumber);

    },
    error => {
      console.error('Error fetching notification number:', error);
    }
  );}
  login(): void {
    this.keycloakService.login();
  }

  logout(): void {
    this.keycloakService.logout("http://localhost:4200/");
  }


  noticationNumber(){    this.isDropdownOpen = !this.isDropdownOpen;

    this.number=this.notifNumber;
    this.notificationService.resetNotificationNumber().subscribe(
      notifNumber => {
        this.getNotificationNumber();
        console.log(notifNumber);

      },
      error => {
        console.error('Error reseting notification number:', error);
      }
    );
  }
  getRole(){this.role = this.keycloakService.getUserRoles();console.log(this.role);
  }

}
