import { fakeAsync, TestBed, tick } from '@angular/core/testing';

import { TripNoteService } from './trip-note.service';
import { TripNote } from './model/trip-note.model';
import { firstValueFrom } from 'rxjs';
import { TripNoteComponent } from './trip-note/trip-note.component';

describe('TripNoteService', () => {
  let service: TripNoteService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      providers: [],
      imports: [],
    });
    service = TestBed.inject(TripNoteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // describe('getNotes', () => {
  //   it('should return trip notes', () => {
  //     // service.tripNotes = [{ id: 1, title: 'mere' } as TripNote];

  //     const result = service.getNotes();

  //     // expect(result).toEqual([{ id: 1, title: 'mere' } as TripNote]);
  //     expect(result).toEqual(service.tripNotes);
  //   });
  // });

  // describe('saveTripNotes', () => {
  //   it('should save a note', () => {
  //     const note = {
  //       title: 'Mine something',
  //       description: 'Horror show',
  //       fromDate: new Date('2020-03-01'),
  //       toDate: new Date('2024-03-05'),
  //       rating: '2',
  //       image: 'assets/mine.jpg',
  //     };

  //     service.setCurrentNote(2);
  //     service.saveTripNotes(note);

  //     expect(service.tripNotes[2].description).toEqual(note.description);
  //     expect(service.tripNotes[2].title).toEqual(note.title);
  //     expect(service.tripNotes[2].rating).toEqual(2);
  //     // expect(service.tripNotes[2].rating).toEqual(Number(note.rating));
  //     expect(service.tripNotes[2].fromDate).toEqual(note.fromDate);
  //     expect(service.tripNotes[2].toDate).toEqual(note.toDate);
  //   });

  //   it('should emit the edited array', (done) => {
  //     const note = {
  //       title: 'Mine something',
  //       description: 'Horror show',
  //       fromDate: new Date('2020-03-01'),
  //       toDate: new Date('2024-03-05'),
  //       rating: '2',
  //       image: 'assets/mine.jpg',
  //     };

  //     service.setCurrentNote(2);
  //     service.saveTripNotes(note);

  //     service.tripNotes$.subscribe((tripNotes) => {
  //       expect(tripNotes).toEqual(service.tripNotes);
  //       done();
  //     });
  //   });

  //   it('should set the action to edit type and then reset it', fakeAsync(async () => {
  //     const note = {
  //       title: 'Mine something',
  //       description: 'Horror show',
  //       fromDate: new Date('2020-03-01'),
  //       toDate: new Date('2024-03-05'),
  //       rating: '2',
  //       image: 'assets/mine.jpg',
  //     };

  //     service.setCurrentNote(2);
  //     service.saveTripNotes(note);

  //     let completedAction = await firstValueFrom(service.completedAction$);
  //     expect(completedAction.type).toEqual('edit');
  //     expect(completedAction.isPressed).toEqual(true);

  //     tick(2000);

  //     completedAction = await firstValueFrom(service.completedAction$);
  //     expect(completedAction.type).toEqual('');
  //     expect(completedAction.isPressed).toEqual(false);
  //   }));
  // });

  // describe('addTripNotes', () => {
  //   it('should add a note', fakeAsync(async () => {
  //     const note = {
  //       title: 'Mine something',
  //       description: 'Horror show',
  //       fromDate: new Date('2020-03-01'),
  //       toDate: new Date('2024-03-05'),
  //       rating: '2',
  //       image: 'assets/mine.jpg',
  //     };
  //     let id = 3;

  //     service.addTripNotes(note, id);

  //     expect(service.tripNotes[3]).toEqual({
  //       id: 3,
  //       title: 'Mine something',
  //       description: 'Horror show',
  //       fromDate: new Date('2020-03-01'),
  //       toDate: new Date('2024-03-05'),
  //       rating: 2,
  //       image: 'assets/mine.jpg',
  //     });

  //     let completedAction = await firstValueFrom(service.completedAction$);
  //     expect(completedAction.type).toEqual('add');
  //     expect(completedAction.isPressed).toEqual(true);

  //     tick(2000);

  //     completedAction = await firstValueFrom(service.completedAction$);
  //     expect(completedAction.type).toEqual('');
  //     expect(completedAction.isPressed).toEqual(false);

  //     expect(service.tripNotes[3].description).toEqual(note.description);
  //     expect(service.tripNotes[3].title).toEqual(note.title);
  //     expect(service.tripNotes[3].rating).toEqual(2);
  //     expect(service.tripNotes[3].fromDate).toEqual(note.fromDate);
  //     expect(service.tripNotes[3].toDate).toEqual(note.toDate);
  //   }));
  // });

  // describe('setCurrentNote', () => {
  //   it("should set the current note's values", () => {
  //     service.setCurrentNote(2);
  //     expect(service.currentNote).toEqual(service.tripNotes[2]);
  //   });
  // });

  // describe('deleteNote', () => {
  //   it('should delete a note', (done) => {
  //     service.setCurrentNote(2);
  //     service.deleteNote();

  //     expect(service.tripNotes).toEqual([
  //       {
  //         id: 0,
  //         title: 'Tropical something',
  //         description: "It's nice",
  //         fromDate: new Date('2022-03-01'),
  //         toDate: new Date('2022-03-05'),
  //         rating: 4,
  //         image: 'assets/tropical.jpg',
  //       },
  //       {
  //         id: 1,
  //         title: 'Seaside something',
  //         description: "It's ok",
  //         fromDate: new Date('2023-12-01'),
  //         toDate: new Date('2024-06-05'),
  //         rating: 3,
  //         image: 'assets/seaside.jpg',
  //       },
  //     ]);

  //     service.tripNotes$.subscribe((tripNotes) => {
  //       expect(tripNotes).toEqual([
  //         {
  //           id: 0,
  //           title: 'Tropical something',
  //           description: "It's nice",
  //           fromDate: new Date('2022-03-01'),
  //           toDate: new Date('2022-03-05'),
  //           rating: 4,
  //           image: 'assets/tropical.jpg',
  //         },
  //         {
  //           id: 1,
  //           title: 'Seaside something',
  //           description: "It's ok",
  //           fromDate: new Date('2023-12-01'),
  //           toDate: new Date('2024-06-05'),
  //           rating: 3,
  //           image: 'assets/seaside.jpg',
  //         },
  //       ]);
  //       done();
  //     });
  //   });

  //   it('should set the action to edit type and then reset it', fakeAsync(async () => {
  //     //TODO: add for filter = ask about for filter should look like on delete - CRY FOR HELP

  //     service.deleteNote();

  //     let completedAction = await firstValueFrom(service.completedAction$);
  //     expect(completedAction.type).toEqual('delete');
  //     expect(completedAction.isPressed).toEqual(true);

  //     tick(2000);

  //     completedAction = await firstValueFrom(service.completedAction$);
  //     expect(completedAction.type).toEqual('');
  //     expect(completedAction.isPressed).toEqual(false);
  //   }));
  // });
});
