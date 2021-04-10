import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpHandlerService {

  constructor(private http: HttpClient) { }

  get(url: string): Observable<any>{
    return this.http.get(url);
  }

  post(url: string, data: any): Observable<any>{
    return this.http.post(url, data);
  }

  put(url: string, data: any): Observable<any>{

    let res: any = {
      success: true
    };
    return of(res);
    //return this.http.post(url, data);
  }

  delete(url: string): Observable<any>{
    let res: any = {
      success: true
    };
    return of(res);
    //return this.http.post(url, data);
  }
}
