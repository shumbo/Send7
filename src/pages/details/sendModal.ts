import { Component } from '@angular/core';
import { ViewController, NavController, AlertController } from 'ionic-angular';
import { Api } from './../../providers/api/api';

@Component({
  templateUrl: 'sendModal.html',
  providers: [Api]
})
export class SendModal {
  public title;
  public body;
  public url;
  public icon;
  public appno;
  public apikey;
  constructor(private viewCtrl: ViewController, private api: Api, private nav: NavController, private alertCtrl: AlertController) {
  }
  close() {
    this.viewCtrl.dismiss();
  }
  send() {
    console.log('Send notification');
    let payload = {
      title: this.title,
      body: this.body,
      url: this.url,
      icon: this.icon,
      apikey: this.apikey
    }
    console.log(payload);
    this.api.send(this.appno, JSON.stringify(payload)).subscribe(
      data => {
        console.log('Push was sent');
        let alert = this.alertCtrl.create({
          title: 'Done',
          message: 'Push Notification was delivered to the subscribers.',
          buttons: [{
            text: 'OK',
            handler: () => {
              this.viewCtrl.dismiss();
            }
          }]
        })
        alert.present();
      },
      err => {
        let message = err._body.error || 'Failed';
        let alert = this.alertCtrl.create({
          title: 'Error',
          message: message,
          buttons: [{
            text: 'OK'
          }]
        })
        alert.present();
      },
      () => console.log('Done')
    )
  }
}