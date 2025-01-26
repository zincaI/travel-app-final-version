import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TRIP_NOTES_REDUCER_KEY, TripNotesState } from './trip-note.reducers';

export const getTripNotesState = createFeatureSelector<TripNotesState>(
  TRIP_NOTES_REDUCER_KEY
);

export const getTripNotes = createSelector(
  getTripNotesState,
  (state) => state.tripNotes
);

export const getFavoriteTripNotes = createSelector(getTripNotes, (tripNotes) =>
  tripNotes.filter((note) => note.rating >= 4)
);

export const getCurrentTripNote = createSelector(
  getTripNotesState,
  (state) => state.currentTripNote
);

export const getTripNotesLoaded = createSelector(
  getTripNotesState,
  (state) => state.loaded
);

export const getHasTripNotes = createSelector(
  getTripNotesState,
  (state) => state.tripNotes.length > 0
);

export const getOriginalTripNotes = createSelector(
  getTripNotesState,
  (state) => state.originalTripNotes
);