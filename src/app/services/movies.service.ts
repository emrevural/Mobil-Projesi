import { Injectable } from '@angular/core';
import {Results} from '../models/movie';
import {from, throwError, Observable} from 'rxjs';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { rendererTypeName } from '@angular/compiler';
import {retry, catchError, map} from 'rxjs/operators';

import { environment } from '../../environments/environment';
export enum SearchType {
  all = '',
  movie = 'movie',
  series = 'series',
  episode = 'episode'
}
@Injectable({
  providedIn: 'root'
})

export class MoviesService {
  url = 'http://www.omdbapi.com/';

  apiKey = '723d8dcf';
  httpOptions = {
    headers: new HttpHeaders({
  'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {

  }
  handleError(error: HttpErrorResponse){
    if (error.error instanceof ErrorEvent){
console.error(' Veriler getirilemedi', error.error.message);
    }else {
      console.error(`Dönen body kodu: , ${error.error}`);
    }
    return throwError('Birşeyler ters gitti');
  }



  // tslint:disable-next-line: no-shadowed-variable
  SearchData(title: string, type: SearchType): Observable<any> {
    return this.http.get(`${this.url}?s=${encodeURI(title)}&type=${type}&apikey=${this.apiKey}`).pipe(
      map(results => results['Search'])
    );
  }

  getDetails(id) {
    return this.http.get(`${this.url}?i=${id}&plot=full&apikey=${this.apiKey}`);
  }
}

