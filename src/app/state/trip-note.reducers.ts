import { createReducer, on } from '@ngrx/store';
import { TripNoteActions } from './trip-note.actions';
import { TripNote } from '../model/trip-note.model';
// import { getCopyTripNotes } from './trip-note.selectors';

export const TRIP_NOTES_REDUCER_KEY = 'tripNotes';

export interface TripNotesState {
  tripNotes: TripNote[];
  currentTripNote: TripNote;
  loaded: boolean;
  // copyTripNotes: TripNote[];
  originalTripNotes: TripNote[];
}

export const initialState: TripNotesState = {
  tripNotes: [],
  currentTripNote: undefined,
  loaded: false,
  // copyTripNotes: [],
  originalTripNotes: [],
};

export const tripNotesReducer = createReducer(
  initialState,
  on(TripNoteActions.getTripNotesSuccess, (state, action) => {
    return {
      ...state,
      tripNotes: action.tripNotes,
      originalTripNotes: action.tripNotes,
      loaded: true,
    };
  }),
  on(TripNoteActions.updateCurrentTripNote, (state, action) => {
    const currentTripNote = state.tripNotes.find(
      (tripNote) => tripNote.id === action.tripNoteId
    );
    return { ...state, currentTripNote: currentTripNote };
  }),
  on(TripNoteActions.filterTripNotesByRating, (state, action) => {
    const filteredTripNotes = state.tripNotes.filter(
      (tripNote) =>
        tripNote.rating <= action.maxRating &&
        tripNote.rating >= action.minRating
    );
    return { ...state, tripNotes: filteredTripNotes };
  }),
  on(TripNoteActions.filterTripNotesByDate, (state, action) => {
    const filteredTripNotes = state.originalTripNotes.filter((tripNote) => {
      const fromDate = new Date(tripNote.fromDate);
      return (
        fromDate.getTime() >= action.minDate.getTime() &&
        fromDate.getTime() <= action.maxDate.getTime()
      );
    });
    return { ...state, tripNotes: filteredTripNotes };
  }),
  on(TripNoteActions.resetTripNotes, (state) => {
    return { ...state, tripNotes: state.originalTripNotes };
  }),

);
