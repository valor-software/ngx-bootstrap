import { async, TestBed } from '@angular/core/testing';
import { OffcanvasModule } from '../offcanvas.module';

describe('OffcanvasModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [OffcanvasModule]
    }).compileComponents();
  }));

  // TODO: Add real tests here.
  //
  // NB: This particular test does not do anything useful.
  //     It does NOT check for correct instantiation of the module.
  it('should have a module definition', () => {
    expect(OffcanvasModule).toBeDefined();
  });
});
