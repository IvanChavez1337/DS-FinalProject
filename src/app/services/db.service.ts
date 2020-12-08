import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class DbService {

  constructor(public fireservice: AngularFirestore) { }
  
  insertarReg(registro){
    return this.fireservice.collection('paises').add(registro);
  }
}
