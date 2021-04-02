import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  getProperty(key: string): string{
      return localStorage.getItem(key);
  }

  setProperty(key: string, value: string): void{
      localStorage.setItem(key, value);
  }
}
