// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl:
    'https://api.flickr.com/services/rest?method=flickr.photos.search&api_key=ef1f9d4f8ca80dada31c684364355282&FLickrApi_sig=d7f57fa9e01a6a2d6ccd8597b8d2f86b&nojsoncallback=1&format=json&page=0&per_page=50&content_type=7&extras=owner_name,date_upload&text=',
  photoUrl:
    'https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}.jpg',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
