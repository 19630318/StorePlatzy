import { Component, Input, SimpleChanges, signal } from '@angular/core';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css'
})
export class CounterComponent {
  @Input({required: true}) duration: number = 0;
  @Input({required: true}) message: string = '';
  counter = signal(0);
  counterRef: number | undefined;

constructor(){
  //NO ASYNC
  // BEFORE RENDER
  console.log('constructor');
  console.log('-'.repeat(10));
}

ngOnChanges(changes: SimpleChanges){
  // BEFORE AND DURING RENDER
  console.log('ngOnChanges');
  console.log('-'.repeat(10));
  console.log(changes);
  const duration = changes['duration'];
  if (duration && duration.currentValue !== duration.previousValue){
    this.doSomething();
  }
}

ngOnInit(){
  //AFTER RENDER ONLY ONE LIKE ASYNC, THEN, SUBS
   console.log('ngOnInit') 
   console.log('duration => ', this.duration);
   console.log('messaje => ', this.message);
   if (typeof window !== 'undefined') {
      this.counterRef = window.setInterval(()=>{
          this.counter.update(statePre => statePre++);
      }, 1000);
    }
   console.log('-'.repeat(10));
}

ngAfterViewInit(){
  //AFTER RENDER AND THE CHILDS HAVE ALREADY BEEN PAINT
  console.log('ngAfterViewInit');
  console.log('-'.repeat(10));
}

ngOnDestroy(){
  console.log('ngOnDestroy');
  console.log('-'.repeat(10));
  if (typeof window !== 'undefined') {
    window.clearInterval(this.counterRef);
  }
}

doSomething(){
  console.log('doSomething')
}

}
