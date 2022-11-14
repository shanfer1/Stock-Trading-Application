import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'KidStox';
  isUserLoggedin:boolean;
  isAdmin:boolean;

  ngOnInit(): void {
    if(localStorage.getItem('currentUser')){
      if(localStorage.getItem('isAdmin')=='1'){
        this.isAdmin=true
      }else{
        this.isAdmin=false
      }
      this.isUserLoggedin=true;
    }else{
      this.isUserLoggedin=false;
    }
  }
 
  constructor(private authenticationservice:AuthenticationService,private router: Router){}
  logoutUser(){
    this.isAdmin=false;
    this.isUserLoggedin=false;
    this.authenticationservice.logout()
  }
}
