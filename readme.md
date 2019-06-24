# Angular 7 Web App with .NET Core Web API and AAD Auth with MSAL

This repo contains a sample application created with Visual Studio 2019 using .NET Core 2.2 and Angular 7.

The Web API for the application comes from the [JavaScript Single Page Application with an ASP.NET backend, using msal.js](https://github.com/Azure-Samples/active-directory-javascript-singlepageapp-dotnet-webapi-v2).

## Environment

Quick information on environment.

### Node/NPM

```cmd
node --version
v10.16.0

npm --version
6.9.0
```

### Angular 7
![results of ng --version](img/01_ng_version.png)

### .NET
![dotnet --info](img/01a_dotnet_info.png)

## Take 1 - Starting from VS2019 GUI

Start Visual Studio 2019 and see the dialog below:

![VS 2019 Get started](img/02_VS2019_pickdlg.png)

Click on "Create a new project", or if the above dialog was dismissed,  choose File -- New Project.

![VS 2019 Create a new project](img/03_VS2019_pickdlg2.png)

Filter by Project type `Web` and then click on `ASP.Net Core Web Application` and click `Next`.

![VS 2019 Configure new project](img/04_VS2019_ConfigProject.png)

Set the Project name, Location and Solution name and click `Create`.

![VS 2019 Create new ASP.NET Core Web App](img/05_VS2019_CreateWebApp.png)

Choose Angular and click `Create`.

Now build and run the application.

## Update Angular 6 to 7

### Angular CLI

Check global npm packages:
```cmd
npm list -g --depth 0
```
got
```txt
C:\ProgramData\npm
+-- @angular/cli@7.3.8
+-- auth0-deploy-cli@3.0.1
+-- gulp@3.9.1
+-- http-server@0.11.1
+-- live-server@1.2.0
+-- npm@6.9.0
+-- npm-windows-upgrade@6.0.1
+-- rxjs-tslint@0.1.7
+-- tslint@5.18.0
```

```cmd
ng update
```
got
```txt
    We analyzed your package.json, there are some packages to update:

      Name                                      Version                  Command to update
     ---------------------------------------------------------------------------------------
      @angular/cli                              6.0.8 -> 8.0.3           ng update @angular/cli
      @angular/core                             6.1.10 -> 8.0.2          ng update @angular/core
      @angular/core                             6.1.10 -> 7.2.15         ng update @angular/core
      @nguniversal/aspnetcore-engine            6.0.0 -> 7.1.1           ng update @nguniversal/aspnetcore-engine
      rxjs                                      6.2.1 -> 6.5.2           ng update rxjs


    There might be additional packages that are outdated.
    Or run ng update --all to try to update all at the same time.
```

With Angular CLI v7.3.8 installed globally, and version specified in package.json at ~6.0.0, to update to 7.3.8 for project:
```cmd
ng update @angular/cli@7.3.8
```
Updated `@angular/cli` in `package.json`.

```cmd
ng update @angular/core@7.2.15
```
updated multiple packages in `package.json`.

```cmd
ng update
```
got
```txt
    We analyzed your package.json, there are some packages to update:

      Name                                      Version                  Command to update
     ---------------------------------------------------------------------------------------
      @angular/cli                              7.3.9 -> 8.0.3           ng update @angular/cli
      @angular/core                             7.2.15 -> 8.0.2          ng update @angular/core
      @nguniversal/aspnetcore-engine            6.0.0 -> 7.1.1           ng update @nguniversal/aspnetcore-engine


    There might be additional packages that are outdated.
    Run "ng update --all" to try to update all at the same time.
```

Compiled and ran and app runs successfully.

## Todo Web API

After looking at a number of Todo application samples, the [Tutorial: Create a web API with ASP.NET Core](https://docs.microsoft.com/en-us/aspnet/core/tutorials/first-web-api?view=aspnetcore-2.2&tabs=visual-studio)
looked to be the best to use.

Copied files from the [AspNetCore.Docs samples - 2.2 TodoApi](https://github.com/aspnet/AspNetCore.Docs/tree/master/aspnetcore/tutorials/first-web-api/samples/2.2/TodoApi)

```txt
Controllers\TodoController.cs

Models\TodoContent.cs
TodoItem.cs
```
Changed namespace from `TodoApi` to `TodoSPA`.

Added the following in Startup.cs:

```cs
using Microsoft.EntityFrameworkCore;
//...
using TodoSPA.Models;
```
and
```cs
    services.AddDbContext<TodoContext>(opt =>
        opt.UseInMemoryDatabase("TodoList"));
```

### First API test
Compiled app and tried API url: `https://localhost:44358/api/todo`.

Got:
```txt
[{"id":1,"name":"Item1","isComplete":false}]
```

## Todo Angular UI

Adapted code from `\microsoft-authentication-library-for-js\lib\msal-angular\samples\MSALAngularDemoApp\src\todo-list`
so it could be used with the API sample.

### New Files

File in src\app\common
```txt
HttpServiceHelper.ts
```
Files in src\todo-list:
```txt
todo-list.component.css
todo-list.component.html
todo-list.component.spec.ts
todo-list.component.ts
todo-list.service.ts
todoList.ts
```

### Changes in todo-list files
The object model of the C# Web API sample uses the property `Name` where the demo sample code for the MSAL demo uses the property `Title`.

Changes from sample repo:

#### HttpServiceHelper.ts

```TypeScript
import {Observable} from 'rxjs/Rx'
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";

@Injectable()
export class HttpServiceHelper {

  constructor(private http: HttpClient) {
  }

  public httpGetRequest(url : string) {
    return this.http.get(url)
      .map(response => {
        return response;
      })
      .catch(response => (Observable.throw(response)
      ))
  }

}
```
to
```TypeScript
import { Observable } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class HttpServiceHelper {

  constructor(private http: HttpClient) {
  }

  public httpGetRequest(url : string) {
    return this.http.get(url)
      .pipe(map(response => {
        console.log("http response");
        return response;
      }),
      catchError(response => (Observable.throw(response)
      )))
  }

}
```

#### todo-list.component.html
```html
        <td>{{item?.title}}</td>
```
changed to
```html
        <td>{{item?.name}}</td>
```

#### todo-list.component.ts

Updates to rxjs, commented out msal related code for now.
```TypeScript
import {Subscription} from "rxjs/Subscription";
import {BroadcastService} from "@azure/msal-angular";
import { MsalService} from "@azure/msal-angular";
```
to
```TypeScript
import {Subscription} from "rxjs";
//import {BroadcastService} from "@azure/msal-angular";
//import { MsalService} from "@azure/msal-angular";
```
...
```TypeScript
  constructor(private todoListService: TodoListService, private broadcastService : BroadcastService, private msalService: MsalService) { }
```
to
```TypeScript
  constructor(private todoListService: TodoListService) { } //, private broadcastService : BroadcastService, private msalService: MsalService) { }
```
...
```TypeScript
        'title': this.newTodoCaption,
```
to
```TypeScript
        'name': this.newTodoCaption,
```

And commented out lines 26-19, 38-41, 44-46 and 80.

#### todo-list.service.ts:
```TypeScript
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Rx";
import {TodoList} from "./todoList";

@Injectable()
export class TodoListService {

  private apiEndpoint: string = "https://buildtodoservice.azurewebsites.net/api/todolist";

  constructor(private http: HttpClient) {

  }

  getItems(): Observable<TodoList[]> {
    return this.http.get(this.apiEndpoint)
      .map((response: Response) =>
        response
      )
      .catch(response => (Observable.throw(response)
      ))
  }

  postItem(item: any) {
    return this.http.post(this.apiEndpoint, item, {responseType: 'text'})
      .map((response) => {
        return response;
      })
  }

}
```
to
```TypeScript
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
```

#### todoList.ts:
```TypeScript
export class TodoList {

  constructor(title:string, owner: string) {
    this.title=title;
    this.owner= owner;
  }

  title:string;
  owner: string;

}
```
to
```TypeScript
export class TodoList {

  constructor(name:string, owner: string) {
    this.name = name;
    this.owner= owner;
  }

  name:string;
  owner: string;

}
```

### Changes in existing files

#### nav-menu.component.html
Added the following as a new `li`:
```html
          <li class="nav-item" [routerLinkActive]='["link-active"]'>
            <a class="nav-link text-dark" [routerLink]='["/todo-list"]'>Todo List</a>
          </li>
```

#### app.module.ts

Added imports:
```TypeScript
import { TodoListComponent } from "./todo-list/todo-list.component";
import { TodoListService } from "./todo-list/todo-list.service";
```
Changed declarations:
```TypeScript
    FetchDataComponent
```
to
```TypeScript
    FetchDataComponent,
    TodoListComponent
```
added to RouterModule.forRoot:
```TypeScript
      { path: 'todo-list', component: TodoListComponent },
```
changed providers:
```TypeScript
  providers: [],
```
to
```TypeScript
  providers: [TodoListService],
```



## Resources

See the following pages for additional resources

[Developer Tool Notes](./_docs/TSS_DevToolNotes.md)

[Azure Active Directory Resources](./_docs/AzureADResources.md)

Additional resources: [Resources](./_docs/TSS_Resources.md)

## Dev Notes

[Developer Notes](./_docs/TSS_DevNotes.md)
