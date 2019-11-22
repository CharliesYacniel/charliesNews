import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RespuestaTopHeadlines } from '../interfaces/interfces';
import { environment } from '../../environments/environment';

const apiKey = environment.apiKey;
const urlBase = environment.urlbase;
const country = environment.country;

const headers = new HttpHeaders({
                      'X-Api-Key': apiKey
                    });
@Injectable({
  providedIn: 'root'
})
export class NoticiasService {
  counterPage = 0;
  catActual = '';
  catPage = 0;
  constructor(private http:HttpClient) { }
  
  private executeQuery<T>(query: string) {
    query = urlBase + query;
    // console.log(query);
   return this.http.get<T>(query , { headers } );
  }

  getToHeadLines() {
    this.counterPage++;
   return this.executeQuery<RespuestaTopHeadlines>( `/top-headlines?country=${country}&page=${this.counterPage}` );
  }

  getToHeadLinesByCat(categoria: string) {
    if(this.catActual === categoria){
      this.catPage++;
    }else{
      this.catActual = categoria;
      this.catPage = 1;
    }
    return this.executeQuery<RespuestaTopHeadlines>(`/top-headlines?country=` + country + `&category=${categoria}&page=${this.catPage }`);
   }
}
