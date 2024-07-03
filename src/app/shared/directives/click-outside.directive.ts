import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appClickOutside]',
  standalone: true
})
export class ClickOutsideDirective {
  constructor(private elementRef: ElementRef) {}

  /**
   * Output when selector value is changed
   */
  @Output() clickedOutside = new EventEmitter();

  @HostListener('document:click', ['$event.target'])
  public onClick(target: any) {
    const clikedInside = this.elementRef.nativeElement.contains(target);
    if (!clikedInside) this.clickedOutside.emit(target);
  }
}
