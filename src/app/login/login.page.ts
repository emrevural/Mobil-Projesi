//ADD OnInit
import { Component, OnInit } from '@angular/core';

//Import AngularFirestore to make Queries.
import { AngularFirestore } from '@angular/fire/firestore';

//Import Component for the update function and the Modal controller to handle the component.


import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss']
})
export class LoginPage implements OnInit {
  doc: any;
  records: { id: string; imgsrc: string; name: number; imdbid: string; }[];
  addrecord: {imdbid: string ; imgsrc: string; name: string};  

  constructor(
    private firestore: AngularFirestore,
    private modalController: ModalController,
  ) {}

  ngOnInit(){
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
  
  DeleteRecord(id){
    this.firestore.doc('/Records/'+id).delete()
  }

}