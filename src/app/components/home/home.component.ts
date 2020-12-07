import { DataProvidersService } from './../../services/data-providers.service';
import { Component, OnInit } from '@angular/core';


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

      //Variables consultas por pais
    nombrepais: any;
    casostotales:any;
    muertestotales:any;
    rectotales:any;
    nuevosconf:any;
    nuevasmuertes:any;
    nuevosrec:any;

  constructor(private dataProviders: DataProvidersService) {
   this.dataProviders.getCovidData().subscribe((res: any) => {console.log(res)
    this.paises=res['Countries'];
    this.global =(res['Global']);
    console.log(this.paises);
    this.recuperados = this.global['TotalRecovered']; //Evitamos error de tipo en consola
    console.log(this.global);
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
      
    }
     
   }

  ngOnInit(): void {
  }

}
