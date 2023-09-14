import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { CartService } from 'src/app/services/cart.service';
import { FoodService } from 'src/app/services/food.service';
import { Food } from 'src/app/shared/Models/Food';

@Component({
  selector: 'app-food-page',
  templateUrl: './food-page.component.html',
  styleUrls: ['./food-page.component.css']
})
export class FoodPageComponent {
  food!: Food;
  constructor(private router:Router,private cartservice:CartService,activatedroute:ActivatedRoute,foodservice:FoodService){
    activatedroute.params.subscribe((params)=>{
      if(params['id'])
      foodservice.GetFoodById(params['id']).subscribe(serverFood =>{
       this.food = serverFood;
    })

    })
  }
  addToCart(){
    this.cartservice.addToCart(this.food)
    this.router.navigateByUrl('/cart-page');
  }

}
