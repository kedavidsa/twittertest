import { Component, OnInit, Input } from '@angular/core';
import { LinkifyPipe } from 'src/app/pipes/linkify';

/**
 * Componente parapintar cada tweet
 */
@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.scss']
})
export class TweetComponent implements OnInit {

  @Input()
  tweet:any;

  //Variable que indica si el tweet esta abierto
  show:boolean=false;
  constructor() { }

  ngOnInit() {
    var linkify= new LinkifyPipe();
    //Creamos una nueva variable para almacenar el texto con a href
    this.tweet.textHtlm=linkify.transform(this.tweet.text);
  }
  /**
   * Metodo que hace toggle para abrir  serrar el mas del tweet
   */
  toggleShow(){
    this.show=!this.show;
  }

}
