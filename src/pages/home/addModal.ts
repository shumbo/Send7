import { ViewController, NavController, AlertController } from 'ionic-angular';
import { Component } from '@angular/core';
import { Api } from './../../providers/api/api';

@Component({
  templateUrl: 'addModal.html',
  providers: [Api]
})
export class AddModal {
  public appno;
  public apikey;
  constructor(private viewCtrl: ViewController, public api: Api, private nav: NavController, private alertCtrl: AlertController) {
  }
  close() {
    this.viewCtrl.dismiss();
  }
  add() {
    console.log("add app");
    this.api.head(this.appno).subscribe(
      data => {
        let info = { head: data.json(), appno: this.appno, apikey: this.apikey };
        let apps = JSON.parse(localStorage.getItem("apps")) || [];
        apps.unshift(info);
        localStorage.setItem("apps", JSON.stringify(apps));
        this.viewCtrl.dismiss();
      },
      err => {
        let alert = this.alertCtrl.create({
          title: "Error",
          message: "Please make sure your APPNO and APIKEY are correct.",
          buttons: [{ text: "OK" }]
        });
        alert.present();
      },
      () => console.log("Done")
    )
  }
}