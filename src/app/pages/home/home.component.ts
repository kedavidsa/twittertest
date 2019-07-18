import { Component, OnInit } from '@angular/core';
import { TwitterApiService } from 'src/app/services/twitter-api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  //Variable donde almacenamos los Tweets cargados
  tweets=[];
  //Formulario con el campo search
  form: FormGroup;
  //Variable que indica que no vienen más registros en la busqueda
  searchEnd:boolean=false;
  //Variable que indica que hubo un error en el sistema
  searchError:boolean=false;
  constructor(private formBuilder:FormBuilder,private twitterAPIService:TwitterApiService) { }

  
  ngOnInit() {
    this.form = this.formBuilder.group({
      search: [null, [Validators.required,Validators.pattern('^[a-zA-Z0-9 ]*$')]]
    });
  }
  get search() {
    
    return this.form.get('search');
  }

  /**
   * Metodo que se llama cuando el formulario e enviado
   * */
  onSubmit(){
    if(!this.form.valid)
    return;
    const search=this.form.controls.search.value;
    this.tweets=[];
    this.twitterAPIService.lastId="0"; 
    this.searchEnd=false;   
    this.getTweets(search);
  }
  /**
   * Metodo que limpia el estado actual del formulario de busqueda
   * */
  clearValidators() {
    this.form.markAsPristine();
    this.form.markAsUntouched();
    this.form.updateValueAndValidity();
  }

  /**
   * Metodo que notifica el evento del scroll
   * */
  onScroll(){
    console.log("onScroll");
    const search=this.form.controls.search.value;
    this.getTweets(search);
  }
  /**
   * Metodo para llamar el servicio de busqueda de tweets 
   * @param search texto alfanumerico de busqueda
   * */
  getTweets(search:string){
    this.searchError=false;
    this.twitterAPIService.getTweets(search).subscribe(resp=>{
      
      if(resp && !resp['statusCode'] && resp['statuses'].length>0){
        if(this.tweets.length>0){
          this.tweets.push(...resp['statuses'].slice(1, resp['statuses'].length));
        }else{
          this.tweets.push(...resp['statuses']);
        }
        
        this.twitterAPIService.lastId=this.tweets[this.tweets.length-1].id_str;
        console.log(this.tweets);
        this.clearValidators();
      }else{
        console.log("No hay nuevos");
        this.searchEnd=true;
      }
    },
    error => {
      this.searchError=true;
    });
  }

}
