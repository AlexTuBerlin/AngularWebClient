import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { User } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private apiUrl = 'http://localhost:9000/api';
  constructor(private http: HttpClient) {}

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/users`);
  }

  getUsersByName(user_name: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/users?name=${user_name}`);
  }

  addUser(newUser: User): Observable<any> {  
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const httpOptions = {
      headers: headers
    };
    return this.http.post<any>(`${this.apiUrl}/users`, newUser, httpOptions)
      .pipe(
        catchError(this.handleError)
        )
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    if (err.error instanceof ErrorEvent) {
      console.error('An error occurred:', err.error.message);
    } else {
      console.error(`Backend returned code ${err.status}, body was: ${err.error}`);
    }
    return throwError(() => err);
  }
}