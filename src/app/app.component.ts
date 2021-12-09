import { Component } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError, NavigationCancel } from '@angular/router';
import { AuthService } from './user/auth.service';


import {slideInAnimation} from './app.animation';

@Component({
  selector: 'pm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations:[slideInAnimation]
})
export class AppComponent {
  pageTitle = 'Acme Product Management';
  loading=true;

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }

  get userName(): string {
    if (this.authService.currentUser) {
      return this.authService.currentUser.userName;
    }
    return '';
  }

  constructor(private authService: AuthService, private router:Router) {
    router.events.subscribe(
      (event:Event)=>{
         this.checkRouterEvent(event)
      }
    )
  }

  logOut(): void {
    this.authService.logout();
    this.router.navigateByUrl('/welcome');
    console.log('Log out');
  }

  checkRouterEvent(event:Event){

     if(event instanceof NavigationStart){
       this.loading=true;
     }
     
     if(event instanceof NavigationCancel ||
        event instanceof NavigationEnd ||
        event instanceof NavigationError){
          this.loading=false;
        }
  }
}
