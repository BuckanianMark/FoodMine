import { Injectable } from '@angular/core';
import { Food } from '../shared/Models/Food';
import { sample_foods, sample_tags } from 'src/data';
import { Tag } from '../shared/Models/Tag';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor() { }
  getAll():Food[]{
    return sample_foods;
  }
  GetAllFoodsBySearchTerm(searchTerm:string){
    return this.getAll().filter(food=>food.Foodname.toLowerCase().includes(searchTerm.toLowerCase()))
  }
  GetFoodById(foodId:string){
    return this.getAll().find(food=>food.id == foodId)?? new Food()

  }
  GetAllTags():Tag[]{
    return sample_tags;

  }
  getAllFoddByTag(tag:string):Food[]{
    return tag == "All"?
    this.getAll():
    this.getAll().filter(food => food.tags?.includes(tag))
  }
}
