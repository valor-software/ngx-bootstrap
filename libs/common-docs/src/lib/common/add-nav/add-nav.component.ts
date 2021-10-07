import {
  AfterViewInit,
  Component, ElementRef,
  HostListener,
  Inject,
  Input,
  OnChanges,
  QueryList, Renderer2,
  SimpleChanges,
  ViewChildren
} from "@angular/core";
import { DOCUMENT } from '@angular/common';

import { ContentSection } from '../../models/content-section.model';
import { ComponentExample } from '../../models/components-examples.model';
import { ComponentApi } from '../../models/components-api.model';

interface IComponentContent {
  name?: string;
  anchor?: string;
  outlet: any;
  description?: string;
  content: {anchor: string, title: string}[];
}

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'add-nav',
  templateUrl: './add-nav.component.html'
})
export class AddNavComponent implements OnChanges, AfterViewInit{
  @Input() componentContent?: ContentSection[];
  @ViewChildren('scrollElement')
  private scrollElementsList?: QueryList<ElementRef>;

  _componentContent: IComponentContent[] = [];
  @HostListener('window:scroll', ['$event'])
  onScrollEvent(event: Event) {
    if (this.scrollElementsList?.length) {
      this.scrollElementsList.map(item => {
        const min = item.nativeElement.getAttribute('data-min-scroll-value');
        const max = item.nativeElement.getAttribute('data-max-scroll-value');
        const position = window.pageYOffset;
        // console.log('current position', position);
        if (position >= min && position <= max) {
          this._renderer.addClass(item.nativeElement.parentElement, 'active');
          // console.log(item.nativeElement);
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
    ){ }

  ngOnChanges(changes: SimpleChanges) {
    if (changes?.componentContent) {
      this._componentContent = this.mapComponentContent(changes.componentContent.currentValue);
    }
  }

  mapComponentContent(component: ContentSection[]): IComponentContent[] {
    return component?.map(item => {
      const result = {
        name: item.name,
        anchor: item.anchor,
        outlet: item.outlet,
        description: item.description,
        content: Array.isArray(item.content)
          ? (item.content as {anchor: string, title: string}[])
            .map((cont) => ({anchor: cont.anchor, title: cont.title}))
          : []
      };

      return result;
    });
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
          const parentHeight = (<HTMLElement>target.parentElement).getBoundingClientRect().height || 0;
          const parentHeightscroll = target.parentElement?.scrollHeight;
          const parentHeightoffsetHeight = target.parentElement?.offsetHeight;
          const parentHeightclientHeight = target.parentElement?.clientHeight;
          // console.log('scroll', id, parentHeightscroll);
          // console.log('offsetHeight', id, parentHeightoffsetHeight);
          // console.log('clientHeight', id, parentHeightclientHeight);
          this._renderer.setAttribute(item.nativeElement, 'data-max-scroll-value', (targetPosY + parentHeight).toString());
          this._renderer.setAttribute(item.nativeElement, 'data-min-scroll-value', (targetPosY).toString());
        }
        return item;
      });
    });

  }
}
