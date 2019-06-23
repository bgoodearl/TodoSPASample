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

