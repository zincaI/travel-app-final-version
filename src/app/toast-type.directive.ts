// toast-type.directive.ts
import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appToastType]',
  standalone: true,
})
export class ToastTypeDirective implements OnChanges {
  @Input() appToastType: string;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnChanges() {
    this.setColor();
  }

  private setColor() {
    let color: string;
    switch (this.appToastType) {
      case 'delete':
        color = 'red';
        break;
      case 'add':
        color = 'green';
        break;
      case 'edit':
        color = 'yellow';
        break;
      case 'count':
        color = 'pink';
        break;
      default:
        color = 'black';
        break;
    }
    this.renderer.setStyle(this.el.nativeElement, 'color', color);
  }
}
