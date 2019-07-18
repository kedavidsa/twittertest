import { Component, OnInit, Input } from '@angular/core';
import { LinkifyPipe } from 'src/app/pipes/linkify';

@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.scss']
})
export class TweetComponent implements OnInit {

  @Input()
  tweet:any;

  show:boolean=false;
  constructor() { }

  ngOnInit() {
    var linkify= new LinkifyPipe();
    this.tweet.textHtlm=linkify.transform(this.tweet.text);
  }
  toggleShow(){
    this.show=!this.show;
  }

}
