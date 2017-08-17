import { Component } from '@angular/core';

@Component({
  selector: 'on-drop-event-demo',
  templateUrl: './on-drop-event.component.html'
})
export class OnDropEventComponent {
  public dropEvents: Array<any> = [];

  public itemStringsLeft: any[] = [
    'Windstorm',
    'Bombasto',
    'Magneta',
    'Tornado'
  ];

  public itemStringsRight: any[] = [
    'Mr. O',
    'Tomato'
  ];

  onDropRight(event) {
    this.dropEvents.push("dropped item in right list (length: " + event.length + ")");
  }

  onDropLeft(event) {
    this.dropEvents.push("dropped item in left list (length: " + event.length + ")");
  }
}
