import { Component, Input } from '@angular/core';
import { Order } from 'src/app/shared/Models/Order';

@Component({
  selector: 'order-item-list',
  templateUrl: './order-item-list.component.html',
  styleUrls: ['./order-item-list.component.css']
})
export class OrderItemListComponent {
  @Input()
  order!:Order;
  constructor(){

  }

}
