import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
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
    let foodsObservable:Observable<Food[]>;
    this.activatedroute.params.subscribe(params=>{
      if(params['searchTerm'])
      foodsObservable = this.foodservice.GetAllFoodsBySearchTerm(params['searchTerm']);
    else if(params['tag'])
     foodsObservable = this.foodservice.getAllFoddByTag(params['tag'])
      else 
       foodsObservable = this.foodservice.getAll();

       foodsObservable.subscribe((serverfoods)=>{
        this.foods = serverfoods;
       })
    })
    
  }
  ngOnInit(): void {

    
  }
}
