import { async, TestBed } from '@angular/core/testing';
import { DemoPaginationModule } from './pagination.module';

describe('PaginationModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [DemoPaginationModule]
    }).compileComponents();
  }));

  // TODO: Add real tests here.
  //
  // NB: This particular test does not do anything useful.
  //     It does NOT check for correct instantiation of the module.
  it('should have a module definition', () => {
    expect(DemoPaginationModule).toBeDefined();
  });
});
