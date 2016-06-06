import {Component, Renderer, Inject, AfterViewInit} from '@angular/core';
import {RouterLink, Router} from '@angular/router-deprecated';
import {DOCUMENT} from '@angular/platform-browser';

// webpack html imports
let template = require('./top-menu.template.html');

@Component({
  selector: 'top-menu',
  template: template,
  directives: [RouterLink]
})
export class TopMenuComponent implements AfterViewInit {
  public isShown:boolean = false;

  private renderer:Renderer;
  private document:any;
  private router: Router;

  public constructor(renderer:Renderer, @Inject(DOCUMENT) document:any, router: Router) {
    this.renderer = renderer;
    this.document = document;
    this.router = router;
  }

  public ngAfterViewInit():any {
    this.router.subscribe(()=> {this.toggle(false);});
  }

  public toggle(isShown?:boolean):void {
    this.isShown = typeof isShown === 'undefined' ? !this.isShown : isShown;
    if (this.document && this.document.body) {
      this.renderer.setElementClass(this.document.body, 'isOpenMenu', this.isShown);
      if (this.isShown === false) {
        this.renderer.setElementProperty(this.document.body, 'scrollTop', 0);
      }
    }
  }
}
