import { Component } from '@angular/core';

import { AuthService } from './user/auth.service';
import {Router,Event,NavigationStart,NavigationCancel,NavigationEnd,NavigationError} from "@angular/router";
import {slideInAnimation} from "./app.animation";
import {MessageService} from "./messages/message.service";

@Component({
  selector: 'pm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations:[slideInAnimation]
})
export class AppComponent {
  pageTitle = 'Acme Product Management';
  loading = true;
  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }

  get userName(): string {
    if (this.authService.currentUser) {
      return this.authService.currentUser.userName;
    }
    return '';
  }
  get isMessageDisplayed():boolean{
    return this.messageService.isDisplayed;
  }

  constructor(private authService: AuthService,private router:Router,private messageService:MessageService) {
    router.events.subscribe((routerEvent:Event) => {
      this.checkRouterEvent(routerEvent);
    })
  }
  checkRouterEvent(routerEvent: Event): void{
    if(routerEvent instanceof NavigationStart){
      this.loading=true;
    }
    if(routerEvent instanceof NavigationEnd || routerEvent instanceof NavigationError || routerEvent instanceof NavigationCancel){
      this.loading=false;
    }
  }
  displayMessages():void{
    this.router.navigate([{outlets:{popup: ['messages']}}]);
    this.messageService.isDisplayed=true;
  }
  hideMessages():void{
    this.messageService.isDisplayed=false;
    this.router.navigate([{outlets:{popup: null}}]);
  }
  logOut(): void {
    this.authService.logout();
    console.log('Log out');
    this.router.navigateByUrl('/welcome');
  }
}
