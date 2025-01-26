import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs';
import { TripNoteActions } from './trip-note.actions';
import { TripNoteService } from '../trip-note.service';
import { TripNote } from '../model/trip-note.model';
import { TripNotesFacade } from './trip-note.facade';

@Injectable()
export class TripNotesEffects {
  private actions$ = inject(Actions);
  constructor(
    // private actions$: Actions<TripNoteActions>;
    // private actions$: Actions<any>,
    private tripNoteService: TripNoteService
  ) {}

  getTripNotes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TripNoteActions.getTripNotes),
      switchMap(() => {
        return this.tripNoteService.getNotes().pipe(
          map((tripNotes) => {
            return TripNoteActions.getTripNotesSuccess({ tripNotes });
          })
        );
      })
    )
  );

  deleteTripNotes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TripNoteActions.deleteTripNote),
      switchMap((action) => {
        return this.tripNoteService.deleteNote(action.tripNoteId).pipe(
          map(() => {
            // return TripNoteActions.deleteTripNoteSuccess({ tripNotes });
            return TripNoteActions.deleteTripNoteSuccess();
          })
        );
      })
    )
  );

  //TODO: maybe return from server the trip notes updated and not make another get request
  deleteTripNotesSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TripNoteActions.deleteTripNoteSuccess),
      switchMap(() => {
        return this.tripNoteService.getNotes().pipe(
          map((tripNotes) => {
            return TripNoteActions.getTripNotesSuccess({ tripNotes });
          })
        );
      })
    )
  );

  addTripNotes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TripNoteActions.addTripNote),
      switchMap((action) => {
        return this.tripNoteService.addTripNote(action.tripNote).pipe(
          map(() => {
            return TripNoteActions.addTripNoteSuccess();
          })
        );
      })
    )
  );

  addTripNotesSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TripNoteActions.addTripNoteSuccess),
      switchMap(() => {
        return this.tripNoteService.getNotes().pipe(
          map((tripNotes) => {
            return TripNoteActions.getTripNotesSuccess({ tripNotes });
          })
        );
      })
    )
  );

  updateTripNotes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TripNoteActions.updateTripNote),
      switchMap((action) => {
        return this.tripNoteService.saveTripNotes(action.tripNote,action.tripNoteId).pipe(
          map(() => {
            return TripNoteActions.updateTripNoteSuccess();
          })
        );
      })
    )
  );

  updateTripNotesSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TripNoteActions.updateTripNoteSuccess),
      switchMap(() => {
        return this.tripNoteService.getNotes().pipe(
          map((tripNotes) => {
            return TripNoteActions.getTripNotesSuccess({ tripNotes });
          })
        );
      })
    )
  );

  updateCurrentTripNotes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TripNoteActions.updateCurrentTripNote),
      switchMap((action) => {
        return this.updateCurrentTripNotes$.get(action.tripNoteId).pipe(
          map(() => {
            return TripNoteActions.updateCurrentTripNoteSuccess();
          })
        );
      })
    )
  );

  updateCurrentTripNoteSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TripNoteActions.updateCurrentTripNoteSuccess),
      switchMap(() => {
        return this.tripNoteService.getNotes().pipe(
          map((tripNotes) => {
            return TripNoteActions.getTripNotesSuccess({ tripNotes });
          })
        );
      })
    )
  );

}
