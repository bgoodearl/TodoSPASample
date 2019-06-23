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

## Resources

See the following pages for additional resources

[Developer Tool Notes](./_docs/TSS_DevToolNotes.md)

[Azure Active Directory Resources](./_docs/AzureADResources.md)

Additional resources: [Resources](./_docs/TSS_Resources.md)

## Dev Notes

[Developer Notes](./_docs/TSS_DevNotes.md)
