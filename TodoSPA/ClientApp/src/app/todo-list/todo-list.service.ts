import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {TodoList} from "./todoList";
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class TodoListService {

  private apiEndpoint: string = "https://localhost:44358/api/todo";

  constructor(private http: HttpClient) {

  }

  getItems(): Observable<TodoList[]> {
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
