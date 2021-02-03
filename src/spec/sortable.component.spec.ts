// tslint:disable:max-file-line-count
import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, ComponentFixtureAutoDetect, inject, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import {
  DraggableItem,
  DraggableItemService,
  SortableComponent,
  SortableItem,
  SortableModule
} from 'ngx-bootstrap/sortable';

const HEROES: string[] = ['Windstorm', 'Bombasto', 'Magneta', 'Tornado'];
/* tslint:disable-next-line: no-any */
const HEROES_OBJ: any[] = [
  { id: 1, name: 'Windstorm' },
  { id: 2, name: 'Bombasto' },
  { id: 3, name: 'Magneta' }
];

@Component({
  template: `
    <bs-sortable id="sort1" [(ngModel)]="heroes" [placeholderItem]="'empty'"
                 [itemStyle]="{ 'background-color': 'white', margin: '10px' }"
                 [itemActiveStyle]="{ 'background-color': 'lightgray' }"></bs-sortable>
    <bs-sortable id="sort2" [(ngModel)]="heroesObj" [fieldName]="'name'" [placeholderItem]="'empty'"></bs-sortable>
  `
})
class TestSortableComponent {
  selectedState: string;
  heroes: string[] = [...HEROES];
  /* tslint:disable-next-line: no-any*/
  heroesObj: any[] = [...HEROES_OBJ];
}

xdescribe('Component: Sortable', () => {
  let fixture: ComponentFixture<TestSortableComponent>;
  let sort1: SortableComponent;
  let sort2: SortableComponent;

  beforeEach(
    () => {
      fixture = TestBed.configureTestingModule({
        declarations: [TestSortableComponent],
        imports: [SortableModule.forRoot(), FormsModule],
        providers: [{ provide: ComponentFixtureAutoDetect, useValue: true }]
      }).createComponent(TestSortableComponent);

      fixture.detectChanges();

      const sortableComponents = fixture.debugElement
        .queryAll(By.directive(SortableComponent))
        .map(
          (de: DebugElement) =>
            de.injector.get<SortableComponent>(SortableComponent)
        );
      [sort1, sort2] = sortableComponents;
    }
  );

  it('should be defined on the test component', () => {
    expect(sort1).not.toBeNull('sortable component with strings');
    expect(sort2).not.toBeNull('sortable component with objects');
  });

  it('different zones should have different ids', () => {
    /* tslint:disable-next-line: no-any*/
    expect((sort1 as any).currentZoneIndex).not.toBe(
      /* tslint:disable-next-line: no-any*/
      (sort2 as any).currentZoneIndex
    );
  });

  describe('onChange', () => {
    it('should render list of strings', () => {
        // arrange
        // act
        const renderedItems = getItemsByContainerId();
        // assert
        expect(renderedItems).toEqual(HEROES);
      }
    );

    it('should render list of complex models', () => {
      // arrange
      // act
      const renderedItems = getItemsByContainerId('sort2');
      // assert
      /* tslint:disable-next-line: no-any*/
      expect(renderedItems).toEqual(HEROES_OBJ.map((h: any) => h.name));
    });
  });

  it('should apply active item style over item style', () => {
    // arrange
    const activeItemStyle = Object.assign(
      {},
      sort1.itemStyle,
      sort1.itemActiveStyle
    );
    // act
    /* tslint:disable-next-line:no-inferred-empty-object-type */
    const style = sort1.getItemStyle(true);
    // assert
    expect(style).toEqual(activeItemStyle);
  });

  it('should return normal item style', () => {
    // arrange
    const normalItemStyle = Object.assign({}, sort1.itemStyle);
    // act
    /* tslint:disable-next-line:no-inferred-empty-object-type */
    const style = sort1.getItemStyle(false);
    // assert
    expect(style).toEqual(normalItemStyle);
  });

  describe('process drag & drop', () => {
    let transfer: DraggableItemService;
    let item: SortableItem;
    let event: DragEvent;
    let draggableItem: DraggableItem;
    let spyOnChanged: jasmine.Spy;
    let spyGetItem: jasmine.Spy;
    let spyCaptureItem: jasmine.Spy;
    let sort1ZoneNumber: number;
    let spyPreventDefault: jasmine.Spy;
    let spyOnDrop: jasmine.Spy;

    beforeEach(
      inject([DraggableItemService], (service: DraggableItemService) => {
        transfer = service;
        item = getItemToDrag();
        /* tslint:disable-next-line: no-object-literal-type-assertion */
        event = {
          preventDefault: Function.prototype,
          dataTransfer: { setData: Function.prototype }
        } as DragEvent;
        /* tslint:disable-next-line: no-any*/
        sort1ZoneNumber = (sort1 as any).currentZoneIndex;
        draggableItem = getDraggableItem(item, event, sort1ZoneNumber);
        spyOnChanged = spyOn(sort1, 'onChanged');
        spyGetItem = spyOn(transfer, 'getItem').and.returnValue(draggableItem);
        spyCaptureItem = spyOn(transfer, 'captureItem').and.returnValue(
          draggableItem
        );
        spyPreventDefault = spyOn(event, 'preventDefault');
        spyOnDrop = spyOn(sort1, 'onDrop').and.callThrough();
      })
    );

    it('should pass dragged item to transfer', () => {
      // arrange
      const spy = spyOn(transfer, 'dragStart');
      // act
      sort1.onItemDragstart(event, item, 0);
      // assert
      expect(spy).toHaveBeenCalledWith(
        getDraggableItem(item, event, sort1ZoneNumber)
      );
    });

    it('sould prevent event default when dragover item', () => {
      // arrange
      // act
      sort1.onItemDragover(event, 1);
      // assert
      expect(spyPreventDefault).toHaveBeenCalled();
    });

    it('souldn NOT prevent event default when no item is dragged over items', () => {
      // arrange
      spyGetItem.and.returnValue(undefined);
      // act
      sort1.onItemDragover(event, 1);
      // assert
      expect(spyPreventDefault).not.toHaveBeenCalled();
    });

    it('sould prevent event default when dragover zone', () => {
      // arrange
      // act
      sort1.cancelEvent(event);
      // assert
      expect(spyPreventDefault).toHaveBeenCalled();
    });

    it('souldn NOT prevent event default when no item is dragged over zone', () => {
      // arrange
      spyGetItem.and.returnValue(undefined);
      // act
      sort1.cancelEvent(event);
      // assert
      expect(spyPreventDefault).not.toHaveBeenCalled();
    });

    it('should remove item if it was captured or dropped in another continer', () => {
      // arrange
      draggableItem.overZoneIndex = -1;
      // act
      sort1.onDrop(draggableItem);
      // assert
      expect(spyOnChanged).toHaveBeenCalledWith([
        HEROES[1],
        HEROES[2],
        HEROES[3]
      ]);
    });

    it('shouldn NOT remove item if it was dropped in the same continer', () => {
      // arrange
      // act
      sort1.onDrop(draggableItem);
      // assert
      expect(spyOnChanged).not.toHaveBeenCalled();
    });

    it('should fire onChanged when drag over item', () => {
      // arrange
      // act
      sort1.onItemDragover(event, 1);
      // assert
      expect(spyOnChanged).toHaveBeenCalled();
    });

    it('should swap first and second item', () => {
      // arrange
      // act
      sort1.onItemDragover(event, 1);
      // assert
      expect(spyOnChanged).toHaveBeenCalledWith([
        HEROES[1],
        HEROES[0],
        HEROES[2],
        HEROES[3]
      ]);
    });

    it('should return unchanged array', () => {
      // arrange
      // act
      sort1.onItemDragover(event, 0);
      // assert
      expect(spyOnChanged).toHaveBeenCalledWith(HEROES);
    });

    it('should move first item to the end', () => {
      // arrange
      // act
      sort1.onItemDragover(event, 3);
      // assert
      expect(spyOnChanged).toHaveBeenCalledWith([
        HEROES[1],
        HEROES[2],
        HEROES[3],
        HEROES[0]
      ]);
    });

    it('should move last item to the begining', () => {
      // arrange
      item.id = 3;
      item.initData = item.value = HEROES[3];
      draggableItem.i = 3;
      // act
      sort1.onItemDragover(event, 0);
      // assert
      expect(spyOnChanged).toHaveBeenCalledWith([
        HEROES[3],
        HEROES[0],
        HEROES[1],
        HEROES[2]
      ]);
    });

    it('should insert a new item if was empty', () => {
      // arrange
      sort1.writeValue([]);
      // act
      sort1.onItemDragover(event, 0);
      // assert
      expect(spyOnChanged).toHaveBeenCalledWith([HEROES[0]]);
    });

    it('should insert a new item', () => {
      // arrange
      item.value = item.initData = 'new';
      draggableItem.i = 4;
      // act
      sort1.onItemDragover(event, 0);
      // assert
      expect(spyOnChanged).toHaveBeenCalledWith(['new', ...HEROES]);
    });

    it('should call onDrop when item is over an another container', done => {
      // arrange
      spyGetItem.and.callThrough();
      spyCaptureItem.and.callThrough();
      sort1.onItemDragstart(event, item, 0);
      // act
      const capturedItem = transfer.captureItem(-1, 0);
      // assert
      transfer
        .onCaptureItem()
        .subscribe(() => {
          expect(spyOnDrop).toHaveBeenCalledWith(capturedItem);
          done();
        });
    });

    it('should remove item when it is over an another container', done => {
        // arrange
        spyGetItem.and.callThrough();
        spyCaptureItem.and.callThrough();
        sort1.onItemDragstart(event, item, 0);
        // act
        transfer.captureItem(-1, 0);
        // assert
        transfer
          .onCaptureItem()
          .subscribe(() => {
              expect(spyOnChanged).toHaveBeenCalledWith([
                HEROES[1],
                HEROES[2],
                HEROES[3]
              ]);
              done();
            }
          );
      }
    );

    it('shouldn NOT remove item when it is dropped into the same container', done => {
        // arrange
        spyGetItem.and.callThrough();
        spyCaptureItem.and.callThrough();
        sort1.onItemDragstart(event, item, 0);
        // act
        transfer.captureItem(draggableItem.overZoneIndex, 4);
        // assert
        transfer
          .onCaptureItem()
          .subscribe(() => {
            expect(spyOnChanged).toHaveBeenCalledWith([...HEROES]);
            done();
          });
      }
    );

    it('should reset active item after drop', done => {
      // arrange
      spyGetItem.and.callThrough();
      spyCaptureItem.and.callThrough();
      sort1.onItemDragstart(event, item, 0);
      // act
      transfer.captureItem(draggableItem.overZoneIndex, 4);
      // assert
      transfer
        .onCaptureItem()
        .subscribe(() => {
          /* tslint:disable-next-line: no-any*/
          expect((sort1 as any).activeItem).toBe(-1);
          done();
        });
    });

    function getItemToDrag(): SortableItem {
      return { id: 0, value: HEROES[0], initData: HEROES[0] };
    }

    function getDraggableItem(sortableItem: SortableItem,
                              dragEvent: DragEvent,
                              zone: number): DraggableItem {
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

  function getItemsByContainerId(id = 'sort1'): string[] {
    return fixture.debugElement
      .queryAll(By.css(`#${id} div[draggable]`))
      /* tslint:disable-next-line: no-any */
      .map((item: any) => item.nativeElement.innerText);
  }
});
