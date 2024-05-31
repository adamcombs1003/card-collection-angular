import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, throwError } from "rxjs";
import { Card } from "./models/card";

@Injectable({
    providedIn: 'root'
})
export class CardsHttpService {
    elasticBeanstalkUrl = "https://cardsapi.hoosier-dev.com";
    apiUrl = this.elasticBeanstalkUrl;

    constructor(private http: HttpClient) { }

    getAllCards() {
        return this.http.get<Card[]>(this.apiUrl + '/cards')
            .pipe(
                catchError(this.handleError)
            );
    }

    addCard(cardRequest: Card): Observable<any> {
        return this.http.post(this.apiUrl + '/cards/add', cardRequest)
            .pipe(
                catchError(this.handleError)
            );
    }

    updateCard(cardRequest: Card): Observable<any> {
        return this.http.put(this.apiUrl + '/cards/update', cardRequest)
            .pipe(
                catchError(this.handleError)
            );
    }

    deleteCard(cardId: string): Observable<any> {
        return this.http.delete(this.apiUrl + '/cards/delete/' + cardId)
            .pipe(
                catchError(this.handleError)
            );
    }

    private handleError(error: HttpErrorResponse) {
        if (error.status === 0) {
            console.error('An error occurred:', error.error);
        } else {
            console.error('Backend returned message: ' + error.message);
        }
        return throwError(() => new Error('Something bad happened; please try again later.'));
    }
}
