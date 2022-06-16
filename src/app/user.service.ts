import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './user';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  // base url
  // baseurl = 'https://looku-awards.herokuapp.com/';
  baseurl = 'http://localhost:8000/';
  constructor(private http: HttpClient) {}

  // define http headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  // POST
  loginUser(data: any): Observable<User> {
    return this.http
      .post<User>(this.baseurl + 'login/', data, this.httpOptions)
      .pipe(retry(1), catchError(this.errorHandler));
  }
  // GET all users
  getUsers(): Observable<User[]> {
    return this.http
      .get<User[]>(this.baseurl)
      .pipe(retry(1), catchError(this.errorHandler));
  }

  // error handler
  errorHandler(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}
