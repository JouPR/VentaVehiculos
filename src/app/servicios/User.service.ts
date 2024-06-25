import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService implements HttpInterceptor {
usuario = 'johanna.pilatasig';
clave = '12345';

constructor() { }
intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  let clonar = req.clone({
    headers: req.headers.append(this.clave, this.usuario)
  });
  return next.handle(clonar);
}
}
