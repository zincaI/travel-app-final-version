import { Component, input } from '@angular/core';
import { TripNote } from '../model/trip-note.model';

@Component({
  selector: 'app-famous-trip',
  standalone: true,
  imports: [],
  templateUrl: './famous-trip.component.html',
  styleUrl: './famous-trip.component.scss'
})
export class FamousTripComponent {

    tripNote = input(undefined as TripNote);
    
}
