import { async, TestBed } from '@angular/core/testing';
import { DemoTypeaheadModule } from './typeahead.module';

describe('TypeaheadModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [DemoTypeaheadModule]
    }).compileComponents();
  }));

  // TODO: Add real tests here.
  //
  // NB: This particular test does not do anything useful.
  //     It does NOT check for correct instantiation of the module.
  it('should have a module definition', () => {
    expect(DemoTypeaheadModule).toBeDefined();
  });
});
