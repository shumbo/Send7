import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { DetailsPage } from '../details/details';
import { AddModal } from './addModal';

@Component({
  templateUrl: 'home.html'
})
export class HomePage {
  public apps;
  constructor(
    private nav: NavController,
    private modalCtrl: ModalController,
    private storage:Storage) {
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
    this.storage.get('apps').then(apps => JSON.parse(apps)).then(apps => {
      this.apps = apps;
    });
  }
  openDetails(i) {
    console.log("open " + i);
    this.nav.push(DetailsPage, { index: i });
  }
}
