import { AuthService } from './../../services/auth.service';
import { DbService } from './../../services/db.service';
import { DataProvidersService } from './../../services/data-providers.service';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { BrowserModule } from '@angular/platform-browser';
import { NgxChartsModule } from '@swimlane/ngx-charts';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    paises: any[]=[];
    global: any;
    recuperados: number;
    opcion: any = 'Selecciona una opción';
    regvalue: any = 'Selecciona una opción';
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
      opcionHistorica: any = "Selecciona una opción";

      //Variables usuarios 

      idUser: any;
      user: any;
      isLogged: boolean = false;



      //
      isDoughnut: boolean = true;
      view=[600,400];
      view2=[550,400];
      legend: boolean = true;
      showLabels: boolean = true;
      animations: boolean = true;
      xAxis: boolean = true;
      yAxis: boolean = true;
      showYAxisLabel: boolean = false;
      showXAxisLabel: boolean = false;
      xAxisLabel: string = '';
      yAxisLabel: string = '';
      timeline: boolean = true;
      legendPosition= 'below'


      multi: any = [];
      piehist: any = [];
      pieact: any = [];

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
    this.registroglob['rectotales'] = this.global.TotalRecovered;
    this.registroglob['nuevosconf'] = this.global.NewConfirmed;
    this.registroglob['nuevasmuertes'] = this.global.NewDeaths;
    this.registroglob['nuevosrec'] = this.global.NewRecovered;
    this.registroglob['fecha'] = this.fecha_aux;

    this.multi = [
        {
          "name": "Total de Casos",
          "value": this.global.TotalConfirmed
        },
        {
          "name": "Total de Muertes",
          "value": this.global.TotalDeaths
        },
        {
          "name": "Total de recuperados",
          "value": this.global.TotalRecovered
        },
        {
          "name": "Total de Casos Nuevos",
          "value": this.global.NewConfirmed
        },
        {
          "name": "Total de Nuevas Muertes",
          "value": this.global.NewDeaths
        },
        {
          "name": "Total de Nuevos Recuperados",
          "value": this.global.NewRecovered
        }
  ];
 
    this.dbservice.insertarRegGlob(this.registroglob,this.fecha_aux).then(res => {
      console.log("Registro global insertado");
    }).catch(error =>{
      console.log(error);
    });

  this.Auth.afAuth.authState.subscribe(user =>{
    if(user){
      this.user = user;
      this.idUser = user.uid;
      this.dbservice.fireservice.collection('registros').doc(this.idUser).collection('paises').valueChanges().subscribe(val =>{
        this.datos = val;
        console.log(val);
      });
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
      

      this.pieact =[
        {
          "name": "Casos",
          "series": [
            {
              "name": "",
              "value": 0
            },
            {
              "name": "Hoy",
              "value": this.casostotales
            }
          ]
        },
        {
          "name": "Muertes",
          "series": [
            {
              "name": "",
              "value": 0
            },
            {
              "name": "Hoy",
              "value": this.muertestotales
            }
          ]
        },
        {
          "name": "Recuperados",
          "series": [
            {
              "name": "",
              "value": 0
            },
            {
              "name": "Hoy",
              "value": this.rectotales
            }
          ]
        },
        {
          "name": "Nuevos casos",
          "series": [
            {
              "name": "",
              "value": 0
            },
            {
              "name": "Hoy",
              "value": this.nuevosconf
            }
          ]
        },
        {
          "name": "Nuevas muertes",
          "series": [
            {
              "name": "",
              "value": 0
            },
            {
              "name": "Hoy",
              "value": this.nuevasmuertes
            }
          ]
        },
        {
          "name": "Nuevos recuperados",
          "series": [
            {
              "name": "",
              "value": 0
            },
            {
              "name": "Hoy",
              "value": this.nuevosrec
            }
          ]
        }
      ];





      let id = this.nombrepais + " - " + this.fecha_aux;
      this.dbservice.insertarReg(this.idUser,registro,id).then(res => { 
        console.log("Insertado correctamente");
      }).catch(error => {
        console.log(error);
      });

        
    }
     
   }
   consultaHistorica(){

    this.opcion = this.paises.find(item => item.Country === this.opcionHistorica.pais);

    this.consultar();

    console.log(this.opcionHistorica);
     if(this.opcionHistorica!=null||this.opcionHistorica!=undefined){
       
       this.reg_nombrepais = this.opcionHistorica.pais;
       this.reg_casostotales = this.opcionHistorica.casostotales;
       this.reg_muertestotales = this.opcionHistorica.muertestotales;
       this.reg_rectotales = this.opcionHistorica.rectotales;
       this.reg_nuevosconf = this.opcionHistorica.nuevosconf;
       this.reg_nuevasmuertes = this.opcionHistorica.nuevasmuertes;
       this.reg_nuevosrec = this.opcionHistorica.nuevosrec;
       this.reg_fecha =  this.opcionHistorica.fecha;

       this.piehist =[
        {
          "name": "Casos",
          "series": [
            {
              "name": this.reg_fecha,
              "value": this.reg_casostotales
            },
            {
              "name": "Hoy",
              "value": this.casostotales
            }
          ]
        },
        {
          "name": "Muertes",
          "series": [
            {
              "name": this.reg_fecha,
              "value": this.reg_muertestotales
            },
            {
              "name": "Hoy",
              "value": this.muertestotales
            }
          ]
        },
        {
          "name": "Recuperados",
          "series": [
            {
              "name": this.reg_fecha,
              "value": this.reg_rectotales
            },
            {
              "name": "Hoy",
              "value": this.rectotales
            }
          ]
        },
        {
          "name": "Nuevos casos",
          "series": [
            {
              "name": this.reg_fecha,
              "value": this.reg_nuevosconf
            },
            {
              "name": "Hoy",
              "value": this.nuevosconf
            }
          ]
        },
        {
          "name": "Nuevas muertes",
          "series": [
            {
              "name": this.reg_fecha,
              "value": this.reg_nuevasmuertes
            },
            {
              "name": "Hoy",
              "value": this.nuevasmuertes
            }
          ]
        },
        {
          "name": "Nuevos recuperados",
          "series": [
            {
              "name": this.reg_fecha,
              "value": this.reg_nuevosrec
            },
            {
              "name": "Hoy",
              "value": this.nuevosrec
            }
          ]
        }
      ];



     }
   }

  ngOnInit(): void {
  }

}
