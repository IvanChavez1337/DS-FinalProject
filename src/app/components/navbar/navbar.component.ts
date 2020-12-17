import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

    user: any;
    isLogged: boolean;
  constructor(private Auth: AuthService) { 
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
  cerrarSesion(){
    this.Auth.logout();
  }
}
