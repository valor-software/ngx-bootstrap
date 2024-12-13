import { Route, Routes } from '@angular/router';
import { Component, inject, Input } from '@angular/core';
import { DOCS_TOKENS } from '../../tokens/docs-routes-token';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'search-input',
  templateUrl: './search-input.component.html',
  standalone: false
})
export class SearchInputComponent {
  @Input() showInput = true;
  isShown = false;
  routes: Routes = inject(DOCS_TOKENS).filter((v: Route) => v.path !== '**');
  search = { text: '' };

  preventReloading(event: KeyboardEvent) {
    if (event.keyCode === 13 || event.key === 'Enter') {
      event.preventDefault();
    }
  }

  getRouteLink(path: string): string {
    const result = this.routes.find((item) => item.path === path);
    return result ? `/${path}` : `/components/${path}`;
  }
}
