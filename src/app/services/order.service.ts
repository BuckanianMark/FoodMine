import { Injectable } from '@angular/core';
import { Order } from '../shared/Models/Order';
import { HttpClient } from '@angular/common/http';
import { ORDER_CREATE_URL, ORDER_NEW_FOR_CURRENTUSER_CREATE_URL, ORDER_PAY_URL } from '../shared/constants/urls';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http:HttpClient) { 
  }
  create(order:Order){
    return this.http.post<Order>(ORDER_CREATE_URL,order)
  }
  getnewOrderforCurrentUser():Observable<Order>{
    return this.http.get<Order>(ORDER_NEW_FOR_CURRENTUSER_CREATE_URL)
  }
  pay(order:Order):Observable<String>{
    return this.http.post<String>(ORDER_PAY_URL,order);
  }
 

  
}
