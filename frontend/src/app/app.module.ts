import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule ,HTTP_INTERCEPTORS} from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { WatchlistComponent } from './components/watchlist/watchlist.component';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatProgressSpinnerModule }  from '@angular/material/progress-spinner'
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs'
import { FormsModule, ReactiveFormsModule  } from "@angular/forms";
import { RegisterComponent } from './components/register';
import { InMemDataService } from 'src/app/services/in-memory-data.service';
import { JwtInterceptor } from './loginutils/jwt.interceptor';
import { ErrorInterceptor } from './loginutils/error.interceptor';
import { AppComponent } from './app.component';
import { TickerSearchComponent } from './components/ticker-search/ticker-search.component';
import { DetailsComponent } from './components/details/details.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { NewsModalComponent } from './components/news-modal/news-modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BuyModalComponent } from './components/buy-modal/buy-modal.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
// import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { StocklistingComponent } from './stocklisting/stocklisting.component';
import { MatTableModule } from '@angular/material/table';
import { AlertComponent } from './components/alert/alert.component';
import { LoginComponent } from './login/login.component';
import { CommonModule } from '@angular/common';
import { AddstockComponent } from './components/addstock/addstock.component';

@NgModule({
  declarations: [
    AppComponent,
    TickerSearchComponent,
    WatchlistComponent,
    DetailsComponent,
    NewsModalComponent,
    BuyModalComponent,
    PortfolioComponent,
    StocklistingComponent,
    AlertComponent,
    LoginComponent,
  RegisterComponent,
  AddstockComponent ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatTableModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatFormFieldModule, 
    MatIconModule,
    MatAutocompleteModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatTabsModule,
    HighchartsChartModule,
    NgbModule,
    // AngularFontAwesomeModule
  ],
  
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },AppComponent,],
  bootstrap: [AppComponent],
  exports: [CommonModule,FormsModule,ReactiveFormsModule]
})
export class AppModule { }
