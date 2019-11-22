import { Component, ViewChild, OnInit } from '@angular/core';
import { IonSegment } from '@ionic/angular';
import { NoticiasService } from '../../services/noticias.service';
import { Article } from '../../interfaces/interfces';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{
@ViewChild(IonSegment, {static: true}) segment: IonSegment;
  categorias = ['technology', 'entertainment', 'general', 'health', 'science', 'sports', 'business'];
  noticias: Article[] = [];
  constructor(private noticiasService: NoticiasService) {}

  ngOnInit() {
    this.segment.value = this.categorias[0];
    this.cargarNoticias(this.categorias[0]);
  }
  categoryChange(event) {
    this.noticias = [];
    this.cargarNoticias(event.detail.value);
  }
  private cargarNoticias(categoria: string , event?) {
    this.noticiasService.getToHeadLinesByCat(categoria)
    .subscribe(data => {
      if (data.articles.length === 0) {
          event.target.disabled = true;
          event.target.complete();
        return;
      }
      this.noticias.push(...data.articles);
      if ( event) {
        event.target.complete();
        }
    });

  }

  loadData(event) {
    this.cargarNoticias(this.segment.value, event);
  }
}

