import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HelloComponent } from './hello/hello.component';
import { AgendaComponent } from './agenda/agenda.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { RsvpComponent } from './rsvp/rsvp.component';

const routes: Routes = [
  { path: '', component: HelloComponent },
  { path: 'agenda', component: AgendaComponent },
  { path: 'wishlist', component: WishlistComponent },
  { path: 'rsvp', component: RsvpComponent }

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
