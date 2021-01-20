import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequetsService {

  apiURL = 'https://tahoot-backend.herokuapp.com';

  constructor(private http: HttpClient) { }

  //Post Request
  postRequest(endpoint: string, data: any): Observable<any>{
    return this.http.post<any>(this.apiURL + endpoint, data)
    .pipe(
      catchError(this.handleError)
    );
  }

  //Get Request
  getRequest(endpoint: string): Observable<any>{
    return this.http.get<any>(this.apiURL + endpoint).pipe(
      catchError(this.handleError)
    );
  }

  //Put Request
  putRequest(endpoint: string, id: number, data: any): Observable<any>{
    return this.http.put<any>(this.apiURL + "/" + endpoint + "/" + id, data)
    .pipe(
      catchError(this.handleError)
    );
  }

  //Delete Request
  deleteRequest(endpoint: string, id: number): Observable<any>{
    return this.http.delete<any>(this.apiURL + "/" + endpoint + "/" + id);
  }

  //Get Quizzes
  getQuiz(endpoint: string, id: number): Observable<any>{
    return this.http.get(this.apiURL + "/" + endpoint + "/" + id);
  }

  //handling errors
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error(error.error.message)
    } else {
      console.error(error.status)
    }

    return throwError("Error!");
  }
}
