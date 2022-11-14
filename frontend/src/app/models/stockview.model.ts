export class Stockview {
    public stock: string;
    public price :number;
    public profit:string;
    public ticker:string;

    constructor( stock:string, price:number, profit:string,ticker:string){
        this.stock=stock;
        this.price=price
        this.profit=profit
        this.ticker=ticker
    }
}
