import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FoodService } from 'src/app/services/food.service';
import { Food } from 'src/app/shared/Models/Food';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  foods:Food[]= []
  constructor(private foodservice:FoodService,private activatedroute:ActivatedRoute){
    this.activatedroute.params.subscribe(params=>{
      if(params['searchTerm'])
      this.foods = this.foodservice.GetAllFoodsBySearchTerm(params['searchTerm']);
    else if(params['tag'])
     this.foods = this.foodservice.getAllFoddByTag(params['tag'])
      else this.foods = this.foodservice.getAll();
    })
    
  }
  ngOnInit(): void {

    
  }
}
