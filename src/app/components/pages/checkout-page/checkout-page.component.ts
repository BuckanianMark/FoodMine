import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';
import { Order } from 'src/app/shared/Models/Order';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.css']
})
export class CheckoutPageComponent implements OnInit{
  order:Order = new Order();
  checkoutForm!:FormGroup
  constructor(
    private formBuilder:FormBuilder,
    private userservice:UserService,
    cartservice:CartService,
    private toastr:ToastrService,
    private orderservice:OrderService,
    private router:Router
  ){
    const cart = cartservice.getCart();
    this.order.items = cart.items;
    this.order.totalPrice = cart.totalPrice;
  }
  ngOnInit(): void {
    let {name,address} = this.userservice.currentUser;
    this.checkoutForm = this.formBuilder.group({
      name:[name,Validators.required],
      address:[address,Validators.required]
    })
    
  }
  get fc(){
    return this.checkoutForm.controls;
  }
  createOrder(){
    if(this.checkoutForm.invalid){
      this.toastr.warning('Please fill the inputs','Invalid Inputs');
      return;
    }

    if(!this.order.addressLatLng){
      this.toastr.warning('Please select your location on the map')
      return;
    }
    
    this.order.name = this.fc['name'].value;
    this.order.adress= this.fc['address'].value;
    this.orderservice.create(this.order).subscribe({
      next:()=>{
        this.router.navigateByUrl('/payment')
        console.log(this.order)
      },
      error:(errorResponse)=>{
        this.toastr.error(errorResponse.error,'Cart')
      }
    })
  }

}
