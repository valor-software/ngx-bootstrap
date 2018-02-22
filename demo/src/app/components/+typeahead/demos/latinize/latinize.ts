import { Component } from '@angular/core';

@Component({
  selector: 'demo-typeahead-latinize',
  templateUrl: './latinize.html'
})
export class DemoTypeaheadLatinizeComponent {
  selected: string;
  frenchWords: string[] = [
    'popularisé',
    'français',
    'intéressé',
    'générateur',
    'répandue',
    'répétition',
    'súper'
    ];
}
