import { async, TestBed } from '@angular/core/testing';
import { DocsModule } from './docs.module';

describe('DocsModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [DocsModule]
    }).compileComponents();
  }));

  // TODO: Add real tests here.
  //
  // NB: This particular test does not do anything useful.
  //     It does NOT check for correct instantiation of the module.
  it('should have a module definition', () => {
    expect(DocsModule).toBeDefined();
  });
});
