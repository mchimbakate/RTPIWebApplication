import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';

import {  throwError } from 'rxjs';
import { retry, catchError,tap } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class DataService {

  private REST_API_SERVER = 'https://data.smartdublin.ie/cgi-bin/rtpi/realtimebusinformation?stopid=3665&format=json';

  constructor(private httpClient: HttpClient) { }

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

  public sendGetRequest() {
    // Add safe, URL encoded_page parameter
    // const options = { params: new HttpParams({fromString: '?stopid=3665&format=json'}) };
    return this.httpClient.get(this.REST_API_SERVER).pipe(retry(3), catchError(this.handleError));
  }
}
