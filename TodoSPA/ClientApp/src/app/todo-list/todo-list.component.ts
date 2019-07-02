import {Component, OnDestroy, OnInit} from '@angular/core';
import {TodoListService} from "./todo-list.service";
import {TodoList} from "./todoList";
import {Subscription} from "rxjs";
import {BroadcastService} from "@azure/msal-angular";
import { MsalService } from "@azure/msal-angular";
import { AUTH_CONFIG } from "../shared/auth/authconfig";

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit, OnDestroy  {
  static VER: string = "1.01";

  private error = "";
  public loadingMessage = "Loading...";
   todoList: TodoList[];
  public newTodoCaption = "";
  private submitted = false;
  private tokenFailureSubscription: Subscription;
  private tokenSuccessSubscription: Subscription;

  constructor(private todoListService: TodoListService, private broadcastService : BroadcastService, private msalService: MsalService) { }

  ngOnInit() {
    console.log("todoList component OnInit v=" + TodoListComponent.VER);

    this.populate();

    let errorCount: number = 0;
    this.tokenFailureSubscription = this.broadcastService.subscribe("msal:acquireTokenFailure", (payload) => {
      errorCount++;
      console.log("todoList acquire token failure (" + errorCount + "), " + JSON.stringify(payload));
      //if (payload.indexOf("consent_required") !== -1 || payload.indexOf("interaction_required") != -1) {
      if (errorCount < 3) {
        let scopeUri: string = AUTH_CONFIG.apiAsUserScope;
        let user: any = this.msalService.getUser();
        if (user === null) {
          this.msalService.acquireTokenPopup([scopeUri]).then((token) => {
            this.todoListService.getItems().subscribe((results) => {
              this.error = '';
              this.todoList = results;
              this.loadingMessage = "";
            }, (err) => {
              this.error = err;
              this.loadingMessage = "";
            });
          }, (error) => {
            console.log("acquireTokenPopup error: " + JSON.stringify(error));
          });
        } else {
          console.log("have user...");
        }
      }
    });
    this.tokenSuccessSubscription = this.broadcastService.subscribe("msal:acquireTokenSuccess", (payload) => {
      console.log("todoList acquire token success " + JSON.stringify(payload));
    });
  }

  public populate() {
    this.todoListService.getItems().subscribe(result => {
      this.todoList = result;
      this.loadingMessage = "";
    }, error => {
        console.log("todoList populate failed");
      this.error = error;
      this.loadingMessage = "";
    });
  }

  add(isValid : boolean) {
    this.submitted = true;
    if(isValid) {
      this.todoListService.postItem({
        'name': this.newTodoCaption,
      }).subscribe( (results) => {
      this.loadingMessage = "";
        this.newTodoCaption = "";
        this.populate();
      }, (err) => {
        this.error = err;
       this.loadingMessage = "";
      })
    }
    else {
    }
  };

//extremely important to unsubscribe
  ngOnDestroy() {
    console.log("todoList component OnDestroy");
    this.broadcastService.getMSALSubject().next(1);
    if(this.tokenFailureSubscription) {
      this.tokenFailureSubscription.unsubscribe();
    }
    if (this.tokenSuccessSubscription) {
      this.tokenSuccessSubscription.unsubscribe();
    }
  }
}
