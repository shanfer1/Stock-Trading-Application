import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TickerSearchComponent  } from 'src/app/components/ticker-search/ticker-search.component';
import { WatchlistComponent  } from 'src/app/components/watchlist/watchlist.component';
import { DetailsComponent } from 'src/app/components/details/details.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { StocklistingComponent } from './stocklisting/stocklisting.component';
import { AuthGuard } from './loginutils/auth.guard';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AddstockComponent } from './components/addstock/addstock.component';

const routes: Routes = [

  { path: '', component: LoginComponent,canActivate:[AuthGuard] },
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'search',component:TickerSearchComponent},
  {path:'stocks',component:StocklistingComponent,canActivate:[AuthGuard]},
  { path: 'watchlist', component: WatchlistComponent },
  { path: 'details/:ticker', component: DetailsComponent },
  { path: 'portfolio', component: PortfolioComponent },
  {path:'addStock',component:AddstockComponent},
  { path: '**',   redirectTo: '', pathMatch: 'full' }
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
