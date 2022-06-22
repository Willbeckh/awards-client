import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './user';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseurl = 'https://looku-awards.herokuapp.com/';
  // baseurl = 'http://localhost:8000/';
  constructor(private http: HttpClient) {}

  // define http headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('currentUser'),
    }),
  };
  // POST
  loginUser(username: string, password: string): Observable<User> {
    return this.http
      .post<User>(
        this.baseurl + 'login/',
        { username, password },
        this.httpOptions
      )
      .pipe(
        map((user) => {
          if (user && user['access']) {
            localStorage.setItem(
              'currentUser',
              JSON.stringify(user['access']).slice(1, -1)
            );
          }
          console.log('currentUser', localStorage.getItem('currentUser'));

          return user;
        })
      );
  }

  // log out user
  logoutUser() {
    localStorage.removeItem('currentUser');
  }

  // get current user
  getUsername() {
    // return JSON.parse(localStorage.getItem('currentUser')).email;
  }

  // POST register
  registerUser(data: any): Observable<User> {
    return this.http
      .post<User>(this.baseurl + 'register/', data)
      .pipe(retry(1), catchError(this.errorHandler));
  }

  // GET all projects
  getProjects(): Observable<User[]> {
    return this.http
      .get<User[]>(this.baseurl + 'api/projects/', this.httpOptions)
      .pipe(retry(1), catchError(this.errorHandler));
  }

  // GET project by id
  getProjectById(id: number): Observable<User> {
    return this.http
      .get<User>(this.baseurl + 'api/projects/' + id, this.httpOptions)
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
