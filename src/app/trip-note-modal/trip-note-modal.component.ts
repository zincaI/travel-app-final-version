import { NgIf } from '@angular/common';
import { Component, Inject } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { TripNoteService } from '../trip-note.service';
import { TripNoteActions } from '../state/trip-note.actions';
import { TripNote } from '../model/trip-note.model';
import { Store } from '@ngrx/store';
import { TripNotesFacade } from '../state/trip-note.facade';

@Component({
  selector: 'app-trip-note-modal',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogActions,
    MatDialogContent,
    MatFormField,
    MatLabel,
    FormsModule,
    MatInput,
    ReactiveFormsModule,
    NgIf,
  ],
  templateUrl: './trip-note-modal.component.html',
  styleUrl: './trip-note-modal.component.scss',
})
export class TripNoteModalComponent {
  currentTripNote: TripNote;
  tripNoteForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    fromDate: new FormControl(null, [
      Validators.required,
      this.validDateValidator(),
      this.fromDateRangeValidator(),
    ]),
    toDate: new FormControl(null, [
      Validators.required,
      this.validDateValidator(),
      this.toDateRangeValidator(),
    ]),
    rating: new FormControl(0, [
      Validators.required,
      Validators.min(1),
      Validators.max(5),
    ]),
  });
  formUpdatedNote: Partial<TripNote>;

  constructor(
    private dialogRef: MatDialogRef<TripNoteModalComponent>,
    private tripNoteService: TripNoteService,
    @Inject(MAT_DIALOG_DATA) public data: { fromAdd: boolean; id: string },
    private tripNotesFacade: TripNotesFacade
  ) {
    if (!data.fromAdd) {
      console.log(
        'this.tripNotesFacade.currentTripNote$',
        this.tripNotesFacade.currentTripNote$
      );

      this.tripNotesFacade.currentTripNote$.subscribe((currentTripNote) => {
        this.currentTripNote = currentTripNote;

        this.tripNoteForm.setValue({
          title: this.currentTripNote.title,
          description: this.currentTripNote.description,
          fromDate: this.currentTripNote.fromDate,
          toDate: this.currentTripNote.toDate,
          rating: this.currentTripNote.rating,
        });
      });
      console.log('currentTripNote', this.currentTripNote);
      console.log('tripNoteForm', this.tripNoteForm);
    } else {
      this.tripNoteForm.setValue({
        title: '',
        description: '',
        fromDate: Date.now(),
        toDate: Date.now(),
        rating: 0,
      });


    }
    this.tripNoteForm.valueChanges.subscribe((values) => {
      this.formUpdatedNote = values;
    });
    console.log('formUpdatedNote', this.formUpdatedNote);
  }

  private validDateValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      const date = new Date(value);
      if (isNaN(date.getTime())) {
        return { invalidDate: { value } };
      }
      return null;
    };
  }

  private fromDateRangeValidator(): ValidatorFn {
    return (fromDateForm: AbstractControl): ValidationErrors | null => {
      if (!this.tripNoteForm) {
        return null;
      }

      const toDateForm = this.tripNoteForm.get('toDate');
      const toDate = new Date(toDateForm.value);
      const fromDate = new Date(fromDateForm.value);

      if (fromDate > toDate) {
        return { invalidDate: { fromDate } };
      }

      return null;
    };
  }

  private toDateRangeValidator(): ValidatorFn {
    return (toDateForm: AbstractControl): ValidationErrors | null => {
      if (!this.tripNoteForm) {
        return null;
      }

      const fromDateForm = this.tripNoteForm.get('fromDate');
      const fromDate = new Date(fromDateForm.value);
      const toDate = new Date(toDateForm.value);

      if (fromDate > toDate) {
        return { invalidDate: { toDate } };
      }

      return null;
    };
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  saveDialog() {
    if (this.tripNoteForm.valid) {
      this.tripNotesFacade.updateNote(this.formUpdatedNote,this.currentTripNote.id);
      this.closeDialog();
      this.tripNoteService.saveTripNotes(
        this.formUpdatedNote,
        this.currentTripNote.id
      );
      // this.tripNotesFacade.saveTripNotes(this.tripNoteForm.value);
    } else {
      alert('Please check the highlighted spaces');
    }
    console.log("this.formUpdatedNote",this.formUpdatedNote);

    console.log("this.currentTripNote.id",this.currentTripNote.id);
  }

  addDialog() {
    if (this.tripNoteForm.valid) {
      this.tripNotesFacade.addTripNote(this.formUpdatedNote);
      this.closeDialog();
    } else {
      alert('Please check the highlighted spaces');
    }
  }
}
