import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import {
  BsDatepickerViewMode,
  BsNavigationDirection,
  DaysCalendarViewModel
} from '../../models/index';

@Component({
  selector: 'bs-datepicker-navigation-view',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button class="previous"
            [disabled]="calendar.disableLeftArrow"
            [style.visibility]="calendar.hideLeftArrow ? 'hidden' : 'visible'"
            (click)="navTo(true)"><span><svg class=\"slide_left_arrow\" width=\"13px\" height=\"18px\" viewBox=\"0 0 13 24\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"><desc>Created with Sketch.</desc><defs></defs><g id=\"web_home-page-1\" stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\" transform=\"translate(-494.000000, -550.000000)\"><g id=\"Group-33\" transform=\"translate(242.000000, 199.000000)\" fill=\"#AAAAAA\" fill-rule=\"nonzero\"><g id=\"Group-42\" transform=\"translate(233.000000, 240.000000)\"><g id=\"Group-31\"><g id=\"Group-11\"><g id=\"Group-10\"><g id=\"Group-64\" transform=\"translate(19.000000, 111.000000)\"><path d=\"M18.1293206,6.23188406 C17.8072413,5.92270531 17.2838624,5.92270531 16.9617831,6.23188406 L6.69550503,16.1062802 L-3.59090301,6.23188406 C-3.91298232,5.92270531 -4.4363612,5.92270531 -4.75844052,6.23188406 C-5.08051983,6.5410628 -5.08051983,7.04347826 -4.75844052,7.352657 L6.09160632,17.7681159 C6.25264597,17.9227053 6.45394554,18 6.67537507,18 C6.87667464,18 7.09810417,17.9227053 7.25914383,17.7681159 L18.1091907,7.352657 C18.4513999,7.04347826 18.4513999,6.5410628 18.1293206,6.23188406 Z\" id=\"Shape\" transform=\"translate(6.684211, 12.000000) scale(-1, 1) rotate(-90.000000) translate(-6.684211, -12.000000)\"></path></g></g></g></g></g></g></g></svg></span>
    </button>

    <button class="current"
            *ngIf="calendar.monthTitle"
            (click)="view('month')"
    ><span>{{ calendar.monthTitle }}</span>
    </button>

    <button class="current" (click)="view('year')"
    ><span>{{ calendar.yearTitle }}</span></button>

    <button class="next"
            [disabled]="calendar.disableRightArrow"
            [style.visibility]="calendar.hideRightArrow ? 'hidden' : 'visible'"
            (click)="navTo(false)"><span><svg class=\"slide_left_arrow\" width=\"13px\" height=\"18px\" viewBox=\"0 0 13 24\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"><desc>Created with Sketch.</desc><defs></defs><g id=\"web_home-page-1\" stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\" transform=\"translate(-494.000000, -550.000000)\"><g id=\"Group-33\" transform=\"translate(242.000000, 199.000000)\" fill=\"#AAAAAA\" fill-rule=\"nonzero\"><g id=\"Group-42\" transform=\"translate(233.000000, 240.000000)\"><g id=\"Group-31\"><g id=\"Group-11\"><g id=\"Group-10\"><g id=\"Group-64\" transform=\"translate(19.000000, 111.000000)\"><path d=\"M18.1293206,6.23188406 C17.8072413,5.92270531 17.2838624,5.92270531 16.9617831,6.23188406 L6.69550503,16.1062802 L-3.59090301,6.23188406 C-3.91298232,5.92270531 -4.4363612,5.92270531 -4.75844052,6.23188406 C-5.08051983,6.5410628 -5.08051983,7.04347826 -4.75844052,7.352657 L6.09160632,17.7681159 C6.25264597,17.9227053 6.45394554,18 6.67537507,18 C6.87667464,18 7.09810417,17.9227053 7.25914383,17.7681159 L18.1091907,7.352657 C18.4513999,7.04347826 18.4513999,6.5410628 18.1293206,6.23188406 Z\" id=\"Shape\" transform=\"translate(6.684211, 12.000000) scale(-1, 1) rotate(90.000000) translate(-6.684211, -12.000000)\"></path></g></g></g></g></g></g></g></svg></span>
    </button>
  `
})
export class BsDatepickerNavigationViewComponent {
  @Input() calendar: DaysCalendarViewModel;

  @Output() onNavigate = new EventEmitter<BsNavigationDirection>();
  @Output() onViewMode = new EventEmitter<BsDatepickerViewMode>();

  navTo(down: boolean): void {
    this.onNavigate.emit(
      down ? BsNavigationDirection.DOWN : BsNavigationDirection.UP
    );
  }

  view(viewMode: BsDatepickerViewMode): void {
    this.onViewMode.emit(viewMode);
  }
}
