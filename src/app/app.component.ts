import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TripNoteService } from './trip-note.service';
import { TripNote } from './model/trip-note.model';
import { TripNotesFacade } from './state/trip-note.facade';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor() {}
}
