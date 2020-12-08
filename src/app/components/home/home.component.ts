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

    //Variables Datos Globales
    g_casostotales:any;
    g_muertestotales:any;
    g_rectotales:any;
    g_nuevosconf:any;
    g_nuevasmuertes:any;
    g_nuevosrec:any;



  constructor(private dataProviders: DataProvidersService, public dbservice:DbService) {
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
    })
  this.dbservice.fireservice.collection('paises').valueChanges().subscribe(val => {
    console.log(val);
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

  ngOnInit(): void {
  }

}
