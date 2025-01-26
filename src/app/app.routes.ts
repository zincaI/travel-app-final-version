import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FavoriteTripsComponent } from './favorite-trips/favorite-trips.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'favorites',
    component: FavoriteTripsComponent,
    canActivate: [AuthGuard],
  },
];
