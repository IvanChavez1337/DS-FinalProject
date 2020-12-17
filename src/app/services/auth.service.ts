import { User } from './user.model';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { auth } from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {switchMap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$:Observable<any>;

  constructor(public afAuth: AngularFireAuth, public afs: AngularFirestore, public router: Router) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if(user){
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        }else{
          return of(null);
        }
      })
    );
   }

    async loginGoogle(): Promise<User>{
      try{
        const {user} = await this.afAuth.signInWithPopup(
          new auth.GoogleAuthProvider()
        );
        this.updateUserData(user);
        return user;
      }catch(error){
        console.log(error);
      }
    }

    updateUserData(user: User){
      const userRef: AngularFirestoreDocument<User> = this.afs.doc(
        `users/${user.uid}`
      );
  
      const data: User = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
      photoURL: user.photoURL
      };
  
      return userRef.set(data, { merge: true });
    }

      async logout(): Promise<void>{
        try{
          await this.afAuth.signOut();
        }catch(error){
          console.log(error);
        }
      }
      isAuth() {
        return this.afAuth.authState.pipe(map(auth => auth));
    }
}
