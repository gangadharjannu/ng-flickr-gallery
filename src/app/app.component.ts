import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';

import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  images$;
  constructor(private http: HttpClient) {}

  /**
   * Executed whenever user submits the search.
   * Make a call to flickr API to get the images list and then form a new url to get the images
   *
   * @param searchText - Recieved search text from header component.
   */
  onSearch(searchText) {
    console.log(searchText);
    this.images$ = this.http.get(`${environment.apiUrl}${searchText}`).pipe(
      map((response: any) => {
        console.log(response);
        return response.photos.photo.map((photoData) => {
          const url = environment.photoUrl
            .replace('{farm-id}', photoData.farm)
            .replace('{server-id}', photoData.server)
            .replace('{id}', photoData.id)
            .replace('{secret}', photoData.secret);

          return {
            url,
            postedDate: photoData.dateupload,
            title: photoData.title,
            ownername: photoData.ownername,
          };
        });
      })
    );
  }
}
