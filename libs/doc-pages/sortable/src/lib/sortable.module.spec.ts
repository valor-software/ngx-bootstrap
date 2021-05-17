import { async, TestBed } from '@angular/core/testing';
import { DemoSortableModule } from './sortable.module';

describe('SortableModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [DemoSortableModule]
    }).compileComponents();
  }));

  // TODO: Add real tests here.
  //
  // NB: This particular test does not do anything useful.
  //     It does NOT check for correct instantiation of the module.
  it('should have a module definition', () => {
    expect(DemoSortableModule).toBeDefined();
  });
});
