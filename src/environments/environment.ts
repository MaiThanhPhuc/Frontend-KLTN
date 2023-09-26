/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.

import { IEnvironment } from './environment.interface';

// The list of file replacements can be found in `angular.json`.
export function mergeNewSettings(newConfig: any): any {
  environment = Object.assign(newConfig, environment);
  return environment;
}

// export function mergeNewSetting(key: any, value: any): void {
//   environment[key] = value;
// }

export let environment: IEnvironment = {
  appSettings: '/environments/appSettings.json',
  production: false,
  baseUrl: '/',
  assetsPath: '/assets'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
