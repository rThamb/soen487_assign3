import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { StorageService } from '../../services/storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class HttpHandlerService {

  constructor(private store: StorageService, private http: HttpClient) { }

  get(url: string): Observable<any> {
    let headers = this.getHeaders();
    return this.http.get(url, headers);
  }

  post(url: string, data: any): Observable<any> {
    let headers = this.getHeaders();
    if(headers)
      return this.http.post(url, data, headers);
    else
      return this.http.post(url, data);
  }

  put(url: string, data: any): Observable<any> {
    let headers = this.getHeaders();
    return this.http.put(url, data, headers);
  }

  delete(url: string): Observable<any> {
    let headers = this.getHeaders();
    return this.http.delete(url, headers);
  }

  private getHeaders(): any {

    let user = this.store.readUserInfo();

    if(!user)
      return null;

    let token = user.token;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      })
    };

    return httpOptions;
  }
}
