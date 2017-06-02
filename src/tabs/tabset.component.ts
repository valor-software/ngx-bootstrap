import { Component, HostBinding, Input, Output, OnDestroy, EventEmitter, ViewEncapsulation  } from '@angular/core';

import { TabDirective, TabsetConfig, TabReorderEvent } from './';

// todo: add active event to tab
// todo: fix? mixing static and dynamic tabs position tabs in order of creation
@Component({
  selector: 'tabset',
  template: `
    <ul class="nav" [ngClass]="classMap" (click)="$event.preventDefault()"
              (dragover)="onTabDragOver($event)"
              (drop)="onTabDrop($event)"
              (dragleave)="onTabDragLeave($event)">
        <li *ngFor="let tabz of tabs" [ngClass]="['nav-item', tabz.customClass || '']"
          [class.active]="tabz.active" [class.disabled]="tabz.disabled"
          (dragstart)="onTabDragStart($event)"
          (dragover)="onTabDragOver($event)"
          (dragleave)="onTabDragLeave($event)"
          (drop)="onTabDrop($event)"
          (dragend)="onTabDragEnd($event)">
          <a href="javascript:void(0);" class="nav-link"
            [class.active]="tabz.active" [class.disabled]="tabz.disabled"
            (click)="tabz.active = true">
            <span [ngTransclude]="tabz.headingRef">{{tabz.heading}}</span>
            <span *ngIf="tabz.removable">
              <span (click)="$event.preventDefault(); removeTab(tabz);" class="glyphicon glyphicon-remove-circle"></span>
            </span>
          </a>
        </li>
    </ul>
    <div class="tab-content">
      <ng-content></ng-content>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  styles: [`
    .nav-tabs .nav-drop-target-before  {
       border-left: 3px solid #777 !important;
       margin-left: -3px;
       border-top-left-radius: 0;       
    }
    .nav-tabs .nav-drop-target-after  {
       border-right: 3px solid #777 !important;
       margin-right: -3px;
       border-top-right-radius: 0;
    }
    .nav-tabs-trag-image {
       border: 1px solid #888;
       border-radius: 3px;
       padding: 10px;
       position: absolute; 
    }`
  ]
})
export class TabsetComponent implements OnDestroy {
  /** if true tabs will be placed vertically */
  @Input()
  public get vertical():boolean {
    return this._vertical;
  }
  public set vertical(value:boolean) {
    this._vertical = value;
    this.setClassMap();
  }

  /** if true tabs fill the container and have a consistent width */
  @Input()
  public get justified():boolean {
    return this._justified;
  }
  public set justified(value:boolean) {
    this._justified = value;
    this.setClassMap();
  }

  /** navigation context class: 'tabs' or 'pills' */
  @Input()
  public get type():string {
    return this._type;
  }
  public set type(value:string) {
    this._type = value;
    this.setClassMap();
  }

  @HostBinding('class.tab-container') public clazz:boolean = true;

  public tabs:TabDirective[] = [];
  public classMap:any = {};

  protected isDestroyed:boolean;
  protected _vertical:boolean;
  protected _justified:boolean;
  protected _type:string;

 /* reorder tabs with drag & drop */
  @Input()
  reorderable = false;

  @Output()
  onReorder = new EventEmitter<TabReorderEvent>();

  private draggedTab: any;
  private dragImage: any; 
   
  
  public constructor(config: TabsetConfig) {
    Object.assign(this, config);
  }

  public ngOnDestroy():void {
    this.isDestroyed = true;
  }

  public addTab(tab:TabDirective):void {
    this.tabs.push(tab);
    tab.active = this.tabs.length === 1 && tab.active !== false;
  }

  public removeTab(tab:TabDirective):void {
    let index = this.tabs.indexOf(tab);
    if (index === -1 || this.isDestroyed) {
      return;
    }
    // Select a new tab if the tab to be removed is selected and not destroyed
    if (tab.active && this.hasAvailableTabs(index)) {
      let newActiveIndex = this.getClosestTabIndex(index);
      this.tabs[newActiveIndex].active = true;
    }

    tab.removed.emit(tab);
    this.tabs.splice(index, 1);
  }

  protected getClosestTabIndex(index:number):number {
    let tabsLength = this.tabs.length;
    if (!tabsLength) {
      return -1;
    }

    for (let step = 1; step <= tabsLength; step += 1) {
      let prevIndex = index - step;
      let nextIndex = index + step;
      if (this.tabs[prevIndex] && !this.tabs[prevIndex].disabled) {
        return prevIndex;
      }
      if (this.tabs[nextIndex] && !this.tabs[nextIndex].disabled) {
        return nextIndex;
      }
    }
    return -1;
  }

  protected hasAvailableTabs(index:number):boolean {
    let tabsLength = this.tabs.length;
    if (!tabsLength) {
      return false;
    }

    for (let i = 0; i < tabsLength; i += 1) {
      if (!this.tabs[i].disabled && i !== index) {
        return true;
      }
    }
    return false;
  }

  protected setClassMap():void {
    this.classMap = {
      'nav-stacked': this.vertical,
      'nav-justified': this.justified,
      [`nav-${this.type}`]: true
    };
  }
  
  onTabDragStart(event:any):void {
    if (this.reorderable) {

      /* remember the tab-element, which the user wants to drag to another position */
      this.draggedTab = this.findTab(event.target);
      
      /* create a clone of the element. This used for the drag-image. */
      const targetClone:any = event.target.cloneNode(true);

      targetClone.className = 'nav-tabs-drag-image';
      document.body.appendChild(targetClone);
      this.dragImage = targetClone;
      event.dataTransfer.setDragImage(targetClone, 0, 0);
    }
  }
   
  onTabDragOver(event: DragEvent): void {
    
    var tab = this.findTab(event.target);
    
    if (tab !== this.draggedTab) {
      if (this.reorderable) {
        event.preventDefault();
        
        if (this.isTabsContainer(event.target)) {
          // the tab is moved to the end (will be the last tab, if dropped)
          const lastTab = this.findLastTab(event.target);
          this.addClass(lastTab, 'nav-drop-target-after');
        } else {
          this.addClass(tab, 'nav-drop-target-before');
        }
      }
    } else {
      event.dataTransfer.dropEffect = 'none';
    }
  }
   
  onTabDragLeave(event: DragEvent): void {
    this.removeDropTargetStyles(event.target);
  }

  onTabDrop(event: DragEvent): void {
    this.removeDropTargetStyles(event.target);
    this.removeDragImage();

    const oldIndex = this.getTabIndex(this.draggedTab);
    let newIndex: number;

    if (this.isTabsContainer(event.target)) {
       newIndex = this.tabs.length;
    } else {
       newIndex = this.getTabIndex(event.target);
    }
      
    const reorderEvent = new TabReorderEvent();
    reorderEvent.fromIndex = oldIndex;
    reorderEvent.toIndex = newIndex;    

    const movedTab = this.tabs.splice(reorderEvent.fromIndex, 1)[0];
    if (newIndex < oldIndex) {
      this.tabs.splice(reorderEvent.toIndex, 0, movedTab);
    } else if (newIndex > oldIndex) {
      this.tabs.splice(reorderEvent.toIndex - 1, 0, movedTab);
    }
    this.onReorder.emit(reorderEvent);
  }

  onTabDragEnd(event:DragEvent): void  {
    this.removeDragImage();
    this.removeDropTargetStyles(event.target);
  }

  addClass(element: any, className: string): void {
    if (element.classList) {
      element.classList.add(className);
    } else {
      element.className += ' ' + className;
    }
  }

  removeClass(element: any, className: string): void {
    if (element.classList) {
      element.classList.remove(className);
    } else {
      element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    }
  }

  private findTab(element: any): any {
    return this.findParentTag(element, 'LI');
  }
  
  private findParentTag(element: any, tagName: string): any {
    if (!element) {
      return null;
    }
    
    while (element.tagName !== tagName) {
      element = element.parentElement;
      if (!element) {
        return null;
      }
    }
    return element;
  }

  private removeDragImage() : void {
    if (this.dragImage) {
      this.dragImage.parentElement.removeChild(this.dragImage);
      this.dragImage = null;
    }
  }

  private getTabIndex(dropTarget: any): number {
    const liElement = this.findParentTag(dropTarget, 'LI');
    const ulElement = liElement.parentElement;

    const children: Array<any> = ulElement.children;
    for (let i = 0; i < children.length; i++) {
      if (children[i] === liElement) {
        return i;
      }
    }
    return -1;
  }
    
  private findLastTab(element:any):any {
    var ul = this.findParentTag(element, 'UL');
    var children = ul.children;
    return children[children.length-1];
  }
  
  private isTabsContainer(element:any): boolean {
    return element.tagName==='UL';
  }

  private removeDropTargetStyles(element:any) : void {      
    const tab = this.findTab(element);
    if (tab) {     
      this.removeClass(tab, 'nav-drop-target-before');
    }
    this.removeClass(this.findLastTab(element), 'nav-drop-target-after');
  }
}

