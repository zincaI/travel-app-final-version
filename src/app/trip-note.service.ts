import { Injectable, signal } from '@angular/core';
import { TripNote } from './model/trip-note.model';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { FavoriteTripsComponent } from './favorite-trips/favorite-trips.component';

@Injectable({
  providedIn: 'root',
})
export class TripNoteService {
  private readonly BASE_URL = 'https://localhost:44339/Trip';
  currentNote: TripNote;
  completedAction$ = new BehaviorSubject<{ type: string; isPressed: boolean }>({
    type: '',
    isPressed: false,
  });

  constructor(private http: HttpClient) {
  }
  getNotes(): Observable<TripNote[]> {
    return this.http.get<TripNote[]>(`${this.BASE_URL}`);
  }
  
  saveTripNotes(formUpdatedNote,id:string) {
    const tripNote = {
      id: id,
      title: formUpdatedNote.title,
      description: formUpdatedNote.description,
      fromDate: new Date(formUpdatedNote.fromDate),
      toDate: new Date(formUpdatedNote.toDate),
      rating: formUpdatedNote.rating,
      image: 'string',
    };

    this.showToaster('edit');
    return this.http.put(`${this.BASE_URL}`, tripNote);
  }

  deleteNote(id: string) {
    this.showToaster('delete');
    return this.http.delete(`${this.BASE_URL}/${id}`);
  }

  addTripNote(formUpdatedNote) {
    const tripNote = {
      id: 'string',
      title: formUpdatedNote.title,
      description: formUpdatedNote.description,
      fromDate: new Date(formUpdatedNote.fromDate),
      toDate: new Date(formUpdatedNote.toDate),
      rating: formUpdatedNote.rating,
      image: 'string;',
    };
    this.showToaster('add');
    return this.http.post(`${this.BASE_URL}`, tripNote);
  }
  showToaster(type: string) {
    this.completedAction$.next({ type: type, isPressed: true });
    setTimeout(() => {
      this.completedAction$.next({ type: '', isPressed: false });
    }, 6000);
  }

  // getFavoriteTripNotes(): TripNote[] {
  //   return this.favoriteNotes.favoriteTripNotes;
  // }
}
