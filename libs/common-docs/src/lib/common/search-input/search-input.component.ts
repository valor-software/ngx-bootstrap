import { ActivatedRoute, Route, Router, Routes } from "@angular/router";
// import { Component, Inject, Input } from "@angular/core";
import { DOCUMENT } from '@angular/common';
import { DOCS_TOKENS } from '../../tokens/docs-routes-token';
import connectClearRefinements, {
  ClearRefinementsWidgetDescription,
  ClearRefinementsConnectorParams
} from 'instantsearch.js/es/connectors/clear-refinements/connectClearRefinements';
import { Component, Inject, forwardRef, Optional, Input } from '@angular/core';
import { TypedBaseWidget, NgAisInstantSearch, NgAisIndex } from 'angular-instantsearch';

// import connectClearRefinements, {
//   ClearRefinementsWidgetDescription,
//   ClearRefinementsConnectorParams
// } from 'instantsearch.js/es/connectors/clear-refinements/connectClearRefinements';

// @Component({
//   selector: 'app-clear-refinements',
//   template: `
//     <button (click)="state?.refine()">ckick</button>
//   `
// })
// export class ClearRefinements extends TypedBaseWidget<ClearRefinementsWidgetDescription, ClearRefinementsConnectorParams> {
//   public override state?: ClearRefinementsWidgetDescription['renderState']; // Rendering options
//   @Input() set reset(value: boolean) {
//     console.log('there', this.state);
//     console.log('there createURL', this.state?.createURL());
//     console.log('there hasRefinements', this.state?.hasRefinements);
//     console.log('there canRefine', this.state?.canRefine);
//     this.state?.refine();
//   };
//   constructor(
//     @Inject(forwardRef(() => NgAisIndex))
//     @Optional()
//     public parentIndex: NgAisIndex,
//     @Inject(forwardRef(() => NgAisInstantSearch))
//     public instantSearchInstance: NgAisInstantSearch
//   ) {
//     super('ClearRefinements');
//   }
//   override ngOnInit() {
//     this.createWidget(connectClearRefinements, {});
//     super.ngOnInit();
//   }
// }

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'search-input',
  templateUrl: './search-input.component.html'
})
export class SearchInputComponent {
  reset = true;
  @Input() showInput = true;
  isShown = false;
  routes: Routes;
  search = { text: '' };

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    @Inject(DOCUMENT) private document: any,
    @Inject(DOCS_TOKENS) _routes: Routes,
  ) {
    this.routes = _routes.filter((v: Route) => v.path !== '**');
  }

  preventReloading(event: KeyboardEvent) {
    if (event.keyCode === 13 || event.key === 'Enter') {
      event.preventDefault();
    }
  }

  getRouteLink(path: string) {
    const result = this.routes.find(item => item.path === path);
    this.router.navigate([result ? `/${path}` : `/components/${path}`]);
    // return result ? `/${path}` : `/components/${path}`;
  }
}


