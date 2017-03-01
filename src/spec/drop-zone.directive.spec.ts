import { CommonModule } from '@angular/common';
import { Component, ContentChild, ViewChildren, Injectable, QueryList } from '@angular/core';
import { TestBed, async, ComponentFixture, ComponentFixtureAutoDetect, fakeAsync, inject, tick } from '@angular/core/testing';
import { DropZoneDirective, BsDragAndDropService, BsSortableModule, BsDraggableDirective } from '../sortable';
import { GrabbedElement, Point } from '../sortable/models';
import { ArrayHelper } from '../sortable/utils/array.helper';

const ITEMS = [ 'one', 'two', 'three', 'four', 'five' ];

@Component({
  selector: 'test',
  template: `
    <div id="directive" [acceptFromZones]="['testZone2']" bsDropZone="testZone" [(items)]="items" (activeItemIndexChange)="activeItemIndex = $event" [ngStyle]="style">
      <div bsDraggable *ngFor="let item of items">{{item}}</div>
    </div>
    <div id="directive2" bsDropZone="testZone2" [(items)]="items2" (activeItemIndexChange)="activeItemIndex2 = $event" [ngStyle]="style">
      <div bsDraggable *ngFor="let item of items2">{{item}}</div>
    </div>
  `
})
class TestComponent {
  @ViewChildren(DropZoneDirective) public dropZoneDirectives: QueryList<DropZoneDirective>;
  public activeItemIndex: number = -1;
  public activeItemIndex2: number = -1;
  public items: string[] = ITEMS;
  public items2: string[] = ['zero'];
  public style: any = {'min-height': '120px'};
}

describe('Directive: DropZoneDirective', () => {
  let rendererListenSpy: jasmine.Spy;
  let fixture: ComponentFixture<TestComponent>;
  let directive: DropZoneDirective;
  let directive2: DropZoneDirective;
  let service: BsDragAndDropService;
  let firstItemRect: ClientRect;
  let firstItemRectCenter: Point;
  let lastItemRect: ClientRect;
  let lastItemRectCenter: Point;
  let firstDraggableElement: BsDraggableDirective;

  beforeEach(fakeAsync(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [ TestComponent ],
      imports: [ BsSortableModule.forRoot(), CommonModule ],
      providers: [{ provide: ComponentFixtureAutoDetect, useValue: true }, BsDragAndDropService]
    }).createComponent(TestComponent);

    fixture.detectChanges();

    directive = fixture.componentInstance.dropZoneDirectives.first;
    directive2 = fixture.componentInstance.dropZoneDirectives.last;
  }));

  beforeEach(inject([BsDragAndDropService], (dragAndDropservice: BsDragAndDropService) => {
    service = dragAndDropservice;
    rendererListenSpy = spyOn((directive as any).renderer, 'listen');
    firstItemRect = (directive.draggableItems.first as BsDraggableDirective).host.nativeElement.getBoundingClientRect();
    firstItemRectCenter = getRectCenter(firstItemRect);
    lastItemRect = (directive.draggableItems.last as BsDraggableDirective).host.nativeElement.getBoundingClientRect();
    lastItemRectCenter = getRectCenter(lastItemRect);
    firstDraggableElement = directive.draggableItems.first as BsDraggableDirective;
  }));

  afterEach(() => {
    service.stopDragElement();
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
    expect(directive2).toBeTruthy();
  });

  it('should pass grabbed item to service on touch', fakeAsync(() => {
      // arrange
      const spy = spyOn(service, 'startDragElement');
      rendererListenSpy.and.returnValue(void 0);
      // act
      directive.onTouchstart(createTouchEvent(firstDraggableElement.host.nativeElement));
      // assert
      expect(spy).toHaveBeenCalled();
    }));

  it('should pass grabbed item to service on drag', fakeAsync(() => {
      // arrange
      const spy = spyOn(service, 'startDragElement');
      rendererListenSpy.and.returnValue(void 0);
      // act
      firstDraggableElement.onDragStart({ preventDefault: () => void 0 } as DragEvent);
      // assert
      expect(spy).toHaveBeenCalled();
    }));

  it('should remove item if it was captured by another container', fakeAsync(() => {
      // arrange
      const grabbedItem: GrabbedElement = { dropZoneContainerId: 'testZone', index: 0 } as GrabbedElement;
      service.startDragElement(grabbedItem);
      // act
      service.captureGrabbedElement('testZone2');
      fixture.detectChanges();
      // assert
      expect(directive.items).toEqual([ 'two', 'three', 'four', 'five' ]);
    }));

  it('should NOT remove item if it was captured by the same container', fakeAsync(() => {
      // arrange
      const grabbedItem: GrabbedElement = { dropZoneContainerId: 'testZone', index: 0 } as GrabbedElement;
      service.startDragElement(grabbedItem);
      // act
      service.captureGrabbedElement('testZone');
      fixture.detectChanges();
      // assert
      expect(directive.items).toEqual([ 'one', 'two', 'three', 'four', 'five' ]);
    }));

  it('should fire itemsChange when drag over item', () => {
      // arrange
      const spy = jasmine.createSpy('itemsChange listener');
      const grabbedItem: GrabbedElement = { dropZoneContainerId: 'testZone', index: 0, element: firstDraggableElement } as GrabbedElement;
      service.startDragElement(grabbedItem);
      directive.itemsChange.subscribe(spy);
      // act
      directive.dragoverPoint(lastItemRectCenter, grabbedItem);
      // assert
      expect(spy).toHaveBeenCalledWith([ 'two', 'three', 'four', 'five', 'one' ]);
    });

  it('should fix disabled items in their positions', () => {
      // arrange
      directive.draggableItems.toArray()[1].disabled = true;
      directive.fixDisabledItems = true;
      const spy = jasmine.createSpy('itemsChange listener');
      const grabbedItem: GrabbedElement = { dropZoneContainerId: 'testZone', index: 0, element: firstDraggableElement } as GrabbedElement;
      service.startDragElement(grabbedItem);
      directive.itemsChange.subscribe(spy);
      // act
      directive.dragoverPoint(lastItemRectCenter, grabbedItem);
      // assert
      expect(spy).toHaveBeenCalledWith([ 'three', 'two', 'four', 'five', 'one' ]);
    });

  it('should NOT fire itemsChange when drag over the same item', () => {
      // arrange
      const spy = jasmine.createSpy('itemsChange listener');
      const grabbedItem: GrabbedElement = { dropZoneContainerId: 'testZone', index: 0, element: firstDraggableElement } as GrabbedElement;
      service.startDragElement(grabbedItem);
      directive.itemsChange.subscribe(spy);
      // act
      directive.dragoverPoint(firstItemRectCenter, grabbedItem);
      // assert
      expect(spy).not.toHaveBeenCalled();
    });

  it('should cancel dragenter event', () => {
      // arrange
      const spy = jasmine.createSpy('preventDefault listener');
      const grabbedItem: GrabbedElement = { dropZoneContainerId: 'testZone', index: 0, element: firstDraggableElement } as GrabbedElement;
      service.startDragElement(grabbedItem);
      // act
      directive.onDragenter({ preventDefault: spy } as any);
      // assert
      expect(spy).toHaveBeenCalled();
    });

  it('should cancel dragover event', () => {
      // arrange
      const spy = jasmine.createSpy('preventDefault listener');
      const grabbedItem: GrabbedElement = { dropZoneContainerId: 'testZone', index: 0, element: firstDraggableElement } as GrabbedElement;
      service.startDragElement(grabbedItem);
      const dragoverPoint = spyOn(directive, 'dragoverPoint').and.returnValue(void 0);
      // act
      directive.onDragover({ preventDefault: spy } as any);
      // assert
      expect(spy).toHaveBeenCalled();
      expect(dragoverPoint).toHaveBeenCalled();
    }
  );

  it('should NOT cancel dragover event if element can\'t be dropped', () => {
      // arrange
      const spy = jasmine.createSpy('preventDefault listener');
      const grabbedItem: GrabbedElement = { dropZoneContainerId: 'anotherTestZone', index: 0, element: firstDraggableElement } as GrabbedElement;
      service.startDragElement(grabbedItem);
      const dragoverPoint = spyOn(directive, 'dragoverPoint').and.returnValue(void 0);
      // act
      directive.onDragover({ preventDefault: spy } as any);
      // assert
      expect(spy).not.toHaveBeenCalled();
      expect(dragoverPoint).not.toHaveBeenCalled();
    }
  );

  it('should notify service when finalize drag', () => {
      // arrange
      const stopDragElement = spyOn(service, 'stopDragElement').and.returnValue(void 0);
      // act
      directive.finalizeDrag();
      // assert
      expect(stopDragElement).toHaveBeenCalled();
    }
  );

  it('should finish drag and unsubscribe from listeners', () => {
      // arrange
      const listener = jasmine.createSpy('listener');
      const finalizeDrag = spyOn(directive, 'finalizeDrag').and.returnValue(void 0);
      const spy = jasmine.createSpy('preventDefault listener');
      service.startDragElement({ dropZoneContainerId: 'testZone', index: 0, element: firstDraggableElement } as GrabbedElement);
      // act
      directive.onDrop({ preventDefault: spy } as any, [ listener ]);
      // assert
      expect(listener).toHaveBeenCalled();
      expect(finalizeDrag).toHaveBeenCalled();
    });

  it('should NOT cancel drop event', () => {
      // arrange
      const listener = jasmine.createSpy('listener');
      const finalizeDrag = spyOn(directive, 'finalizeDrag').and.returnValue(void 0);
      const spy = jasmine.createSpy('preventDefault listener');
      service.startDragElement({ dropZoneContainerId: 'testZone', index: 0, element: firstDraggableElement } as GrabbedElement);
      // act
      directive.onDrop({ preventDefault: spy } as any, [ listener ]);
      // assert
      expect(spy).not.toHaveBeenCalled();
    });

  it('should NOT process finish drag if touch with different id ends', fakeAsync(() => {
      // arrange
      const listener = jasmine.createSpy('listener');
      const finalizeDrag = spyOn(directive, 'finalizeDrag').and.returnValue(void 0);
      directive.onTouchstart(createTouchEvent(firstDraggableElement.host.nativeElement));
      // act
      directive.onDrop({ changedTouches: [{ identifier: 1 }] } as any, [ listener ]);
      // assert
      expect(listener).not.toHaveBeenCalled();
      expect(finalizeDrag).not.toHaveBeenCalled();
    })
  );

  it('should process finish drag if touch with different id ends', fakeAsync(() => {
      // arrange
      const finalizeDrag = spyOn(directive, 'finalizeDrag').and.returnValue(void 0);
      directive.onTouchstart(createTouchEvent(firstDraggableElement.host.nativeElement));
      // act
      directive.onDrop({ changedTouches: [{ identifier: 'touch1' }] } as any, undefined);
      // assert
      expect(finalizeDrag).toHaveBeenCalled();
    })
  );

  it('should insert a new item if was empty', fakeAsync(() => {
      // arrange
      const spy = jasmine.createSpy('itemsChange listener');
      const element = directive2.draggableItems.first;
      const grabbedItem: GrabbedElement = { dropZoneContainerId: directive2.bsDropZone, index: 0, element } as GrabbedElement;
      service.startDragElement(grabbedItem);
      fixture.componentInstance.items = [];
      fixture.detectChanges();
      directive.itemsChange.subscribe(spy);
      // act
      directive.dragoverPoint(firstItemRectCenter, grabbedItem);
      // assert
      expect(spy).toHaveBeenCalledWith([ 'zero' ]);
    }));

  it('should insert a new item', fakeAsync(() => {
      // arrange
      const spy = jasmine.createSpy('itemsChange listener');
      const element = directive2.draggableItems.first;
      const grabbedItem: GrabbedElement = { dropZoneContainerId: directive2.bsDropZone, index: 0, element } as GrabbedElement;
      service.startDragElement(grabbedItem);
      directive.itemsChange.subscribe(spy);
      // act
      directive.dragoverPoint(firstItemRectCenter, grabbedItem);
      // assert
      expect(spy).toHaveBeenCalledWith([ 'zero', 'one', 'two', 'three', 'four', 'five' ]);
    }));
});

function createTouchEvent(target: HTMLElement): TouchEvent {
  const rect = target.getBoundingClientRect();
  let event = new Event('touchstart');
  target.dispatchEvent(event);
  const point = getRectCenter(rect);
  event = Object.assign({}, event, {
    changedTouches: [ { clientX: point.x, clientY: point.y, target: event.target, identifier: 'touch1' } ],
    preventDefault: () => void 0
  });
  return event as any;
}

function getRectCenter(rect: ClientRect): Point {
  return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
}
