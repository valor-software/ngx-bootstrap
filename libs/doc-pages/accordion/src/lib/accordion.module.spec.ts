import { async, TestBed } from '@angular/core/testing';
import { AccordionModule } from './accordion.module';

describe('AccordionModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AccordionModule]
    }).compileComponents();
  }));

  // TODO: Add real tests here.
  //
  // NB: This particular test does not do anything useful.
  //     It does NOT check for correct instantiation of the module.
  it('should have a module definition', () => {
    expect(AccordionModule).toBeDefined();
  });
});
