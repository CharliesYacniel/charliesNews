import { Component, OnInit } from '@angular/core';
import { NoticiasService } from 'src/app/services/noticias.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{
  // noticias: any;

  constructor(private serviceNoticias:NoticiasService) {
  }
 ngOnInit() {
  this.serviceNoticias.getToHeadLines().subscribe(data => {
    console.log('NOTICIAS RESP', data);
  });
 }
}
