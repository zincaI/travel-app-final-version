import { Component } from '@angular/core';
import { map, Observable } from 'rxjs';
import { TripNote } from '../model/trip-note.model';
import { TripNotesFacade } from '../state/trip-note.facade';
import { TripNoteComponent } from '../trip-note/trip-note.component';
import { TripNoteService } from '../trip-note.service';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-favorite-trips',
  standalone: true,
  imports: [TripNoteComponent,MatIcon,RouterLink],
  templateUrl: './favorite-trips.component.html',
  styleUrl: './favorite-trips.component.scss',
})
export class FavoriteTripsComponent {
  favoriteTripNotes$: Observable<TripNote[]>;
  favoriteTripNotes: TripNote[];
  tripNotes: TripNote[];

  constructor(
    private tripNoteService: TripNoteService,
    private tripNotesFacade: TripNotesFacade
  ) {
    this.tripNotesFacade.getNotes();

    this.tripNotesFacade.tripNotes$.subscribe((tripNotes) => {
      this.tripNotes = tripNotes;
      this.favoriteTripNotes = this.tripNotes.filter(
        (note) => note.rating >= 4
      );
    });
    this.favoriteTripNotes = this.tripNotes.filter((note) => note.rating >= 4);

  }
}


