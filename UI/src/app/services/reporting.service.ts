import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ReportingService {

    constructor(private http: HttpClient) { }

    url :string ="http://localhost:7252/api/send";

    Send<T>(value: T): Observable<unknown> {

        return this.http.post<T>(this.url, value)
          .pipe(
            catchError((err) => {console.log(err);return throwError(() => err);})
          );
      }
}