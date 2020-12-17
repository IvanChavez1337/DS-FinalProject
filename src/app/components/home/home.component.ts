import { AuthService } from './../../services/auth.service';
import { DbService } from './../../services/db.service';
import { DataProvidersService } from './../../services/data-providers.service';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    paises: any[]=[];
    global: any;
    recuperados: number;
    opcion: any;
  fecha: Date;
  fecha_aux: string;
  registroglob:any = {};
      //Variables consultas por pais
    nombrepais: any;
    casostotales:any;
    muertestotales:any;
    rectotales:any;
    nuevosconf:any;
    nuevasmuertes:any;
    nuevosrec:any;

    //Variables de los registros historicos
    reg_nombrepais: any;
    reg_casostotales:any;
    reg_muertestotales:any;
    reg_rectotales:any;
    reg_nuevosconf:any;
    reg_nuevasmuertes:any;
    reg_nuevosrec:any;
    reg_fecha: any;

    //Variables datos historicos
      datos: any[] =[];
      opcionHistorica: any;

      //Variables usuarios 

      idUser: String;
      user: any;
      isLogged: boolean = false;

  constructor(private dataProviders: DataProvidersService, public dbservice:DbService, private Auth: AuthService) {
   this.dataProviders.getCovidData().subscribe((res: any) => {console.log(res)
    this.paises=res['Countries'];
    this.global =(res['Global']);
    console.log(this.paises);
    this.recuperados = this.global['TotalRecovered']; //Evitamos error de tipo en consola
    this.fecha = new Date(res['Date']);
    console.log(this.global);
    this.fecha_aux = moment(this.fecha).format('YYYY-MM-DD');
    console.log("fecha auxiliar "+this.fecha_aux);
  
    
    this.registroglob['casostotales'] = this.global.TotalConfirmed;
    this.registroglob['muertestotales'] = this.global.TotalDeaths;
    this.registroglob['rectotales'] = this.global.TotalRecovered;;
    this.registroglob['nuevosconf'] = this.global.NewConfirmed;
    this.registroglob['nuevasmuertes'] = this.global.NewDeaths;
    this.registroglob['nuevosrec'] = this.global.NewRecovered;
    this.registroglob['fecha'] = this.fecha_aux;
 
    this.dbservice.insertarRegGlob(this.registroglob,this.fecha_aux).then(res => {
      console.log("Registro global insertado");
    }).catch(error =>{
      console.log(error);
    });
  this.dbservice.fireservice.collection('paises').valueChanges().subscribe(val => {
      this.datos = val;
     console.log(val);
  });
  
  this.Auth.afAuth.authState.subscribe(user =>{
    if(user){
      this.user = user;
      this.Auth.isAuth().subscribe(auth => {
        if(auth){
          console.log("Usuario logeado en home");
          this.isLogged = true;
        }else{
          console.log("Usuario no logeado");
          this.isLogged = false;
        }
      });
    }
  });
});
  

   }

   consultar(){
    if(this.opcion!=null||this.opcion!=undefined){
      console.log(this.opcion);
      this.nombrepais = this.opcion.Country;
      this.casostotales = this.opcion.TotalConfirmed;
      this.muertestotales = this.opcion.TotalDeaths;
      this.rectotales = this.opcion.TotalRecovered;
      this.nuevosconf = this.opcion.NewConfirmed;
      this.nuevasmuertes = this.opcion.NewDeaths;
      this.nuevosrec = this.opcion.NewRecovered;
      
      let registro = {};
      registro['id'] = this.nombrepais + " - " + this.fecha_aux;
      registro['pais'] = this.nombrepais;
      registro['casostotales'] = this.casostotales;
      registro['muertestotales'] = this.muertestotales;
      registro['rectotales'] = this.rectotales;
      registro['nuevosconf'] = this.nuevosconf;
      registro['nuevasmuertes'] = this.nuevasmuertes;
      registro['nuevosrec'] = this.nuevosrec;
      registro['fecha'] = this.fecha_aux;
      console.log(registro);
      let id = this.nombrepais + " - " + this.fecha_aux;
      this.dbservice.insertarReg(registro,id).then(res => {
        console.log("Insertado correctamente");
      }).catch(error => {
        console.log(error);
      });

        
    }
     
   }
   consultaHistorica(){
     if(this.opcionHistorica!=null||this.opcionHistorica!=undefined){
       console.log(this.opcionHistorica);
       this.reg_nombrepais = this.opcionHistorica.pais;
       this.reg_casostotales = this.opcionHistorica.casostotales;
       this.reg_muertestotales = this.opcionHistorica.muertestotales;
       this.reg_rectotales = this.opcionHistorica.rectotales;
       this.reg_nuevosconf = this.opcionHistorica.nuevosconf;
       this.reg_nuevasmuertes = this.opcionHistorica.nuevasmuertes;
       this.reg_nuevosrec = this.opcionHistorica.nuevosrec;
       this.reg_fecha =  this.opcionHistorica.fecha;

     }
   }

  ngOnInit(): void {
  }

}
