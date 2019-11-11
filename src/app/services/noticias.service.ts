import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  constructor(private httpClient:HttpClient) { }
  
  getToHeadLines() {
   return this.httpClient.get('https://newsapi.org/v2/top-headlines?country=us&apiKey=075c17a972fe456caae8a92950dee45e');
  }
}
