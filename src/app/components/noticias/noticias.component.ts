import { Component, OnInit, Input } from '@angular/core';
import { Article } from '../../interfaces/interfces';
// import { NoticiaComponent } from '../noticia/noticia.component';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.scss'],
})
export class NoticiasComponent implements OnInit {
@Input() noticias: Article[] = [];
@Input() onFavoritos= false;
  constructor() { }

  ngOnInit() {}

}
