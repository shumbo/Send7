import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { DetailsPage } from '../details/details';
import { AddModal } from './addModal';

@Component({
  templateUrl: 'home.html'
})
export class HomePage {
  public apps;
  constructor(private nav: NavController, private modalCtrl: ModalController) {
  }
  add() {
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
  public update() {
    console.log("Update list");
    this.apps = JSON.parse(localStorage.getItem("apps")) || [];
  }
  openDetails(i) {
    console.log("open " + i);
    this.nav.push(DetailsPage, { index: i });
  }
}
