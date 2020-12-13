import { DbService } from './services/db.service';
import { HttpClientModule } from '@angular/common/http';
import { DataProvidersService } from './services/data-providers.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { FormsModule } from '@angular/forms';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorage, AngularFireStorageModule } from '@angular/fire/storage';
import { firestore } from 'firebase';
import { NewsComponent } from './components/news/news.component';




const firebaseConfig = {
  apiKey: "AIzaSyCuiifyzkJIIVbaFcWYZmbOg-0_7Si5L-s",
  authDomain: "ds-finalproject.firebaseapp.com",
  projectId: "ds-finalproject",
  storageBucket: "ds-finalproject.appspot.com",
  messagingSenderId: "424468432689",
  appId: "1:424468432689:web:4be0d042de0c9d1385d210"
};

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    NewsComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireStorageModule
  ],
  providers: [
    DataProvidersService,
    DbService,
    AngularFirestore
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
