import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import {FormsModule,ReactiveFormsModule} from '@angular/forms'; 
import { LoginalertService } from 'src/app/services/loginalert.service';
import { UserService } from 'src/app/services/user.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { StockserviceService } from 'src/app/services/stockservice.service';
@Component({
  selector: 'app-addstock',
  templateUrl: './addstock.component.html',
  styleUrls: ['./addstock.component.css']
})
export class AddstockComponent implements OnInit {

  registerForm: FormGroup;
  loading = false;
  submitted = false;
  addsucess=false
  addfail=false

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authenticationService: AuthenticationService,
        private userService: UserService,
        private alertService: LoginalertService,
        private stockService:StockserviceService
    ) {
        // redirect to home if already logged in
        // if (this.authenticationService.currentUserValue) {
        //     this.router.navigate(['/']);
        // }
    }

    ngOnInit() {
      console.log("reached add stock component")
        this.addfail=false;
        this.addsucess=false;
        this.registerForm = this.formBuilder.group({
            name: ['', Validators.required],
            ticker: ['', Validators.required,Validators.minLength(2)],
            description:['',Validators.required],
            closingprice: ['', Validators.required],
            currentprice: ['', [Validators.required]]
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    onSubmit() {
        this.submitted = true;
        this.addfail=false;
        this.addsucess=false;
        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }

        this.loading = true;
        this.stockService.register(this.registerForm.value)
        .pipe(first())
        .subscribe(
          data =>
                 { 
                  if(data.success){
                    this.addsucess=true
                    this.alertService.success(' Stock  Registration successful', true);
                    this.router.navigate(['/stocks']);
                    console.log("the Stock registration was successfull",data)
                 }else{
                  this.addfail=true
                  console.log("the stock registration was not successful")
                  this.alertService.error('Stock Ticker is not available');
                  this.loading = false;
                  }
                })}
}
