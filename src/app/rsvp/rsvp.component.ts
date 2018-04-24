import { Component, OnInit } from '@angular/core';
import { WindowService } from '../window.service';
import * as firebase from 'firebase';
import { Ng2TelInputModule } from 'ng2-tel-input';
import * as $ from 'jquery';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable} from 'rxjs/Observable';



@Component({
  selector: 'app-rsvp',
  templateUrl: './rsvp.component.html',
  styleUrls: ['./rsvp.component.css']
})
export class RsvpComponent implements OnInit {

  windowRef: any;
  phoneNumber: number;
  verificationCode: string;
  user: any;
  awaiting: boolean;
  countryCode: number;
  options: object;
  loggedin = false;
  uid: string;
  signedoff: boolean;
  attend: boolean;
  adults: number;
  kids: number;



  constructor(private win: WindowService, afAuth: AngularFireAuth, private afs: AngularFirestore) {
    afAuth.authState.subscribe(auth => {
      if (auth && auth.uid) {
        this.uid = auth.uid;
        this.loggedin = true;

        const docRef = this.afs.doc(`users/${auth.uid}`).valueChanges() as Observable<any>;
        docRef.subscribe(doc => {

          if (doc === null) {
            return
          }

          if (doc.kids) {
            this.kids = doc.kids;
          }
          else {
            this.kids = null;
          }
          if (doc.adults) {
            this.adults = doc.adults;
          }
          else {
            this.adults = null;
          }
          if (doc.signoff) {
            this.signedoff = true;
          }
          else {
            this.signedoff = false;
          }
          if (doc.attend) {
            this.attend = true;
          }
          else {
            this.attend = false;
          }
        })

      }
      else {
        this.loggedin = false;
      }
    });
  }

  ngOnInit() {
    this.signedoff = false;
    this.options = {
      initialCountry: "dk",
    };
    this.awaiting = false;
    this.windowRef = this.win.windowRef
    this.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', { 'size': 'invisible' })
    this.windowRef.recaptchaVerifier.render()
    this.countryCode = 45;
  }

  sendLoginCode() {


    const appVerifier = this.windowRef.recaptchaVerifier;
    const num = '+' + this.countryCode + this.phoneNumber;
    console.log('signin with num', num);
    this.awaiting = true;
    firebase.auth().signInWithPhoneNumber(num, appVerifier)
      .then(result => {
        console.log('verifier?')
        this.windowRef.confirmationResult = result;

      })
      .catch(error => console.log(error));
  }
  yes() {
    this.afs.doc<any>(`users/${this.uid}`).set({
      attend: true
    });
  }
  signOff() {
    this.afs.doc<any>(`users/${this.uid}`).set({
      signoff: true
    });
  }

  saveAttendees() {
    this.afs.doc<any>(`users/${this.uid}`).update({
      kids: this.kids,
      adults: this.adults
    });
  }
  onCountryChange(event) {

    this.countryCode = event.dialCode;
  }
  verifyLoginCode() {
    this.windowRef.confirmationResult
      .confirm(this.verificationCode)
      .then(result => {
        this.user = result.user;
      })
      .then(result => {
        const messaging = firebase.messaging();
        messaging.requestPermission()
          .then(function (result) {
            console.log('Notification permission granted.', result);
            // TODO(developer): Retrieve an Instance ID token for use with FCM.
            // ...
          })
          .catch(function (err) {
            console.log('Unable to get permission to notify.', err);
          });
      })
      .catch(error => console.log(error, "Incorrect code entered?"));
  }
}
