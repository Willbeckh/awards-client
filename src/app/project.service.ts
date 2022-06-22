import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Project } from './project';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { retry, catchError, map } from 'rxjs/operators';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  baseurl = 'https://looku-awards.herokuapp.com/';
  // baseurl = 'http://localhost:8000/';

  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':
        'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW',
      Authorization: 'Bearer ' + localStorage.getItem('currentUser'),
    }),
  };

  // GET projects
  getProjects(): Observable<Project[]> {
    return this.http
      .get<Project[]>(this.baseurl + 'api/projects/', this.httpOptions)
      .pipe(retry(1), catchError(this.errorHandler));
  }

  // GET project by id
  getProjectById(id: number): Observable<Project> {
    return this.http
      .get<Project>(this.baseurl + 'api/projects/' + id, this.httpOptions)
      .pipe(retry(1), catchError(this.errorHandler));
  }

  // create project
  createProject(project: Project): Observable<Project> {
    return this.http
      .post<Project>(this.baseurl + 'api/projects/', project, this.httpOptions)
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
