import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  wishes: Observable<any[]>;

  constructor(db: AngularFirestore) {
    this.wishes = db.collection('wishes').valueChanges();
  }


  ngOnInit() {
  }

}
