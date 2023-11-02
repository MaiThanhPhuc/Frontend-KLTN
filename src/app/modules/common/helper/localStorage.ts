import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class LocalStorage {
  constructor(private router: Router) { }
  createStore(key: string, data: unknown): void {
    if (data) {
      const hashData = JSON.stringify(data);
      localStorage.setItem(key, hashData);
    }
  }

  removeStore(key: string): void {
    localStorage.removeItem(key);
  }

  getStore(key: string) {
    let result = localStorage.getItem(key);
    if (result) {
      return result;
    }
    return null;
  }

}
