import { async, TestBed } from '@angular/core/testing';
import { DemoProgressbarModule } from './progressbar.module';

describe('ProgressbarModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [DemoProgressbarModule]
    }).compileComponents();
  }));

  // TODO: Add real tests here.
  //
  // NB: This particular test does not do anything useful.
  //     It does NOT check for correct instantiation of the module.
  it('should have a module definition', () => {
    expect(DemoProgressbarModule).toBeDefined();
  });
});
