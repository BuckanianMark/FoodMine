import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../shared/Models/User';
import { IUserLogin } from '../shared/Interfaces/IUserlogin';
import { HttpClient } from '@angular/common/http';
import { USER_LOGIN_URL, USER_REGISTER_URL } from '../shared/constants/urls';
import { ToastrService } from 'ngx-toastr';
import { UrlSerializer } from '@angular/router';
import { IUserRegister } from '../shared/Interfaces/IUserRegister';

const USER_KEY = 'User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userSubject = new BehaviorSubject<User>(this.getUserFromLocalStorage());
  public userObservable:Observable<User>;
  constructor(private http:HttpClient,private toastr:ToastrService) { 
    this.userObservable = this.userSubject.asObservable();
  }
  public get currentUser():User{
    return this.userSubject.value;
  }
  login(userLogin:IUserLogin):Observable<User>{
   return this.http.post<User>(USER_LOGIN_URL,userLogin).pipe(
    tap({
      next:(userLogin) =>{
        this.setUserToLocalStoreage(userLogin);
        this.userSubject.next(userLogin)
        this.toastr.success(
          `Welcome to TakeOut ${userLogin.name}`,
          'Login Successful'
        )
      },
      error:(errorResponse)=>{
      this.toastr.error(errorResponse.error,'Login Failed')
      }
    })
   )
  }
  register(userRegister:IUserRegister):Observable<User>{
    return this.http.post<User>(USER_REGISTER_URL,userRegister).pipe(
      tap({
        next: (user) => {
          this.setUserToLocalStoreage(user);
          this.userSubject.next(user);
          this.toastr.success(
            `Welcome to TakeOut ${user.name}`,
            'Registratred successfully'
          )
        },
        error:(errorResponse) => {
          this.toastr.error(errorResponse.error,
            'Registration Failed');
          
        }
      })
    )
  }
  logOut(){
    this.userSubject.next(new User());
    localStorage.removeItem(USER_KEY)
    window.location.reload();
  }

  private setUserToLocalStoreage(user:User){
    localStorage.setItem(USER_KEY,JSON.stringify(user));
  }

  private getUserFromLocalStorage():User{
    const userJson = localStorage.getItem(USER_KEY)
    if(userJson) return JSON.parse(userJson) as User;
    return new User();
  }
}
