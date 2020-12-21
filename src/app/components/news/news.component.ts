import { AuthService } from './../../services/auth.service';
import { DataProvidersService } from './../../services/data-providers.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  noticias: any[]=[];
  user: any;
  isLogged: boolean;

  constructor(private dataProviders: DataProvidersService, private Auth: AuthService) {
    this.dataProviders.getNews().subscribe((res:any) => {
      this.noticias = res['articles'];
    });

    this.Auth.afAuth.authState.subscribe(user => {
      if(user){
        this.user = user;
        this.Auth.isAuth().subscribe(auth => {
          if(auth){
            console.log("Usuario logeado");
            this.isLogged = true;
          }else{
            console.log("Usuario no logeado");
            this.isLogged = false;
          }
        });
      }
  });
   }

  ngOnInit(): void {
  }

}
