import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { observable, Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";


@Injectable()
export class HttpErrorsInterceptor implements HttpInterceptor{

    constructor (){}

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError((err) => {
                console.log(err);;
                return throwError(err);
            }
        ));
    }
}
