import { User } from './../../services/user.model';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: any;
  isLogged: boolean = false;

  constructor(public auth: AuthService, private router:Router) { 
    this.auth.afAuth.authState.subscribe(user =>{
      if(user){
        this.user = user;
        this.auth.isAuth().subscribe(auth => {
          if(auth){
            console.log("Usuario logeado en home");
            this.isLogged = true;
            this.router.navigate(['/home']);
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

    async iniciarSesion(){
      try{
        const user = await this.auth.loginGoogle();
        if(user){
          this.router.navigate(['/home']);
        }
      }catch(error){
        console.log(error)
      }
    }

}
