import { DataProvidersService } from './../../services/data-providers.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  noticias: any[]=[];
  constructor(private dataProviders: DataProvidersService) {
    this.dataProviders.getNews().subscribe((res:any) => {
      console.log(res);
      this.noticias = res['articles'];
    })
   }

  ngOnInit(): void {
  }

}
