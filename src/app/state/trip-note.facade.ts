import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  // getCopyTripNotes,
  getCurrentTripNote,
  getFavoriteTripNotes,
  getHasTripNotes,
  getOriginalTripNotes,
  getTripNotes,
  getTripNotesLoaded,
} from './trip-note.selectors';
import { TripNoteActions } from './trip-note.actions';
import { TripNote } from '../model/trip-note.model';
import { Actions, ofType } from '@ngrx/effects';

@Injectable({
  providedIn: 'root',
})
export class TripNotesFacade {
  tripNotes$;
  currentTripNote$;
  loaded$;
  hasTripNotes$;
  originalTripNotes$;
  favoriteTripNotes$;
  invalidFavoriteTripNotesRoute$;

  constructor(private store: Store, private actions$: Actions) {
    this.tripNotes$ = this.store.select(getTripNotes);
    this.currentTripNote$ = this.store.select(getCurrentTripNote);
    this.loaded$ = this.store.select(getTripNotesLoaded);
    this.hasTripNotes$ = this.store.select(getHasTripNotes);
    this.originalTripNotes$ = this.store.select(getOriginalTripNotes);
    this.favoriteTripNotes$ = this.store.select(getFavoriteTripNotes);
    this.invalidFavoriteTripNotesRoute$ = this.actions$.pipe(
      ofType(TripNoteActions.failFavoriteTripNotesRoute)
    );
  }

  getNotes() {
    this.store.dispatch(TripNoteActions.getTripNotes());
  }

  deleteNote(tripNoteId: string) {
    this.store.dispatch(TripNoteActions.deleteTripNote({ tripNoteId }));
  }

  updateNote(tripNote: Partial<TripNote>, tripNoteId: string) {
    this.store.dispatch(
      TripNoteActions.updateTripNote({ tripNote, tripNoteId })
    );
  }

  addTripNote(tripNote: Partial<TripNote>) {
    this.store.dispatch(TripNoteActions.addTripNote({ tripNote }));
  }

  updateCurrentTripNote(tripNoteId: string) {
    this.store.dispatch(TripNoteActions.updateCurrentTripNote({ tripNoteId }));
  }

  filterTripNotesByRating(minRating: number, maxRating: number) {
    this.store.dispatch(
      TripNoteActions.filterTripNotesByRating({ minRating, maxRating })
    );
  }

  filterTripNotesByDate(minDate: Date, maxDate: Date) {
    this.store.dispatch(
      TripNoteActions.filterTripNotesByDate({ minDate, maxDate })
    );
  }

  resetTripNotes() {
    this.store.dispatch(TripNoteActions.resetTripNotes());
  }

  failFavoriteTripNotesRoute() {
    this.store.dispatch(TripNoteActions.failFavoriteTripNotesRoute());
  }
}
