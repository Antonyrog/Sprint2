import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from '../service/data.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{
  constructor(private inject:Injector) { }

  /* interceptor captura el token y lo utiliza en toda la utilizacion del sistema */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    let dataservice=this.inject.get(DataService);
    let jwtToken=req.clone({
      setHeaders: {
        Authorization: 'bearer ' + dataservice.GetToken()
      }
    });
    return next.handle(jwtToken);
  }

}
