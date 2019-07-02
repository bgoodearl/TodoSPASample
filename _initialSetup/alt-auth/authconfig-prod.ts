import { AuthConfig } from "../../../app/shared/shared-config.models";

//Auth Configuration for production
//See notes in solution readme.md
export const AUTH_CONFIG: AuthConfig = {
  apiAsUserScope: "api://00000000-0000-0000-0000-000000000000/access_as_user",
  apiWeatherReadScope: "api://00000000-0000-0000-0000-000000000000/weather_read",
  appPostLogoutRedirectUri: "https://localhost:44300",
  appRedirectUri: "https://localhost:44300",
  authConfigType: "prod",
  authority: "https://login.microsoftonline.com/_my_tenant_.onmicrosoft.com",
  cacheLocation: "localStorage",
  clientId: "00000000-0000-0000-0000-000000000000",
  apiRoot: "https://localhost:44300"
}
