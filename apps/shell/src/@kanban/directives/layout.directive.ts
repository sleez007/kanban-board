import { DOCUMENT } from '@angular/common';
import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  Inject,
} from '@angular/core';

@Directive({
  selector: '[kanbanboardLayout]',
})
export class LayoutDirective {
  constructor(
    private readonly el: ElementRef,
    @Inject(DOCUMENT) private document: Document
  ) {}

  @HostBinding('class.full') isFull = false;

  @HostListener('click', ['$event']) onClick() {
    this.isFull = !this.isFull;
    this.document.body.classList.toggle('full');
  }
}
