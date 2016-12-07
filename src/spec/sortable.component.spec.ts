import { ComponentFixture, TestBed, fakeAsync, tick, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { TypeaheadModule } from '../typeahead/typeahead.module';
import { Component, DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { SortableModule, SortableComponent } from '../sortable';

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

  function getItemsByContainerId(id: string = 'sort1'): string[] {
    return fixture.debugElement.queryAll(By.css(`#${id} div[draggable]`))
      .map((item: any) => item.nativeElement.innerText);
  }
});
