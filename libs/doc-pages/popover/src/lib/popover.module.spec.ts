import { async, TestBed } from '@angular/core/testing';
import { DemoPopoverModule } from './popover.module';

describe('PopoverModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [DemoPopoverModule]
    }).compileComponents();
  }));

  // TODO: Add real tests here.
  //
  // NB: This particular test does not do anything useful.
  //     It does NOT check for correct instantiation of the module.
  it('should have a module definition', () => {
    expect(DemoPopoverModule).toBeDefined();
  });
});
