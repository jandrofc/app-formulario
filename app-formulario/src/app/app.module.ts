import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { initializeApp } from 'firebase/app';
import {provideFirebaseApp} from '@angular/fire/app';
import {provideAuth,getAuth} from '@angular/fire/auth';
import {provideFirestore,getFirestore} from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';


@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)), //inicializa firebase con la configuracion de environment.ts
    provideAuth(() => getAuth()),//  crea una instancia del servivico de autenticacion
    provideFirestore(() => getFirestore())],// instancias del servicio de firestore
  bootstrap: [AppComponent],

})
export class AppModule {}
