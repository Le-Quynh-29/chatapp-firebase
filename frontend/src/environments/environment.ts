// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiURL: 'http://127.0.0.1:8000/api',
  publicURL: 'http://127.0.0.1:8000',
  firebaseConfig: {
    apiKey: "AIzaSyAI_2lSFfmZNemwItevuSdxPqszhEhieFk",
    authDomain: "chatapp-4a27f.firebaseapp.com",
    databaseURL: "https://chatapp-4a27f-default-rtdb.firebaseio.com",
    projectId: "chatapp-4a27f",
    storageBucket: "chatapp-4a27f.appspot.com",
    messagingSenderId: "651279281828",
    appId: "1:651279281828:web:e4f606eff3d38f994c4031"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
