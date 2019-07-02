import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MsalModule, MsalInterceptor } from "@azure/msal-angular";
import { LogLevel } from "msal";

import { appRoutes } from "./app.routes";
import { AppComponent } from './app.component';
import { CounterComponent } from './counter/counter.component';
import { ErrorComponent } from "./shared/error.component";
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { HomeComponent } from './home/home.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { TodoListComponent } from "./todo-list/todo-list.component";

import { HttpServiceHelper } from './common/HttpServiceHelper';
import { TodoListService } from "./todo-list/todo-list.service";
import { AUTH_CONFIG } from "./shared/auth/authconfig";

export function loggerCallback(logLevel, message, piiEnabled) {
  console.log("client logging - " + message);
}
//[AUTH_CONFIG.apiRoot + "/api/SampleData/WeatherForecasts", [AUTH_CONFIG.apiWeatherReadScope]], 
export const protectedResourceMap: [string, string[]][] = [[AUTH_CONFIG.apiRoot + "/api/todo", [AUTH_CONFIG.apiAsUserScope]], ['https://graph.microsoft.com/v1.0/me', ['user.read']]];
export const consentScopes: string[] = ["user.read", AUTH_CONFIG.apiAsUserScope]; //, AUTH_CONFIG.apiWeatherReadScope];

@NgModule({
  declarations: [
    AppComponent,
    CounterComponent,
    ErrorComponent,
    FetchDataComponent,
    HomeComponent,
    NavMenuComponent,
    TodoListComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes, { useHash: true }),
    MsalModule.forRoot({
      clientID: AUTH_CONFIG.clientId,
      authority: AUTH_CONFIG.authority,
      validateAuthority: true,
      redirectUri: AUTH_CONFIG.appRedirectUri,
      cacheLocation: AUTH_CONFIG.cacheLocation,
      postLogoutRedirectUri: AUTH_CONFIG.appPostLogoutRedirectUri,
      navigateToLoginRequestUrl: true,
      popUp: true,
      consentScopes: consentScopes,
      unprotectedResources: ["https://www.microsoft.com/en-us/"],
      protectedResourceMap: protectedResourceMap,
      logger: loggerCallback,
      correlationId: '1234',
      level: LogLevel.Verbose, //*** Should be set to Info or Warning
      piiLoggingEnabled: true //*** Should be false for public or production use
    })
  ],
  providers: [TodoListService, HttpServiceHelper,
    { provide: HTTP_INTERCEPTORS, useClass: MsalInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  static VER: string = "1.04";
  constructor() {
    console.log("AppModule constructor v=" + AppModule.VER);
    console.log("protectedResourceMap: " + JSON.stringify(protectedResourceMap));
  }
}
