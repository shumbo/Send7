import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { MyApp } from './app.component';
import { HomePage } from './../pages/home/home';
import { DetailsPage } from './../pages/details/details';
import { AddModal } from './../pages/home/addModal';
import { SendModal } from './../pages/details/sendModal';


@NgModule({
    declarations: [
        MyApp,
        HomePage,
        DetailsPage,
        SendModal,
        AddModal
    ],
    imports: [
        IonicModule.forRoot(MyApp)
    ],
    bootstrap: [IonicApp],
    providers:[
        Storage
    ],
    entryComponents: [
        MyApp,
        HomePage,
        DetailsPage,
        SendModal,
        AddModal
    ]
})
export class AppModule {};
