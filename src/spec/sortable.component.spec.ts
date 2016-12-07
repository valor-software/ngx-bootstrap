import { ComponentFixture, TestBed, fakeAsync, tick, ComponentFixtureAutoDetect, inject } from '@angular/core/testing';
import { TypeaheadModule } from '../typeahead/typeahead.module';
import { Component, DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { SortableModule, SortableComponent, DraggableItemService } from '../sortable';
import { SortableItem } from '../sortable/components';

interface State {
  id:number;
  name:string;
  region:string;
}
const HEROES: string[] = [ 'Windstorm', 'Bombasto', 'Magneta', 'Tornado' ];
const HEROES_OBJ: any[] = [ { id: 1, name: 'Windstorm' }, { id: 2, name: 'Bombasto' }, { id: 3, name: 'Magneta' } ];

@Component({
  template: `
    <ng2-sortable
      id="sort1"
      [(ngModel)]="heroes"
      [placeholderItem]="'empty'"
    >
    </ng2-sortable>
    <ng2-sortable
      id="sort2" 
      [(ngModel)]="heroesObj"
      [fieldName]="'name'"
      [placeholderItem]="'empty'"
    >
    </ng2-sortable>
`
})
class TestSortableComponent {
  public selectedState:string;
  public heroes: string[] = [...HEROES];
  public heroesObj: any[] = [...HEROES_OBJ];
}

describe('Component: Sortable', () => {
  let fixture: ComponentFixture<TestSortableComponent>;
  let component: TestSortableComponent;
  let sort1: SortableComponent;
  let sort2: SortableComponent;

  beforeEach(fakeAsync(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [TestSortableComponent],
      imports: [SortableModule, FormsModule],
      providers: [{ provide: ComponentFixtureAutoDetect, useValue: true }]
    }).createComponent(TestSortableComponent);

    fixture.detectChanges();

    component = fixture.componentInstance;

    // get the sortble components instances
    let sortableComponents = fixture.debugElement.queryAll(By.directive(SortableComponent)).map((de:DebugElement) => de.injector.get(SortableComponent) as SortableComponent);
    sort1 = sortableComponents[0];
    sort2 = sortableComponents[1];
  }));

  it('should be defined on the test component', () => {
    expect(sort1).not.toBeNull('sortable component with strings');
    expect(sort2).not.toBeNull('sortable component with objects');
  });

  describe('onChange', () => {
    it('should render list of strings', fakeAsync(() => {
      // arrange
      // act
      let renderedItems = getItemsByContainerId();

      // assert
      expect(renderedItems).toEqual(HEROES);
    }));

    it('should render list of complex models', () => {
      // arrange
      // act
      let renderedItems = getItemsByContainerId('sort2');

      // assert
      expect(renderedItems).toEqual(HEROES_OBJ.map((h: any) => h.name));
    });
  });

  describe('process drag & drop', () => {
    let transfer: DraggableItemService;

    beforeEach(inject([DraggableItemService], (service: DraggableItemService) => {
      transfer = service;
    }));

    it('should pass dragged item to transfer', () => {
      // arrange
      let item = getItemToDrag();
      let event = new Event('dragstart') as DragEvent;
      let spy = spyOn(transfer, 'dragStart');
      let zone = (sort1 as any).currentZoneIndex;

      // act
      sort1.onItemDragstart(event, item, 0);

      // assert
      expect(spy).toHaveBeenCalledWith(getDraggableItem(item, event, zone));
    });

    it('sould prevent event default when dragover item', () => {
      // arrange
      let item = getItemToDrag();
      let event = new Event('dragover') as DragEvent;
      let zone = (sort1 as any).currentZoneIndex;
      let draggableItem = getDraggableItem(item, event, zone);
      let spy = spyOn(event, 'preventDefault');
      spyOn(transfer, 'getItem').and.returnValue(draggableItem);
      spyOn(transfer, 'captureItem').and.returnValue(draggableItem);

      // act
      sort1.onItemDragover(event, 1);

      // assert
      expect(spy).toHaveBeenCalled();
    });

    it('souldn\'t prevent event default when no item is dragged over items', () => {
      // arrange
      let spy = jasmine.createSpy('preventDefault');

      // act
      sort1.onItemDragover(new Event('dragover') as DragEvent, 1);

      // assert
      expect(spy).not.toHaveBeenCalled();
    });

    it('sould prevent event default when dragover zone', () => {
      // arrange
      let item = getItemToDrag();
      let event = new Event('dragover') as DragEvent;
      let draggableItem = getDraggableItem(item, event, 0);
      let spy = spyOn(event, 'preventDefault');
      spyOn(transfer, 'getItem').and.returnValue(draggableItem);

      // act
      sort1.onZoneDragover(event);

      // assert
      expect(spy).toHaveBeenCalled();
    });

    it('souldn\'t prevent event default when no item is dragged over zone', () => {
      // arrange
      let spy = jasmine.createSpy('preventDefault');

      // act
      sort1.onZoneDragover(new Event('dragover') as DragEvent);

      // assert
      expect(spy).not.toHaveBeenCalled();
    });

    describe('reordering', () => {
      let item: SortableItem;
      let event: DragEvent;
      let draggableItem: any;
      let spyOnChanged: any;

      let spies: any[];

      beforeEach(() => {
        item = getItemToDrag();
        event = new Event('dragover') as DragEvent;
        let zone = (sort1 as any).currentZoneIndex;
        draggableItem = getDraggableItem(item, event, zone);
        spyOnChanged = spyOn(sort1, 'onChanged');
        spyOn(transfer, 'getItem').and.returnValue(draggableItem);
        spyOn(transfer, 'captureItem').and.returnValue(draggableItem);
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
        expect(spyOnChanged).toHaveBeenCalledWith([ HEROES[1], HEROES[0], HEROES[2], HEROES[3] ]);
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
        expect(spyOnChanged).toHaveBeenCalledWith([ HEROES[1], HEROES[2], HEROES[3], HEROES[0] ]);
      });

      it('should move last item to the begining', () => {
        // arrange
        item.id = 3;
        item.initData = HEROES[3];
        item.value = HEROES[3];
        draggableItem.i = 3;

        // act
        sort1.onItemDragover(event, 0);

        // assert
        expect(spyOnChanged).toHaveBeenCalledWith([ HEROES[3], HEROES[0], HEROES[1], HEROES[2] ]);
      });

      it('should insert a new item if was empty', () => {
        // arrange
        sort1.writeValue([]);

        // act
        sort1.onItemDragover(event, 0);

        // assert
        expect(spyOnChanged).toHaveBeenCalledWith([ HEROES[0] ]);
      });

      it('should insert a new item', () => {
        // arrange
        item.id = 4;
        item.initData = "new";
        item.value = "new";
        draggableItem.overZoneIndex = -1;

        // act
        sort1.onItemDragover(event, 0);

        // assert
        expect(spyOnChanged).toHaveBeenCalledWith([ "new", ...HEROES ]);
      });
    });

    function getItemToDrag(): SortableItem {
      return { id: 0, value: HEROES[0], initData: HEROES[0]};
    }

    function getDraggableItem(item: SortableItem, event: DragEvent, zone: number): any {
      return {
        event,
        item,
        i: 0,
        initialIndex: 0,
        lastZoneIndex: zone,
        overZoneIndex: zone
      };
    }
  });

  function getItemsByContainerId(id: string = 'sort1'): string[] {
    return fixture.debugElement.queryAll(By.css(`#${id} div[draggable]`))
      .map((item: any) => item.nativeElement.innerText);
  }
});
