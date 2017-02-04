import { Component } from '@angular/core';
import { NavController, ActionSheetController, ModalController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Api } from '../../providers/api/api';
import { SendModal } from './sendModal';

/*
  Generated class for the DetailsPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'details.html',
  providers: [Api]
})
export class DetailsPage {
  private app = {
    head: {
      icon: ""
    },
    apikey: "",
    appno: ""
  };
  private index;
  constructor(
    private nav: NavController,
    private api: Api,
    private navParams: NavParams,
    private modalCtrl: ModalController,
    private actionSheetCtrl: ActionSheetController,
    private storage: Storage
  ) {
    this.index = navParams.get('index');
    const index = this.index;
    storage.get('apps').then(apps => JSON.parse(apps)).then(apps => {
      api.head(apps[index].appno).subscribe(
        data => {
          apps[index].head = data.json();
        },
        err => {
          console.log(err);
        },
        () => {
          storage.set("apps", JSON.stringify(apps));
          this.app = apps[index];
        }
      )
    });
  }
  goBack() {
    this.nav.pop();
  }
  send() {
    SendModal.prototype.apikey = this.app.apikey;
    SendModal.prototype.appno = this.app.appno;
    SendModal.prototype.icon = this.app.head.icon;
    let modal = this.modalCtrl.create(SendModal);
    modal.present();
  }
  delete() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Delete application',
      buttons: [
        {
          text: 'Yes, delete it.',
          role: 'destructive',
          handler: () => {
            console.log("Delete app");
            this.storage.get('apps').then(apps => JSON.parse(apps)).then(apps => {
              apps.splice(this.index, 1);
              this.storage.set("apps", JSON.stringify(apps));
              setTimeout(() => {
                this.goBack();
              }, 600);
            });
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }
}
