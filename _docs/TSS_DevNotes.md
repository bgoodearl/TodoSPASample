# .NET Core 2.2 Angular 7 Todo SPA Sample - Dev Notes

<table>
    <tr>
        <th>Date</th>
        <th>Dev</th>
        <th>Notes</th>
    </tr>
    <tr>
        <td>7/4/2019</td><td>bg</td>
		<td>
			Added apiWeatherReadScope to protectedResourceMap and consentScopes in app.module.<br/>
			TodoListService - use BASE_URL to set up URL for api/todo.<br/>
		</td>
    </tr>
    <tr>
        <td>7/2/2019</td><td>bg</td>
		<td>
			Branch: weather_scope - added property apiWeatherReadScope to AuthConfig in Angular app.
			Added additional error handling in TodoListComponent.
			Changed logging in nav-menu.component.<br/>
		</td>
    </tr>
    <tr>
        <td>7/1/2019</td><td>bg</td>
		<td>
			Renamed todoApiRoot to apiRoot in AuthConfig.
			Added login button to nav menu.<br/>
			Added Owner and CreationTime to TodoItem.
			Set Owner when saving TodoItem.
			Show Owner in todo list.<br/>
		</td>
    </tr>
    <tr>
        <td>6/25/2019</td><td>bg</td>
		<td>
			Added [Authorize] and User check to TodoController.
			Added [Authorize] (commented out) and User check to SampleDataController.<br/>
			Added Logout button to menu.<br/>
			Use login popup.<br/>
			Tweaked logging for todo-list.<br/>
			Added notes about Microsoft.Identity.Web and reference to library.<br/>
			Added authentication setup to Web API in Startup.<br/>
			Added AzureAd settings in appsettings.json (and actual values in User Secrets).<br/>
		</td>
    </tr>
    <tr>
        <td>6/24/2019</td><td>bg</td>
		<td>
			Added template for MSAL configuration settings.<br/>
			Added changes to angular.json to copy into authconfig.ts.<br/>
			Moved routes to separate file app.routes.ts.<br/>
			Added npm packages for MSAL.  Added/adapted MSAL configuration.<br/>
		</td>
    </tr>
    <tr>
        <td>6/23/2019</td><td>bg</td>
		<td>
			Created new web app in VS2019.
			Client side app created with Angular 6.<br/>
			Added readme.<br/>
			Updated to Angular CLI 7.3.8 and Angular Core 7.2.15.<br/>
			Added Todo Web API.<br/>
			Adapted Angular UI from old MSAL sample.<br/>
		</td>
    </tr>
    <tr>
        <td></td><td></td>
		<td>
		</td>
    </tr>
</table>
