import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TweetComponent } from './tweet/tweet.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faRetweet ,faReply,faStar,faSearch,faChevronUp,faChevronDown} from '@fortawesome/free-solid-svg-icons';
import { faTwitter} from '@fortawesome/free-brands-svg-icons';
import { LinkifyPipe } from '../pipes/linkify';
@NgModule({
  declarations: [TweetComponent,LinkifyPipe],
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  exports:[TweetComponent],
  entryComponents:[TweetComponent]
})
export class TwitterComponentsModule { 
  constructor() {
    // Add an icon to the library for convenient access in other components
    library.add(faRetweet ,faReply,faStar,faSearch,faTwitter,faChevronUp,faChevronDown);
  }
}
