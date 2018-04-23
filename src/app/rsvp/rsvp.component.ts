import { Component, OnInit } from '@angular/core';
import { WindowService } from '../window.service';
import * as firebase from 'firebase';
import {Ng2TelInputModule} from 'ng2-tel-input';


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

  constructor(private win: WindowService) {
   }

  ngOnInit() {
    this.awaiting = false;
    this.windowRef = this.win.windowRef
    this.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {  'size': 'invisible'})
    this.windowRef.recaptchaVerifier.render()
    this.countryCode = 45;
  }

  sendLoginCode() {


    const appVerifier = this.windowRef.recaptchaVerifier;
    const num = '+' + this.countryCode + this.phoneNumber;
    console.log('signin with num', num);
    firebase.auth().signInWithPhoneNumber(num, appVerifier)
      .then(result => {
        console.log('verifier?')
        this.windowRef.confirmationResult = result;
        this.awaiting = true;
      })
      .catch( error => console.log(error) );
  }
  onCountryChange(event) {

    this.countryCode = event.dialCode;
  }
  verifyLoginCode() {
    this.windowRef.confirmationResult
      .confirm(this.verificationCode)
      .then( result => {
        this.user = result.user;
      })
      .then( result => {
        const messaging = firebase.messaging();
        messaging.requestPermission()
          .then(function(result) {
            console.log('Notification permission granted.', result);
            // TODO(developer): Retrieve an Instance ID token for use with FCM.
            // ...
          })
          .catch(function(err) {
            console.log('Unable to get permission to notify.', err);
          });
      })
      .catch( error => console.log(error, "Incorrect code entered?"));
  }
}
