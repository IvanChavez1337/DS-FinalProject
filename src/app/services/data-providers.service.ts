import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataProvidersService {

  constructor(private http: HttpClient) {
    console.log("Servicio de consulta de Apis Listo");
   }

   getCovidData(){
     const url = 'https://api.covid19api.com/summary'; //Api para consultar información de Covid 19 al día
      return this.http.get(url);
   }
   getNews(){
     const url = 'http://newsapi.org/v2/top-headlines?q=covid-19&country=mx&apiKey=1b77fc61fea34dca9927d50349ae9431'; //Api de noticias 
     return this.http.get(url);
   }
}
