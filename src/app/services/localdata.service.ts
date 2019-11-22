import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Article } from '../interfaces/interfces';
import { ToastController } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class LocaldataService {
  noticiasLocales: Article[] = [];

  constructor(
      private storage: Storage,
      private toastController:ToastController
      ) {
    this.cargarNoticias();
   }

 async guardarNoticia( noticia: Article ) {
   var exist;
   await this.storage.get('favoritos')
    .then(dataStorage => {
      exist = false;
      dataStorage.forEach(item => {
          if (item.title === noticia.title) {
            // console.log('EXISTE');
            exist = true ;
            return;
          }
      });  
    });
    
   if (exist) {
      // console.log('EXISTE');
      this.presentToast('Esta noticia ya fue guardada anteiormente', '');
    } else {
      // console.log('NUEVA');
      this.noticiasLocales.unshift(noticia);
      this.storage.set('favoritos', this.noticiasLocales);
      this.presentToast('Noticia guardada', 'Exito');
    }
  }

  borrarNoticia( noticia: Article ) {
      var indexDelete = this.noticiasLocales.indexOf(noticia);
      this.noticiasLocales.splice(indexDelete, 1);

      // this.noticiasLocales = this.noticiasLocales.filter(item=>{});
      this.storage.set('favoritos',this.noticiasLocales);
      this.presentToast('Noticia Eliminada', 'Advertencia');
  }

  async cargarNoticias( ) {
    const favoritos  = await this.storage.get('favoritos');
    console.log('favoritos', favoritos);
    if (favoritos) {
      this.noticiasLocales = favoritos;
    }
  
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
}
