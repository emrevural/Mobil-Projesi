import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SearchType, MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
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
