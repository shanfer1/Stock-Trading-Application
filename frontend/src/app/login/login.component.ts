import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AppComponent} from '../app.component';
import { LoginalertService} from '../services/loginalert.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    loginfail=false
    isadmin=false
    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: LoginalertService,
        public myapp: AppComponent
    ) {
        // redirect to home if already logged in
        // if (this.authenticationService.currentUserValue) {
        //     this.router.navigate(['/']);
        // }
    }

    ngOnInit() {
      localStorage.clear();
      this.loginfail=false

        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmit() {
      this.loginfail=false;
        this.submitted = true;

        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
     
        
        this.authenticationService.login(this.f.username.value, this.f.password.value).subscribe(
                data => {
                  if (data.success){
                    if(data.user.username=="admin"){
                      this.isadmin=true
                      this.myapp.isAdmin=true
                      localStorage.setItem('isAdmin', '1');
                    }else{
                      localStorage.setItem('isAdmin','0');
                    }
                    this.myapp.isUserLoggedin=true;
                    this.router.navigate(['stocks'])
                  }else{
                    this.loginfail=true;

                    this.alertService.error("Username or Password is invalid");
                    this.loading=false;
                  }
                });
    }

}
