import { ComponentFixture, TestBed, fakeAsync, tick, ComponentFixtureAutoDetect, inject } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { SortableModule, SortableComponent, DragAndDropService } from '../sortable';
import { GrabbedElement } from '../sortable/models';

const HEROES: string[] = [ 'Windstorm', 'Bombasto', 'Magneta', 'Tornado' ];
const HEROES_OBJ: any[] = [ { id: 1, name: 'Windstorm' }, { id: 2, name: 'Bombasto' }, { id: 3, name: 'Magneta' } ];

@Component({
  template: `
    <bs-sortable id="sort1" [(ngModel)]="heroes" [placeholderItem]="'empty'" [itemStyle]="{ 'background-color': 'white', margin: '10px' }" [itemActiveStyle]="{ 'background-color': 'lightgray' }"></bs-sortable>
    <bs-sortable id="sort2" [(ngModel)]="heroesObj" [fieldName]="'name'" [placeholderItem]="'empty'"></bs-sortable>
`
})
class TestSortableComponent {
  public selectedState:string;
  public heroes: string[] = [...HEROES];
  public heroesObj: any[] = [...HEROES_OBJ];
}

describe('Component: Sortable', () => {
  let fixture: ComponentFixture<TestSortableComponent>;
  let sort1: SortableComponent;
  let sort2: SortableComponent;

  beforeEach(fakeAsync(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [ TestSortableComponent ],
      imports: [ SortableModule.forRoot(), FormsModule ],
      providers: [{ provide: ComponentFixtureAutoDetect, useValue: true }]
    }).createComponent(TestSortableComponent);

    fixture.detectChanges();

    let sortableComponents = fixture.debugElement.queryAll(By.directive(SortableComponent)).map((de:DebugElement) => de.injector.get(SortableComponent) as SortableComponent);
    [ sort1, sort2 ] = sortableComponents;
  }));

  it('should be defined on the test component', () => {
    expect(sort1).not.toBeNull('sortable component with strings');
    expect(sort2).not.toBeNull('sortable component with objects');
    expect(sort1.activeItem).toBe(-1);
    expect(sort2.activeItem).toBe(-1);
  });

  it('different zones should have different ids', () => {
    expect(sort1.currentDropZoneId).not.toBe(sort2.currentDropZoneId);
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

  it('should apply active item style over item style', () => {
    // arrange
    let activeItemStyle = Object.assign({}, sort1.itemStyle, sort1.itemActiveStyle);
    // act
    let style = sort1.getItemStyle(true);
    // assert
    expect(style).toEqual(activeItemStyle);
  });

  it('should return normal item style', () => {
    // arrange
    let normalItemStyle = Object.assign({}, sort1.itemStyle);
    // act
    let style = sort1.getItemStyle(false);
    // assert
    expect(style).toEqual(normalItemStyle);
  });

  it('should update active item index', () => {
    // arrange
    // act
    sort1.onActiveItemChange(2);
    // assert
    expect(sort1.activeItem).toEqual(2);
  });

  describe('process drag & drop', () => {
    let dragAndDropService: DragAndDropService;

    beforeEach(inject([DragAndDropService], (service: DragAndDropService) => {
      dragAndDropService = service;
    }));

    // it('should reset active item after drop', fakeAsync(() => {
    //   // arrange
    //   spyGetItem.and.callThrough();
    //   spyCaptureItem.and.callThrough();
    //   sort1.onItemDragstart(event, item, 0);
    //   // act
    //   let capturedItem = dragAndDropService.captureItem(draggableItem.overZoneIndex, 4);
    //   // assert
    //   dragAndDropService.onCaptureItem().subscribe(() => expect((sort1 as any).activeItem).toBe(-1));
    // }));
  });

  function getItemsByContainerId(id: string = 'sort1'): string[] {
    return fixture.debugElement.queryAll(By.css(`#${id} div[draggable]`))
      .map((item: any) => item.nativeElement.innerText);
  }
});

