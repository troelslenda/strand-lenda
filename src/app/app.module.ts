import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { AngularFireModule } from 'angularfire2';
import * as firebase from 'firebase';
import { AngularFirestore, AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';

import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello/hello.component';
import { AppRoutingModule } from './app-routing.module';
import { RsvpComponent } from './rsvp/rsvp.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { AgendaComponent } from './agenda/agenda.component';
import { WindowService } from './window.service';
import {Ng2TelInputModule} from 'ng2-tel-input';



firebase.initializeApp(environment.firebase);


@NgModule({
  declarations: [
    AppComponent,
    HelloComponent,
    RsvpComponent,
    WishlistComponent,
    AgendaComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    Ng2TelInputModule

  ],
  providers: [WindowService, AngularFireAuth],
  bootstrap: [AppComponent]
})
export class AppModule { }
