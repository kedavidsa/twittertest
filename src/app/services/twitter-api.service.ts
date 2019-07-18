import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {environment} from '../../environments/environment';


/**
 * Servicio que se encarga de enviar peticiones al servidor para realizar la busqueda
 */
@Injectable({
  providedIn: 'root'
})
export class TwitterApiService {

  //Numero de elementos por pagina
  elementsPerPage:number=9;
  //Ultimo id del ultimo tweet
  lastId:string="0";
  constructor(private httpClient:HttpClient) { 

  }

  /**
   * Consulta los tweets y retorna un observable con la respuesta del server
   * @param searchText 
   */
  getTweets(searchText:string){

    return this.httpClient.get( environment.twitterUrl+'search/tweets?q='+searchText+'&count='+this.elementsPerPage+'&max_id='+this.lastId);
  }


}
