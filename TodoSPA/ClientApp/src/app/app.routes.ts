import { Routes } from '@angular/router';
import { MsalGuard } from "@azure/msal-angular";
import { CounterComponent } from './counter/counter.component';
import { ErrorComponent } from "./shared/error.component";
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { HomeComponent } from './home/home.component';
import { TodoListComponent } from "./todo-list/todo-list.component";


export const appRoutes: Routes = [
  { path: 'home', component: HomeComponent, pathMatch: 'full' },
  { path: 'counter', component: CounterComponent },
  { path: 'fetch-data', component: FetchDataComponent, canActivate: [MsalGuard] },
  { path: 'todo-list', component: TodoListComponent, canActivate: [MsalGuard] },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: ErrorComponent }
];
