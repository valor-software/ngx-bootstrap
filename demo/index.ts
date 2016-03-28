import {Component, enableProdMode, ViewContainerRef} from '@angular/core';
import {Component, provide, enableProdMode} from 'angular2/core';
import {RouterOutlet, RouteConfig, ROUTER_PROVIDERS, APP_BASE_HREF} from 'angular2/router';
import {Ng2BootstrapConfig, Ng2BootstrapTheme} from '../ng2-bootstrap';
import {MainMenuComponent} from './components/main-menu/main-menu.component';
import {TopMenuComponent} from './components/top-menu/top-menu.component';
import {ButtonsSectionComponent} from './components/buttons-section';
import {CarouselSectionComponent} from './components/carousel-section';
import {CollapseSectionComponent} from './components/collapse-section';
import {DatepickerSectionComponent} from './components/datepicker-section';
import {DropdownSectionComponent} from './components/dropdown-section';
import {ModalSectionComponent} from './components/modal-section';
import {PaginationSectionComponent} from './components/pagination-section';
import {ProgressbarSectionComponent} from './components/progressbar-section';
import {RatingSectionComponent} from './components/rating-section';
import {TabsSectionComponent} from './components/tabs-section';
import {TimepickerSectionComponent} from './components/timepicker-section';
import {TooltipSectionComponent} from './components/tooltip-section';
import {TypeaheadSectionComponent} from './components/typeahead-section';
import {DemoHeaderComponent} from './components/demo-header';

import {config} from './config';

// todo: enable prod mod only for prod build
// if (false) {
enableProdMode();
// }

let w:any = window;

if (w && w.__theme === 'bs4') {
  Ng2BootstrapConfig.theme = Ng2BootstrapTheme.BS4;
}

let tmp = require('./demo.template.html');

@Component({
  selector: 'app',
  template: tmp,
  directives: [RouterOutlet, TopMenuComponent, MainMenuComponent]

@RouteConfig(config.routes)

    <modal-section></modal-section>
    TypeaheadSectionComponent
export class DemoComponent {
  public isBs3:boolean = Ng2BootstrapConfig.theme === Ng2BootstrapTheme.BS3;
  private viewContainerRef:ViewContainerRef;

  public constructor(viewContainerRef:ViewContainerRef) {
    // You need this small hack in order to catch application root view container ref
    this.viewContainerRef = viewContainerRef;
  }
}

bootstrap(Demo, [ROUTER_PROVIDERS, provide(APP_BASE_HREF, {useValue: '/'})]);

