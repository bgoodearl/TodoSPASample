import { Component } from '@angular/core';
import { Subscription } from "rxjs";
import { BroadcastService, MsalService } from "@azure/msal-angular";

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  static VER: string = "1.01";
  isExpanded: boolean = false;
  isLoggedIn = false;
  private loginFailedSubscription: Subscription = null;
  private loginOkSubscription: Subscription = null;

  constructor(private broadcastService: BroadcastService, private msalService: MsalService) {
    console.log("navMenu constructor v=" + NavMenuComponent.VER);
  }

  collapse() {
    this.isExpanded = false;
  }

  logout(): void {
    console.log("logout");
    this.msalService.logout();
    this.isLoggedIn = false;
  }

  //extremely important to unsubscribe
  ngOnDestroy() {
    console.log("navMenu component OnDestroy");
    this.broadcastService.getMSALSubject().next(1);
    if (this.loginFailedSubscription) {
      this.loginFailedSubscription.unsubscribe();
    }
    if (this.loginOkSubscription) {
      this.loginOkSubscription.unsubscribe();
    }
  }

  ngOnInit() {
    console.log("navMenu OnInit v=" + NavMenuComponent.VER + " - user:");
    let user: any = this.msalService.getUser();
    this.isLoggedIn = (user != null);
    if (this.isLoggedIn) { console.log(user); }
    this.loginFailedSubscription = this.broadcastService.subscribe("msal:loginFailure", (payload) => {
      console.log("navMenu login failed");
      this.isLoggedIn = false;
    });
    this.loginOkSubscription = this.broadcastService.subscribe("msal:loginSuccess", (payload) => {
      console.log("navMenu login success");
      this.isLoggedIn = true;
    });
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

}
