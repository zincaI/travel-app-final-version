import { CanActivate, CanActivateFn, Router } from '@angular/router';
import { FavoriteTripsComponent } from './favorite-trips/favorite-trips.component';
import { TripNoteService } from './trip-note.service';
import { Injectable } from '@angular/core';
import { TripNotesFacade } from './state/trip-note.facade';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  favoriteTripNotes;
  constructor(
    private router: Router,
    private tripNotesFacade: TripNotesFacade
  ) {
    this.tripNotesFacade.favoriteTripNotes$.subscribe((tripNotes) => {
      this.favoriteTripNotes = tripNotes;
    });
  }
  // constructor(private router: Router) {}

  canActivate(): boolean {
    if (this.favoriteTripNotes.length >= 3) {
      return true;
    } else {
      this.tripNotesFacade.failFavoriteTripNotesRoute();
      this.router.navigate(['/']);
      return false;
    }
  }
}
