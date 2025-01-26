import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { TripNote } from '../model/trip-note.model';

export const TripNoteActions = createActionGroup({
  source: 'Trip notes',
  events: {
    'Get Trip Notes': emptyProps(),
    'Get Trip Notes Success': props<{ tripNotes: TripNote[] }>(),
    'Add trip note': props<{ tripNote: Partial<TripNote> }>(),
    'Add trip note success': emptyProps(),
    'Delete trip note': props<{ tripNoteId: string }>(),
    'Delete trip note success': emptyProps(),
    'Update trip note': props<{
      tripNote: Partial<TripNote>;
      tripNoteId: string;
    }>(),
    'Update trip note success': emptyProps(),
    'Update current trip note': props<{ tripNoteId: string }>(),
    'Update current trip note success': emptyProps(),
    'Filter Trip Notes By Rating': props<{
      minRating: number;
      maxRating: number;
    }>(),
    'Filter Trip Notes By Date': props<{ minDate: Date; maxDate: Date }>(),
    'Reset Trip Notes': emptyProps(),
    'Fail Favorite Trip Notes Route': emptyProps(),
  },
});
