import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SearchType, MoviesService } from 'src/app/services/movies.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  styleUrls: ['./movie-details.page.scss'],
})
export class MovieDetailsPage implements OnInit {
  information = null;
  records: { id: string; imgsrc: string; name: string; imdbid: string; }[];
  addrecord: {imdbid: string ; imgsrc: string; name: string}; 
  private isButtonVisible = true;


  constructor(private activatedRoute: ActivatedRoute, private movieService: MoviesService, private firestore: AngularFirestore,
    private modalController: ModalController,) { }

  ngOnInit() {
    let id = this.activatedRoute.snapshot.paramMap.get('id');

    this.movieService.getDetails(id).subscribe(result => {
      console.log('details: ', result);
      this.information = result;
    })
    this.addrecord = {imdbid :'', imgsrc :'', name: null}    
    this.firestore.collection('/Records/').snapshotChanges().subscribe(res=>{
      if(res){
        this.records = res.map(e=>{
          return{
            id: e.payload.doc.id,
            imgsrc: e.payload.doc.data()['imgsrc'],
            name: e.payload.doc.data()['name'],
            imdbid: e.payload.doc.data()['imdbid']
          }
        })   
      }  
    })

  }
  AddRecord(imdbid, imgsrc, name){
    let addrecord = {}
    addrecord['imdbid'] = imdbid
    addrecord['imgsrc'] = imgsrc
    addrecord['name'] = name
    console.log(addrecord)
    this.firestore.collection('/Records/').add(addrecord).then(()=>{
      this.addrecord = {imdbid :'', imgsrc :'', name: null} 
    })
  }

  openWebsite() {
    window.open(this.information.Website, '_blank');
  }

}