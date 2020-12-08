import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class DbService {

  constructor(public fireservice: AngularFirestore) { }
  
  insertarReg(registro,pais){
    return this.fireservice.collection('paises').doc(pais).set(registro);
  }
  insertarRegGlob(registro,fecha){
    return this.fireservice.collection('global').doc(fecha).set(registro);
  }

}
