import { Component,ElementRef,Input,OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/shared/Models/Order';

//window.paypal

declare var paypal: any;

@Component({
  selector: 'paypal-button',
  templateUrl: './paypal-button.component.html',
  styleUrls: ['./paypal-button.component.css']
})
export class PaypalButtonComponent implements OnInit{
  @Input()
  order!:Order
  @ViewChild('paypal',{static:true})
  paypalElement!:ElementRef;
 

  constructor(private orderservice:OrderService,
    private router:Router,
    private cartService:CartService,
    private toastr:ToastrService){}

  ngOnInit(): void {
    
    const self = this;
    paypal.Buttons({
      createOrder:(data:any,actions:any) =>{
        return actions.order.create({
          purchase_units:[
            {
              amount:{
                currency_code:'USD',
                value:self.order.totalPrice
              }
            }
          ]
        })
      },
      onApprove :async (data:any,actions:any) =>{
        const payment = await actions.order.capture();
        this.order.paymentId = payment.id;
        self.orderservice.pay(this.order).subscribe(
          {
          next:(orderId) =>{
            this.cartService.clearCart();
            this.router.navigateByUrl('/track/' + orderId);
            this.toastr.success(
              'Payment saved successfully',
              'Success'

            );
          },
          error:(err) =>{
            this.toastr.error('Payment save failed', 'Error')
          }
          }
          );
          
        },
        onError:(err:any) =>{
          this.toastr.error('Payment Failed','Error');
          console.log(err)
        },
      }).render(this.paypalElement.nativeElement);
    }
    
  }


