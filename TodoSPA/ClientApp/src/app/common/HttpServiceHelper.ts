import { Observable } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class HttpServiceHelper {

  constructor(private http: HttpClient) {
  }

  public httpGetRequest(url: string) {
    console.log("get url: " + url);
    return this.http.get(url)
      .pipe(map(response => {
        console.log("http response");
        return response;
      }),
      catchError(response => (Observable.throw(response)
      )))
  }

}
