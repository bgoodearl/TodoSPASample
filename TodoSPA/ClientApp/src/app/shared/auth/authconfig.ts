import { AuthConfig } from "../../../app/shared/shared-config.models";

//*** Important *** The values in this file in .../ClientApp/src/app/shared/auth
//will be replaced by the contents of a file from .../ClientApp/src/app-alt/shared/auth
//
// See readme.md from root of solution for more information
export const AUTH_CONFIG: AuthConfig = {
  apiAsUserScope: "api://00000000-0000-0000-0000-000000000000/access_as_user",
  appPostLogoutRedirectUri: "https://localhost:44300",
  appRedirectUri: "https://localhost:44300",
  authConfigType: "empty",
  authority: "https://login.microsoftonline.com/_my_tenant_.onmicrosoft.com",
  cacheLocation: "localStorage",
  clientId: "00000000-0000-0000-0000-000000000000",
  apiRoot: "https://localhost:44300"
}
