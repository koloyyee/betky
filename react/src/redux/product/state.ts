
export interface IProduct{
    id:number;
    package:string;
    token:number;
    price:number;
}

export interface IProductState{
    products:IProduct[]
    msg:string
}