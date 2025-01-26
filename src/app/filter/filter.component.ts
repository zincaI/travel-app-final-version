import { Component } from '@angular/core';
import { TripNoteComponent } from '../trip-note/trip-note.component';
import { TripNoteService } from '../trip-note.service';
import { TripNote } from '../model/trip-note.model';
import { FormsModule } from '@angular/forms';
import { TripNotesFacade } from '../state/trip-note.facade';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss',
})
export class FilterComponent {
  tripNotes: TripNote[];
  minRating;
  maxRating;
  minDate: Date;
  maxDate: Date;
  originalTripNotes: TripNote[];
  copiedArray = false;

  constructor(private tripNotesFacade: TripNotesFacade) {
    this.tripNotesFacade.tripNotes$.subscribe((tripNotes) => {
      this.tripNotes = tripNotes;
    });
    this.tripNotesFacade.originalTripNotes$.subscribe((originalTripNotes) => {
      this.originalTripNotes = originalTripNotes;
    });
  }

  onRatingFilter() {
    this.resetFilters();
    this.tripNotesFacade.filterTripNotesByRating(
      this.minRating,
      this.maxRating
    );
  }

  onDateFilter() {
    this.resetFilters();
    const minDate = new Date(this.minDate);
    const maxDate = new Date(this.maxDate);
    this.tripNotesFacade.filterTripNotesByDate(minDate, maxDate);
  }

  // onCopy() {
  //   this.originalTripNotes = this.tripNotes;
  //   this.copiedArray = true;
  // }

  onCleanAll() {
    this.minRating = undefined;
    this.maxRating = undefined;
    // this.onCopy();
    // this.tripNotesFacade.tripNotes$.next(this.originalTripNotes);
    // this.copiedArray = false;
    this.resetFilters();
  }

  resetFilters() {
    this.tripNotesFacade.resetTripNotes();
  }
}
