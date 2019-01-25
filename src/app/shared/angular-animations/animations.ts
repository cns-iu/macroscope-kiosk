import { trigger, style, animate, transition } from '@angular/animations';

export const fadeInOut = trigger('fade-in-out', [
    transition(':enter', [
        style({ opacity: 0}),
        animate('600ms', style({ opacity: 1 }))
    ]),
    transition(':leave', [
        animate('600ms', style({ opacity: 0 }))
    ])
  ]);
