import { Component, signal } from '@angular/core';

import { CounterComponent } from "@shared/components/counter/counter.component";
import { HeaderComponent } from "@shared/components/header/header.component";
import { WaveAudioComponent } from "./../../../info/components/wave-audio/wave-audio.component";

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CounterComponent, WaveAudioComponent, HeaderComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export default class AboutComponent {
  duration = signal(1000);
  message = signal('Hola');

  changeDuration(event: Event){
    const input = event.target as HTMLInputElement;
    this.duration.set(input.valueAsNumber)
  }

  changeMessage(event: Event){
    const input = event.target as HTMLInputElement;
    this.message.set(input.value)
  }

}
