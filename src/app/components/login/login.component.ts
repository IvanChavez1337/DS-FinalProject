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

  constructor(public auth: AuthService, private router:Router) { }

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
