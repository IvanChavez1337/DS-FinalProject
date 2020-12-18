import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class DbService {

  constructor(public fireservice: AngularFirestore) { }
  
  insertarReg(uid,registro,pais){
    //return this.fireservice.collection('paises').doc(pais).set(registro);
    return this.fireservice.collection('registros').doc(uid).collection('paises').doc(pais).set(registro); 
  }
  insertarRegGlob(registro,fecha){
    return this.fireservice.collection('global').doc(fecha).set(registro);
  }

}
