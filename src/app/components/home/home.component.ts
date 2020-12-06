import { DataProvidersService } from './../../services/data-providers.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    variable: any[]=[];
    variable2: any;
    recuperados: number;
  constructor(private dataProviders: DataProvidersService) {
   this.dataProviders.getCovidData().subscribe((res: any) => {console.log(res)
    this.variable2 =(res['Global']);
    this.recuperados = this.variable2['TotalRecovered']; //Evitamos error de tipo en consola
    console.log(this.variable2);
  });
   }

  ngOnInit(): void {
  }

}
