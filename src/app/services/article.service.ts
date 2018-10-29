import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Article } from '../models/article';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private API_URL = 'http://localhost:80/jsonapi/node/article';

  constructor(private http: HttpClient, private authService: AuthService) { }

  setHeaders() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*',
        Authorization: `Bearer ${this.authService.getToken()}`
      })
    };

    return httpOptions;
  }

  getArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(this.API_URL);
  }

  getArticleById(id: string): Observable<Article> {
    return this.http.get<Article>(`${this.API_URL}/${id}`);
  }

  createArticle(body: any): Observable<Article> {
    return this.http.post<Article>(`${this.API_URL}`, body, this.setHeaders());
  }

  updateArticle(id: string, body: any): Observable<Article> {
    return this.http.patch<Article>(`${this.API_URL}/${id}`, body, this.setHeaders());
  }

  deleteArticle(id: string): Observable<Article> {
    return this.http.delete<any>(`${this.API_URL}/${id}`, this.setHeaders());
  }
}
