import { Injectable } from '@angular/core';
import { Cart } from '../shared/Models/Cart';
import { BehaviorSubject, Observable } from 'rxjs';
import { Food } from '../shared/Models/Food';
import { CartItem } from '../shared/Models/CartItem';


@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart:Cart =  this.getCartFromLocalStorage();
  public cartObservable:Observable<Cart>;
  private cartSubject= new BehaviorSubject<Cart>(this.cart)
 // private cartSubject: BehaviorSubject<Cart> = new BehaviorSubject(this.getCartFromLocalStorage())
  
  constructor() { 
    this.cartObservable = this.cartSubject.asObservable();
  }
  addToCart(food:Food):void{
    let cartItem = this.cart.items
          .find(item=>item.food.id === food.id);
          if(cartItem)
          return;
        this.cart.items.push(new CartItem(food));
        this.setCartToLocalstorage();
  }
  removeFromCart(foodId:string):void{
      this.cart.items = this.cart.items
      .filter(item=>item.food.id != foodId);
      this.setCartToLocalstorage();
  }
  changeQuantity(foodId:string,quantity:number){
    let cartItem =this.cart.items
      .find(item => item.food.id === foodId);
      if(!cartItem) return;

      cartItem.quantity = quantity;
      cartItem.price = quantity * cartItem.food.price;
      this.setCartToLocalstorage();
  }
  clearCart(){
    this.cart = new Cart();
    this.setCartToLocalstorage();
  }
  getCartObservable():Observable<Cart>{
    return this.cartSubject.asObservable();
  }
  getCart():Cart{
    return this.cartSubject.value;
  }

  private setCartToLocalstorage():void{
    this.cart.totalPrice = this.cart.items
    .reduce((prevSum, currentItem) => prevSum + currentItem.price,0)
    this.cart.totalcount = this.cart.items
    .reduce((prevSum,currentItem)=>prevSum+currentItem.quantity,0);
    
    const cartJson = JSON.stringify(this.cart);
    localStorage.setItem('Cart', cartJson);
    this.cartSubject.next(this.cart);
  }
  private getCartFromLocalStorage():Cart{
    const cartJsom = localStorage.getItem('Cart');
    return cartJsom? JSON.parse(cartJsom):new Cart();
  }
}
