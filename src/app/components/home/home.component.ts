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
  constructor(private dataProviders: DataProvidersService) {
   this.dataProviders.getCovidData().subscribe((res: any) => {console.log(res)
    this.paises=res['Countries'];
    this.global =(res['Global']);
    console.log(this.paises);
    this.recuperados = this.global['TotalRecovered']; //Evitamos error de tipo en consola
    console.log(this.global);
  });
   }

  ngOnInit(): void {
  }

}
