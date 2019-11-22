import { Component, OnInit, Input } from '@angular/core';
import { Article } from '../../interfaces/interfces';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ActionSheetController, Platform } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { LocaldataService } from '../../services/localdata.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent implements OnInit {
  @Input() noticia : Article;
  @Input() i : number;
  @Input() onFavoritos;

  constructor(
    private iab: InAppBrowser,
    private actionSheetCtrl: ActionSheetController,
    private socialSharing: SocialSharing,
    private noticiasLocales: LocaldataService,
    private thisPlatform:Platform,
    private toastController:ToastController
    ) { }

  ngOnInit() {}
  

  // browser.executeScript(...);
  
  // browser.insertCSS(...);
  
  
  // browser.close();

  showNewsDetail() {
    console.log('noticia', this.noticia.url);
    const browser = this.iab.create(this.noticia.url);

  //   browser.on('loadstop').subscribe(event => {
  //     browser.insertCSS({ code: 'body{color: red;}');
  //  });
  }

  async presentToast(message: string,header: string,) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      header,
      position: 'top',
    });
    toast.present();
  }

  compartirNoticia(){
    if(this.thisPlatform.is('cordova')){
      this.socialSharing.share(
        this.noticia.title,
        this.noticia.source.name,
        '',
        this.noticia.url
      );
    }else{
        if (navigator['share']) {
          navigator['share']({
              title: this.noticia.title,
              text: this.noticia.source.name,
              url: this.noticia.url,
          })
            .then(() => console.log('Successful share'))
            .catch((error) => console.log('Error sharing', error));
        }else{
          this.presentToast('Este navagador no permite compartir contenido, intenta usar otro navegador','Oops');
        }
    }
  }

  async menuOptions() {
    let btnTemplate ;
    if(this.onFavoritos){
      btnTemplate={
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Delete clicked');
          this.noticiasLocales.borrarNoticia(this.noticia);
        }
      };
    }else{
      btnTemplate={
        text: 'Favoritos',
        cssClass: 'action-dark',
        icon: 'star',
        handler: () => {
          console.log('Favorite clicked');
          this.noticiasLocales.guardarNoticia(this.noticia);
        }
      };
    }

    const actionSheet = await this.actionSheetCtrl.create({
      // header: 'Albums',
      backdropDismiss: false,
      buttons: [
      {
        text: 'Compartir noticia',
        cssClass: 'action-dark',
        icon: 'share',
        handler: () => {
          console.log('Share clicked');
            this.compartirNoticia();
          // this.socialSharing.share(
          //   this.noticia.title,
          //   this.noticia.source.name,
          //   '',
          //   this.noticia.url
          // );

        }
      },
      btnTemplate,
       {
        text: 'Cancelar',
        cssClass: 'action-dark',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }
}

