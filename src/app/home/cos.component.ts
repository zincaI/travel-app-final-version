import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'cos',
  standalone: true,
  imports: [],
  templateUrl: './cos.component.html',
  styleUrl: './home.component.scss',
})
export class CosComponent implements OnChanges {
  @Input() fruct: string = 'pizza';
  @Output() ceva = new EventEmitter<string>();

  constructor() {
    console.log('constructor CosComponent');
    this.inutil();
  }

  //for output
  private inutil() {
    console.log('fruct inutil', this.fruct);
    this.ceva.emit('ceva');
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('ngOnChanges');
    if (changes.hasOwnProperty('fruct') && changes['fruct'].currentValue) {
      this.inutil();
    }
  }
}
