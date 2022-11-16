import { Component, OnInit } from '@angular/core';
import { DetailsService } from 'src/app/services/details.service';
import { Stockview } from '../models/stockview.model';
import { Router } from '@angular/router';
import { CompanyDetails } from '../models/CompanyDetails';
import { AuthenticationService } from '../services/authentication.service';
@Component({
  selector: 'app-stocklisting',
  templateUrl: './stocklisting.component.html',
  styleUrls: ['./stocklisting.component.css']
})
export class StocklistingComponent implements OnInit {
  constructor(private detailService: DetailsService,private _router: Router,private authenticationService:AuthenticationService) {
  
        if(!localStorage.getItem('currentUser')){
          this._router.navigate(['login'])
        }
   }
  displayedColumns: string[] = ['stock','ticker', 'price', 'profit'];
  dataSource = []
  clickedRows = new Set<Stockview>();

  ngOnInit(): void {
    if(!localStorage.getItem('currentUser')){
      this._router.navigate(['login'])
    }
    this.detailService.getStocks().subscribe ( responseList => {
      this.dataSource=this.transformStockView(responseList)
    });
  }
  
  fetchCompanyChart(data: any){
    this._router.navigateByUrl('/details/'+data.ticker);
  }
  ngOnDestroy() { 
  
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('currentUser');
    localStorage.clear();

}
 

  transformStockView(data:CompanyDetails[]){
    let stockviews :Stockview[] = [];
    data.forEach(function (element) {
      let profit=Math.round(((element.currentprice-element.closingprice)/element.closingprice)*100);
      let finalprofit:string=''
      if (profit>0){
        finalprofit='+'+String(profit)+' %'
      }else{
        finalprofit=String(profit)+' %'
      } 
      stockviews.push(new Stockview(element.name,element.currentprice,finalprofit,element.ticker))
    });
    return stockviews 
  }


}
