import { Component, ChangeDetectionStrategy } from "@angular/core";

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'themes',
  templateUrl: './themes.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false
})

export class ThemesComponent {}
