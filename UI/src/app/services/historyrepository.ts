import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HistoryRepository {

  constructor() { }

  Add<T>(key:string, value :T){
    localStorage.setItem(key,JSON.stringify(value));
  }
  Get<T>(key:string):string|null
  {
    return localStorage.getItem(key);
  }
  Remove(key:string)
  {
    localStorage.removeItem(key);
  }
  Clear()
  {
    localStorage.clear();
  }
}