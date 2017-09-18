import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { routes } from '../../app.routing';
import { StyleManager } from '../../theme/style-manager';
import { ThemeStorage } from '../../theme/theme-storage';

@Component({
  selector: 'add-nav',
  templateUrl: './add-nav.component.html'
})
export class AddNavComponent {
  public constructor() {}
}
