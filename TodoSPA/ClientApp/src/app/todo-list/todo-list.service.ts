import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {TodoList} from "./todoList";
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class TodoListService {
  static VER: string = "1.01";

  private apiEndpoint: string = "https://localhost:44358/api/todo";

  constructor(private http: HttpClient) {
    console.log("todoListSvc constructor v=" + TodoListService.VER);
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
