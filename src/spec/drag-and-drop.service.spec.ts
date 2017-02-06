/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DragAndDropService } from '../sortable';
import { GrabbedElement } from '../sortable/models';

describe('Service: DragAndDropService', () => {
  let service: DragAndDropService;
  let grabbedElement: GrabbedElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DragAndDropService]
    });
  });

  beforeEach(inject([DragAndDropService], (dragAndDropservice: DragAndDropService) => {
    service = dragAndDropservice;
    grabbedElement = { dropZoneContainerId: 'id1', index: 1, dropZoneGroup: 'group', element: undefined };
    grabbedElement.element = { host: { nativeElement: document.createElement('div') } } as any;
  }));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should throw an error if try to register two containers with same names', () => {
    // arrange
    service.registerContainer({ id: 'id1' } as any);

    // act
    // assert
    expect(() => service.registerContainer({ id: 'id1' } as any)).toThrow();
  });

  it('should NOT throw an error if update grabbed element', () => {
    // arrange
    service.startDragElement(grabbedElement);
    // act
    // assert
    expect(() => service.updateGrabbedElement({} as any)).not.toThrow();
  });

  it('should be possible to start drag with mouse', () => {
    // arrange
    // act
    service.startDragElement(grabbedElement);
    // assert
    expect(service.getGrabbedElement()).toBe(grabbedElement);
  });

  it('should be possible to start drag with touch', () => {
    // arrange
    // act
    service.startDragElement(grabbedElement, { clientX: 10, clientY: 10, identifier: 123 } as Touch);
    // assert
    expect(service.getGrabbedElement()).toBe(grabbedElement);
  });

  it('should remove ghost element after drag end', () => {
    // arrange
    service.startDragElement(grabbedElement, { clientX: 10, clientY: 10, identifier: 123 } as Touch);
    const ghost = (service as any).grabbedElementGhost;
    const spy = spyOn(ghost, 'remove').and.returnValue(void 0);
    // act
    service.stopDragElement();
    // assert
    expect(spy).toHaveBeenCalled();
  });

  it('should NOT cancel touchmove if there is another touch', () => {
    // arrange
    service.startDragElement(grabbedElement, { clientX: 10, clientY: 10, identifier: 123 } as Touch);
    const newTouch = { clientX: 100, clientY: 100, identifier: 1 } as Touch;
    const spy = jasmine.createSpy('event.preventDefault');
    // act
    service.onTouchmove({ preventDefault: spy, changedTouches: [ newTouch ] } as any);
    // assert
    expect(spy).not.toHaveBeenCalled();
  });

  it('should cancel touchmove on touchmove', () => {
    // arrange
    const touch = { clientX: 100, clientY: 100, identifier: 123 } as Touch;
    service.startDragElement(grabbedElement, touch);
    const spy = jasmine.createSpy('event.preventDefault');
    // act
    service.onTouchmove({ preventDefault: spy, changedTouches: [ touch ] } as any);
    // assert
    expect(spy).toHaveBeenCalled();
  });

  it('should create a ghost element with special class', () => {
    // arrange
    const touch = { clientX: 100, clientY: 100, identifier: 123 } as Touch;
    service.startDragElement(grabbedElement, touch, 'ghost-element');
    const spy = jasmine.createSpy('event.preventDefault');
    // act
    const element = document.querySelector('.ghost-element');
    // assert
    expect(element).toBeTruthy();
  });

  it('should return true if touch ids are same', () => {
    // arrange
    const touch = { clientX: 100, clientY: 100, identifier: 123 } as Touch;
    const nextTouch = { clientX: 10, clientY: 10, identifier: 123 } as Touch;
    service.startDragElement(grabbedElement, touch, 'ghost-element');
    // act
    const result = service.containsCurrentTouch([ nextTouch ] as any);
    // assert
    expect(result).toBe(true);
  });

  it('should return false if touch ids are different', () => {
    // arrange
    const touch = { clientX: 100, clientY: 100, identifier: 123 } as Touch;
    const nextTouch = { clientX: 10, clientY: 10, identifier: 1 } as Touch;
    service.startDragElement(grabbedElement, touch, 'ghost-element');
    // act
    const result = service.containsCurrentTouch([ nextTouch ] as any);
    // assert
    expect(result).toBe(false);
  });

  it('should fire dragend', () => {
    // arrange
    const spy = jasmine.createSpy('subscription');
    service.dragend.subscribe(() => spy());
    // act
    service.stopDragElement();
    // assert
    expect(spy).toHaveBeenCalled();
  });

  it('should NOT close touch event if there is no item is being dragged', () => {
    // arrange
    const spy = jasmine.createSpy('event.preventDefault');
    // act
    service.onTouchmove({ preventDefault: spy } as any);
    // assert
    expect(spy).not.toHaveBeenCalled();
  });
});
