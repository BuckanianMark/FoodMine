import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpEventType
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { LoadingService } from 'src/app/services/loading.service';

var pendingrequests = 0;

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  constructor(private loadingservice:LoadingService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.loadingservice.showLoading();
    pendingrequests =pendingrequests +1;
    return next.handle(request).pipe(
      tap({
        next:(event) => {
          if(event.type === HttpEventType.Response){
            this.handleHideloading();
          }
        },
        error:() =>{
          this.handleHideloading()
        }
      })
    )
  }
  handleHideloading(){
    pendingrequests = pendingrequests -1;
    if(pendingrequests === 0){
      this.loadingservice.hideLoading();
    }

  }
}
