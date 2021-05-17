import { async, TestBed } from '@angular/core/testing';
import { DemoTooltipModule } from './tooltip.module';

describe('TooltipModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [DemoTooltipModule]
    }).compileComponents();
  }));

  // TODO: Add real tests here.
  //
  // NB: This particular test does not do anything useful.
  //     It does NOT check for correct instantiation of the module.
  it('should have a module definition', () => {
    expect(DemoTooltipModule).toBeDefined();
  });
});
