import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { User } from '../_models/user';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private httpClient = inject(HttpClient)
  private baseUrl = "https://localhost:7289/api/";
  currrentUser = signal<User | null>(null)
  constructor() { }
  logout()
  {
    localStorage.removeItem('user');
    this.currrentUser.set(null);
  }
  login(model:any)
  {
    return this.httpClient.post<User>(this.baseUrl+ 'login',model).pipe(
      map(user =>{
        if(user){
          localStorage.setItem('user',JSON.stringify(user));
          this.currrentUser.set(user);
        }
      })
    )
  }
  register(model:any)
  {
    return this.httpClient.post<User>(this.baseUrl+ 'account',model).pipe(
      map(user =>{
        if(user){
          localStorage.setItem('user',JSON.stringify(user));
          this.currrentUser.set(user);
        }
        return user;
      })
    )
  }

  getAllUsers()
  {
    return this.httpClient.get(this.baseUrl + 'Users');
  }

}
