import { Component, OnInit } from '@angular/core';
import { LocaldataService } from '../../services/localdata.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page  implements OnInit {

  constructor(
    public noticias: LocaldataService
  ) {}

  ngOnInit(){
    
  }
}
