import { Injectable } from '@angular/core';
import { CompanyDetails } from '../models/CompanyDetails';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Authentication } from '../models/authentication.model';

@Injectable({
  providedIn: 'root'
})
export class StockserviceService {
  private   rootURL = 'http://localhost:5000/api';

  constructor(private http: HttpClient) { }
  register(company: CompanyDetails) {
    return this.http.post<Authentication>(this.rootURL+'/stocks/register', company,{headers : new HttpHeaders({ 'Content-Type': 'application/json' })})
  }
}
