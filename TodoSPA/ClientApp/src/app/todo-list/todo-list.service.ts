import { Injectable, Inject } from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {TodoList} from "./todoList";
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class TodoListService {
  static VER: string = "1.02";

  private apiEndpoint: string = null; //"https://localhost:44358/api/todo";

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    console.log("todoListSvc constructor v=" + TodoListService.VER + " - baseUrl=[" + baseUrl + "]");
    this.apiEndpoint = baseUrl + "api/todo";
  }

  getItems(): Observable<TodoList[]> {
    console.log("todoListSvc getItems");
    return this.http.get(this.apiEndpoint)
      .pipe(map((response: TodoList[]) => response
      ),
        catchError(response => (Observable.throw(response))))
  }

  postItem(item: any) {
    return this.http.post(this.apiEndpoint, item, {responseType: 'text'})
      .pipe(map((response) => {
        return response;
      }))
  }

}
