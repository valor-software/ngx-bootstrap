import { async, TestBed } from '@angular/core/testing';
import { DemoModalModule } from './modal.module';

describe('ModalModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [DemoModalModule]
    }).compileComponents();
  }));

  // TODO: Add real tests here.
  //
  // NB: This particular test does not do anything useful.
  //     It does NOT check for correct instantiation of the module.
  it('should have a module definition', () => {
    expect(DemoModalModule).toBeDefined();
  });
});
