import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SearchType, MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  results: Observable<any>;
  searchTerm = '';
  type: SearchType = SearchType.all ;
  slideOpts = {
    initialSlide: 1,
    speed: 400
  };

  constructor(private movieService: MoviesService ) { }

ngOnInit(){
  this.results = this.movieService.SearchData('2020', this.type);
}

searchChanged(){
  this.results = this.movieService.SearchData(this.searchTerm, this.type);
  // this.results.subscribe( res => {

  // })
}
}

