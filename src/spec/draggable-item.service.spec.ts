import { Component } from '@angular/core';
import { fakeAsync, inject, TestBed } from '@angular/core/testing';
import { DraggableItem, DraggableItemService, SortableItem } from '../sortable/index';

@Component({
  template: `<h1>Test</h1>`
})
class TestComponent {}

describe('Service: DraggableItem', () => {
  let transfer: DraggableItemService;
  let draggableItem: DraggableItem;

  beforeEach(
    fakeAsync(() => {
      TestBed.configureTestingModule({
        declarations: [TestComponent],
        providers: [DraggableItemService]
      }).createComponent(TestComponent);
    })
  );

  beforeEach(
    inject([DraggableItemService], (service: DraggableItemService) => {
      draggableItem = getDraggableItem(getItemToDrag(), undefined, 1);
      transfer = service;
      transfer.dragStart(draggableItem);
    })
  );

  it('should return draggable item', () => {
    // arrange
    // act
    const item = transfer.getItem();

    // assert
    expect(item).toBe(draggableItem);
  });

  it('should fire onCapture if item was captured by another zone', () => {
    // arrange
    const spy = spyOn<any>(transfer.onCaptureItem(), 'next');

    // act
    transfer.captureItem(2, 0);

    // assert
    expect(spy).toHaveBeenCalledWith(draggableItem);
  });

  it('should NOT fire onCapture if item was captured by the same zone', () => {
    // arrange
    const spy = spyOn<any>(transfer.onCaptureItem(), 'next');

    // act
    transfer.captureItem(1, 0);

    // assert
    expect(spy).not.toHaveBeenCalled();
  });

  function getItemToDrag(): SortableItem {
    return { id: 0, value: 'item text', initData: 'item text' };
  }

  function getDraggableItem(
    sortableItem: SortableItem,
    dragEvent: DragEvent,
    zone: number
  ): DraggableItem {
    return {
      event: dragEvent,
      item: sortableItem,
      i: 0,
      initialIndex: 0,
      lastZoneIndex: zone,
      overZoneIndex: zone
    };
  }
});
