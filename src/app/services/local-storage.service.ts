import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  setLocalStorageItem(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getLocalStorageItem(key: string): any {
    if(key in localStorage) {
      return JSON.parse(localStorage.getItem(key)!);
    }
    return null;
  }

  clearLocalStorage(): void {
    localStorage.clear();
  }
}
