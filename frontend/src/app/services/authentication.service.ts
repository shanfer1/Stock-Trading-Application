import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { User } from '../models/user.model';
import { Authentication } from '../models/authentication.model';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private   rootURL = 'http://localhost:5000/api';
  private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient,private router: Router) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(username, password) {
      const body={ username:username, password:password }
            return this.http.post<Authentication>(this.rootURL+'/users/authenticate', body,{headers : new HttpHeaders({ 'Content-Type': 'application/json' })})
            .pipe(
              tap((auth:Authentication)=> {
                localStorage.setItem('currentUser', JSON.stringify(auth.user));
                this.currentUserSubject.next(auth.user);
                return auth;
            }),
            );
    }

    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('currentUser');
        
        localStorage.removeItem('isAdmin');
        this.currentUserSubject.next(null);
        this.router.navigate([''])
    }
}
