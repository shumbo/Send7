import { ViewController, NavController, AlertController } from 'ionic-angular';
import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Api } from './../../providers/api/api';

@Component({
  templateUrl: 'addModal.html',
  providers: [Api]
})
export class AddModal {
  public appno;
  public apikey;
  constructor(
    private viewCtrl: ViewController,
    public api: Api,
    private nav: NavController,
    private alertCtrl: AlertController,
    private storage: Storage
  ) { };
  close() {
    this.viewCtrl.dismiss();
  }
  add() {
    console.log('add app');
    this.api.head(this.appno).subscribe(
      data => {
        let info = { head: data.json(), appno: this.appno, apikey: this.apikey };
        this.storage.get('apps').then(apps => JSON.parse(apps)).then(apps => {
          if(!apps){
            apps = [];
          }
          apps.unshift(info);
          this.storage.set('apps', JSON.stringify(apps));
          this.viewCtrl.dismiss();
        });
      },
      err => {
        let alert = this.alertCtrl.create({
          title: 'Error',
          message: 'Please make sure your APPNO and APIKEY are correct.',
          buttons: [{ text: 'OK' }]
        });
        alert.present();
      },
      () => console.log('Done')
    )
  }
}