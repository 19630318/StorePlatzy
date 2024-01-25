import { Directive, ElementRef, inject } from '@angular/core';

@Directive({
  selector: '[hihglight]',
  standalone: true
})
export class HihglightDirective {

  element = inject(ElementRef);

  constructor() { }

  ngOnInit(){
    this.element.nativeElement.style.backgroundColor = "red";
  }

}
