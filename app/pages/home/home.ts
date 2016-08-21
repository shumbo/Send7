import {Component} from '@angular/core';
import {Page,NavController,ModalController,ViewController,AlertController} from 'ionic-angular';
import {DetailsPage} from '../details/details'; 
import {Api} from '../../providers/api/api';

@Component({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {
  public apps;
  constructor(private nav:NavController,private modalCtrl:ModalController) {
  }
  add(){
    console.log("Add Modal");
    let modal = this.modalCtrl.create(AddModal);
    modal.present();
    modal.onDidDismiss(
      () => {
        this.update();
        console.log("Modal closed");
      } 
    );
  }
  ionViewWillEnter() {
    this.update();
  }
  public update(){
    console.log("Update list");
    this.apps = JSON.parse(localStorage.getItem("apps")) || [];
  }
  openDetails(i){
    console.log("open "+i);
    this.nav.push(DetailsPage,{index:i});
  }
}
@Component({
  templateUrl: 'build/pages/home/addModal.html',
  providers:[Api]
})
class AddModal {
  public appno;
  public apikey;
  constructor(private viewCtrl:ViewController,public api:Api,private nav:NavController,private alertCtrl:AlertController){
  }
  close(){
    this.viewCtrl.dismiss();
  }
  add(){
    console.log("add app");
    this.api.head(this.appno).subscribe(
      data => {
        let info = {head:data.json(),appno:this.appno,apikey:this.apikey};
        let apps = JSON.parse(localStorage.getItem("apps")) || [];
        apps.unshift(info);
        localStorage.setItem("apps",JSON.stringify(apps));
        this.viewCtrl.dismiss();
      },
      err => {
        let alert = this.alertCtrl.create({
          title:"Error",
          message:"Please make sure your APPNO and APIKEY are correct.",
          buttons:[{text:"OK"}]
        });
        alert.present();
      },
      ()=>console.log("Done")
    )
  }
}
