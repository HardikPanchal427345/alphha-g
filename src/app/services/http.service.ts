import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment as env } from "src/environments/environment";
import { APIResponse, Game } from '../models';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  getGameList(
    ordering: string,
    page: number,
    search?: string
  ):Observable<APIResponse<Game>>{
    let params  =  new HttpParams().set('ordering', ordering).set('page', page);

    if (search) {
      params = new HttpParams().set('ordering',ordering).set('search', search).set('page',page);
    }

    return this.http.get<APIResponse<Game>>(`${env.BASE_URL}/games`, {
      params: params,
    });
  }

  getGameDetails(id: string): Observable<Game>{
    const gameinfoRequest = this.http.get(`${env.BASE_URL}/games/${id}`);
    const gameTrailerRequest =  this.http.get(
      `${env.BASE_URL}/games/${id}/movies`
    );
    const gameScreenshotRequest =  this.http.get(
      `${env.BASE_URL}/games/${id}/screenshots`
    );

    return forkJoin({
      gameinfoRequest,
      gameTrailerRequest,
      gameScreenshotRequest,
    }).pipe(
      map((resp: any) => {
        return {
          ...resp['gameinfoRequest'],
          screenshots: resp['gameScreenshotRequest']?.results,
          trailers: resp['gameTrailerRequest']?.results,
        }
      })
    )

  }
}
