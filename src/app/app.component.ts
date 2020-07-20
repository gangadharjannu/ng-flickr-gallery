import { Component } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { map } from 'rxjs/operators';

import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  images = [];
  searchText;
  totalPages = 0;
  // cast query param from string to number
  currentPage = parseInt(environment.page, 10);
  constructor(private http: HttpClient) {}

  onScroll(event) {
    console.log('scrolled');
    if (this.currentPage === this.totalPages) {
      console.log('this will happens two times');
      if (this.currentPage === 0 && this.totalPages === 0) {
        console.log(
          'if current page is 0 and totalPages is also 0 which is init state'
        );
      } else {
        console.log(
          '1 if the current page reaches the limit, page limit reached'
        );
      }
    } else {
      this.onSearch(this.searchText, false, ++this.currentPage);
    }
  }

  /**
   * Executed whenever user submits the search.
   * Make a call to flickr API to get the images list and then form a new url to get the images
   *
   * @param searchText - Recieved search text from header component.
   */
  onSearch(searchText, reset = true, page = 0) {
    if (reset) {
      this.totalPages = 0;
      this.currentPage = parseInt(environment.page, 10);
      this.images = [];
    }

    this.searchText = searchText;

    const params = new HttpParams()
      .set('method', environment.method)
      .set('api_key', environment.api_key)
      .set('FLickrApi_sig', environment.FLickrApi_sig)
      .set('nojsoncallback', environment.nojsoncallback)
      .set('format', environment.format)
      .set('page', page.toString())
      .set('per_page', environment.per_page)
      .set('content_type', environment.content_type)
      .set('extras', environment.extras)
      .set('text', searchText);

    this.http
      .get(environment.apiUrl, { params })
      .pipe(
        map((response: any) => {
          console.log(response);
          this.totalPages = parseInt(response.photos.pages, 10);
          return response.photos.photo.map((photoData) => {
            const {
              dateupload: postedDate,
              title,
              ownername: ownerName,
              id,
            } = photoData;
            const url = environment.photoUrl
              .replace('{farm-id}', photoData.farm)
              .replace('{server-id}', photoData.server)
              .replace('{id}', photoData.id)
              .replace('{secret}', photoData.secret)
              // q for 150x150
              .replace('{size}', 'q');

            return {
              url,
              postedDate,
              title,
              ownerName,
              id,
            };
          });
        })
      )
      .subscribe((res) => {
        this.images = [...this.images, ...res];
      });
  }
}
