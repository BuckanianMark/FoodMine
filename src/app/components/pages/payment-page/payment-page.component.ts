import { Component,OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Order } from 'src/app/shared/Models/Order';
import { OrderService } from 'src/app/services/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-page',
  templateUrl: './payment-page.component.html',
  styleUrls: ['./payment-page.component.css']
})
export class PaymentPageComponent implements OnInit{
  order:Order = new Order();

  constructor(router:Router,private orderservice:OrderService){
    orderservice.getnewOrderforCurrentUser().subscribe({
      next:(order)=>{
        this.order = order;
      },
      error:()=>{
        router.navigateByUrl('/checkout')
      }
    })
  }
 ngOnInit(): void {
   
 }

}
