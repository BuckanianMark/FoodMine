import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/Models/User';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
cartQuantity=0;
user!:User;
constructor(
  cartservice:CartService,
  private userService:UserService,
  private router:Router
  ){
  cartservice.getCartObservable().subscribe((newcart)=>{
    this.cartQuantity = newcart.totalcount
  })
  userService.userObservable.subscribe((newUser) =>{
    this.user = newUser;
   
  })
}
ngOnInit(): void {
  
  
}
logout(){
  this.userService.logOut();
  return this.router.navigateByUrl('/login')
}
get isAuth(){
  return this.user.token
}
}
