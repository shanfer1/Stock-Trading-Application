import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User } from '../models/user.model';
import { Authentication } from '../models/authentication.model';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private   rootURL = 'http://localhost:5000/api';
  constructor(private http: HttpClient) { }
  getAll() {
    return this.http.get<User[]>(`${config.apiUrl}/users`);
}

register(user: User) {
    return this.http.post<Authentication>(this.rootURL+'/users/register', user,{headers : new HttpHeaders({ 'Content-Type': 'application/json' })})
      
  }

delete(id: number) {
    return this.http.delete(`${config.apiUrl}/users/${id}`);
}
}
