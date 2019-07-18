import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {environment} from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class TwitterApiService {

  elementsPerPage:number=9;
  lastId:string="0";
  constructor(private httpClient:HttpClient) { 

  }

  getTweets(searchText:string){

    return this.httpClient.get( environment.twitterUrl+'search/tweets?q='+searchText+'&count='+this.elementsPerPage+'&max_id='+this.lastId);
  }


}
