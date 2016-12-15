import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class SpotifyService{
    private searchUrl: string;
    private artistUrl: string;
    private albumsUrl: string;
    private albumUrl: string;

    constructor(private _http:Http){}

    searchMusic(query:string, offset = 0, type = 'artist'): Observable<any> {
        return this._http.get(`https://api.spotify.com/v1/search?query=${query}&offset=${offset}&limit=20&type=${type}&market=US`)
            .map(res => res.json());
    }

    getArtist(id:string): Observable<any> {
        return this._http.get(`https://api.spotify.com/v1/artists/${id}`)
            .map(res => res.json());
    }

    getAlbums(artistId:string): Observable<any> {
        return this._http.get(`https://api.spotify.com/v1/artists/${artistId}/albums`)
            .map(res => res.json());
    }

    getAlbum(id:string): Observable<any> {
        return this._http.get(`https://api.spotify.com/v1/albums/${id}`)
            .map(res => res.json());
    }

    getRelatedArtist(id: string): Observable<any> {
      return this._http.get(`https://api.spotify.com//v1/artists/${id}/related-artists`)
          .map(res => res.json());
    }
}
