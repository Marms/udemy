import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {tap} from 'rxjs/operators';


@Injectable()
export class LoggingInterceptor implements HttpInterceptor {

  constructor() {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Intercepted', req);
    return next.handle(req).pipe(tap(
      (event) => {
        console.log('logging:', event);
      }
    ));
  }
}
