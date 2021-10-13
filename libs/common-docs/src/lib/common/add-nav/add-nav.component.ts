import {
  AfterViewInit,
  Component, ElementRef,
  HostListener,
  Inject,
  Input,
  OnChanges,
  QueryList, Renderer2,
  SimpleChanges,
  ViewChildren, ViewChild
} from "@angular/core";
import { DOCUMENT } from '@angular/common';

import { ContentSection } from '../../models/content-section.model';
import { Router } from "@angular/router";

interface IComponentContent {
  parentRouteTitle: string;
  name?: string;
  content: {anchor: string, title: string}[];
}

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'add-nav',
  templateUrl: './add-nav.component.html'
})
export class AddNavComponent implements OnChanges, AfterViewInit {
  @Input() componentContent?: ContentSection;

  @ViewChildren('scrollElement')
  private scrollElementsList?: QueryList<ElementRef>;

  @ViewChild('container')
  private addNavContainer?: ElementRef;

  _componentContent?: IComponentContent;

  @HostListener('window:scroll')
  onScrollEvent() {
    if (this.addNavContainer) {
      if (!this.addNavContainer.nativeElement.getAttribute('data-position')) {
        setTimeout(() => {
          this._renderer.setAttribute(this.addNavContainer?.nativeElement, 'data-position', (this.addNavContainer?.nativeElement.offsetTop - 64).toString());
        }, 100);
      }

      this.initMenu();
    }

    if (this.scrollElementsList?.length) {
      this.scrollElementsList.map(item => {
        const min = item.nativeElement.getAttribute('data-min-scroll-value');
        const max = item.nativeElement.getAttribute('data-max-scroll-value');
        const position = window.pageYOffset;
        if (position >= min && position <= max) {
          this._renderer.addClass(item.nativeElement.parentElement, 'active');
        } else {
          this._renderer.removeClass(item.nativeElement.parentElement, 'active');
        }
      });
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private _renderer: Renderer2,
    private router: Router
  ){}

  initMenu() {
    const attributeValue = this.addNavContainer?.nativeElement.getAttribute('data-position');
    const elementOffsetTop = this.addNavContainer?.nativeElement.offsetTop - 64; // 64 - height of the header
    if (!attributeValue && elementOffsetTop <= window.pageYOffset) {
      this._renderer.addClass(this.addNavContainer?.nativeElement, 'fixed');
    } else {
      this._renderer.removeClass(this.addNavContainer?.nativeElement, 'fixed');
    }

    if (attributeValue && attributeValue <= window.pageYOffset) {
      this._renderer.addClass(this.addNavContainer?.nativeElement, 'fixed');
    } else {
      this._renderer.removeClass(this.addNavContainer?.nativeElement, 'fixed');
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes?.componentContent) {
      this._componentContent = this.mapComponentContent(changes.componentContent.currentValue);
    }
  }

  mapComponentContent(component: ContentSection): IComponentContent {
    const parentRoute: string = this.router.parseUrl(this.router.url).root.children.primary.segments[0].path;
    return {
        name: component.tabName,
        parentRouteTitle: parentRoute,
        content: Array.isArray(component.content)
          ? (component.content as {anchor: string, title: string}[])
            .map((cont) => ({anchor: cont.anchor, title: cont.title}))
          : []
      };
  }

  goToSection(event: Event): void {
    const item: HTMLElement = event.target as HTMLElement;
    if (item.dataset.anchor) {
      const anchor: string = item.dataset.anchor;
      const target: HTMLElement | null = this.document.getElementById(anchor);
      const header: HTMLElement | null = this.document.getElementById('header');

      if (target && header) {
        const targetPosY: number = target.offsetTop - header.offsetHeight - 6;
        window.scrollTo(0, targetPosY);
      }
    }
  }

  ngAfterViewInit() {
    setTimeout(() => {
      const header: number = this.document.querySelector('header')?.offsetHeight || 0;
      this.scrollElementsList?.map(item => {
        const id = item.nativeElement.getAttribute('data-anchor');
        const target: HTMLElement | null = this.document.getElementById(id);
        if (target) {
          const targetPosY: number = target.offsetTop - header - 6;
          const parentHeight = (<HTMLElement>target.parentElement).getBoundingClientRect().height - 6 || 0;
          this._renderer.setAttribute(item.nativeElement, 'data-max-scroll-value', (targetPosY + parentHeight).toString());
          this._renderer.setAttribute(item.nativeElement, 'data-min-scroll-value', (targetPosY).toString());
        }
        return item;
      });
    },100);

  }
}
