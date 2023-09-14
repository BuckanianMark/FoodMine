import { Injectable } from '@angular/core';
import { Food } from '../shared/Models/Food';
import { sample_foods, sample_tags } from 'src/data';
import { Tag } from '../shared/Models/Tag';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FOODS_BY_ID_URL, FOODS_BY_SEARCH_URL, FOODS_BY_Tag_URL, FOODS_URL, FOOD_TAGS_URL } from '../shared/constants/urls';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor(private http:HttpClient) { }
  getAll():Observable<Food[]>{
    return this.http.get<Food[]>(FOODS_URL)
  }
  GetAllFoodsBySearchTerm(searchTerm:string){
    return this.http.get<Food[]>(FOODS_BY_SEARCH_URL + searchTerm)
  }
  GetFoodById(foodId:string):Observable<Food>{
    return this.http.get<Food>(FOODS_BY_ID_URL + foodId)

  }
  GetAllTags(): Observable<Tag[]> {
    return this.http.get<Tag[]>(FOOD_TAGS_URL)

  }
  getAllFoddByTag(tag:string):Observable<Food[]>{
    return tag == "All"?
    this.getAll():
    this.http.get<Food[]>(FOODS_BY_Tag_URL + tag)
  }
}
