import { Component } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/firestore';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  private isLabelVisible = true;
  addrecord: {type: string ; description: string; amount: number};  
  records: { id: string; description: string; amount: number; type: string; }[];
searchTitle: '';
  movieApiUrl = '';
  movieData = {
    title: '',
    description: '',
    imageUrl: '',
    imdbRating: '',
    Director: '',
    Actors: ''

  };
  constructor(public http: HttpClient, private firestore: AngularFirestore,
    private modalController: ModalController,) {

  }
  ngOnInit(){
    this.addrecord = {type :'', description :'', amount: null}    
    this.firestore.collection('/Records/').snapshotChanges().subscribe(res=>{
      if(res){
        this.records = res.map(e=>{
          return{
            
            id: e.payload.doc.id,
            description: e.payload.doc.data()['description'],
            amount: e.payload.doc.data()['amount'],
            type: e.payload.doc.data()['type']
          }
        })   
      }  
    })
  }
  readAPI(URL: string){
    return this.http.get(URL);
  }
  searchMovie(){
    
    const search = encodeURIComponent(this.searchTitle).trim();
    this.movieApiUrl = 'http://www.omdbapi.com/?apikey=723d8dcf&t=' + search;
    this.readAPI(this.movieApiUrl)
    .subscribe((data) => {
      console.log(data);
      // tslint:disable-next-line: no-string-literal
      this.movieData.title = data['Title'];
       // tslint:disable-next-line: no-string-literal
      this.movieData.description = data['Plot'];
       // tslint:disable-next-line: no-string-literal
      this.movieData.imageUrl = data['Poster'];
       // tslint:disable-next-line: no-string-literal
      this.movieData.Director = 'Yönetmen : ' + data['Director'];
       // tslint:disable-next-line: no-string-literal
      this.movieData.imdbRating = 'Imbd Puanı :' + data['imdbRating'];
       // tslint:disable-next-line: no-string-literal
      this.movieData.Actors = 'Oyuncular : ' + data['Actors'];
      
    });
  }
  AddRecord(type, description, amount){
    let addrecord = {}
    addrecord['type'] = type
    addrecord['description'] = description
    addrecord['amount'] = amount
    console.log(addrecord)
    this.firestore.collection('/Records/').add(addrecord).then(()=>{
      this.addrecord = {type :'', description :'', amount: null} 
    })
  }

}
