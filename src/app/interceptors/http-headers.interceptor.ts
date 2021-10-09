import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { observable, Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";


@Injectable()
export class HttpHeadersInterceptor implements HttpInterceptor{

    constructor (){}

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        req = req.clone({
            setHeaders: {
                "x-rapidapi-key": "8e71a8f667msh3e812362bc0b4b4p1fa4b0jsnae3634a015c6",
                "x-rapidapi-host": "rawg-video-games-database.p.rapidapi.com",
            },
            setParams: {
                key: '95c77cfd0a8e485bb019cd24d6783d0b',
            }
        });
        return next.handle(req);
    }
}
