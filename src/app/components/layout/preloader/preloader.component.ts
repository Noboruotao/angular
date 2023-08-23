import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'app-preloader',
  templateUrl: './preloader.component.html',
  styleUrls: ['./preloader.component.css'],
  animations: [
    trigger('fadeOut', [
      state('visible', style({ opacity: 1 })),
      state('hidden', style({ opacity: 0 })),
      transition('visible => hidden', animate('500ms ease-out')),
    ]),
  ],
})
export class PreloaderComponent implements OnInit {
  animationState = 'visible';

  ngOnInit(): void {
    setTimeout(() => {
      this.animationState = 'hidden';
    }, 1000);
  }
}
