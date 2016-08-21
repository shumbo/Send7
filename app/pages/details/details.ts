import {Component} from '@angular/core';
import {Page, NavController,PopoverController,ActionSheetController,ViewController, ModalController,AlertController,NavParams} from 'ionic-angular';
import {Api} from '../../providers/api/api';

/*
  Generated class for the DetailsPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/details/details.html',
  providers: [Api]
})
export class DetailsPage {
  private app = {
    head: {
      icon:""
    },
    apikey: "",
    appno: ""
  };
  private index;
  constructor(private nav: NavController, private api: Api, private navParams: NavParams,private modalCtrl:ModalController,private actionSheetCtrl:ActionSheetController) {
    this.index = navParams.get('index');
    var index = this.index;
    var apps = JSON.parse(localStorage.getItem("apps"));
    api.head(apps[index].appno).subscribe(
      data => {
        apps[index].head = data.json();
      },
      err => {
        console.log(err);
      },
      () => {
        localStorage.setItem("apps", JSON.stringify(apps));
        this.app = apps[index];
      }
    )
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
            let apps = JSON.parse(localStorage.getItem("apps"));
            apps.splice(this.index, 1);
            localStorage.setItem("apps", JSON.stringify(apps));
            setTimeout(()=>{
              this.goBack();
            },600);
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

@Component({
  templateUrl:'build/pages/details/sendModal.html',
  providers:[Api]
})
class SendModal{
  public title;
  public body;
  public url;
  public icon;
  public appno;
  public apikey;
  constructor(private viewCtrl:ViewController,private api:Api,private nav:NavController,private alertCtrl:AlertController){
  }
  close(){
    this.viewCtrl.dismiss();
  }
  send(){
    console.log("Send notification");
    let payload = {
      title:this.title,
      body:this.body,
      url:this.url,
      icon:this.icon,
      apikey:this.apikey
    }
    console.log(payload);
    this.api.send(this.appno,JSON.stringify(payload)).subscribe(
      data => {
        console.log("Push was sent");
        let alert = this.alertCtrl.create({
          title: "Done",
          message: "Push Notification was delivered to the subscribers.",
          buttons:[{
            text: "OK",
            handler : ()=>{
              this.viewCtrl.dismiss();
            }
          }]
        })
        alert.present();
      },
      err => {
        let message = err._body.error || "Failed";
        let alert = this.alertCtrl.create({
          title: "Error",
          message: message,
          buttons:[{
            text: "OK"
          }]
        })
        alert.present();
      },
      () => console.log("Done")
    )
  }
}