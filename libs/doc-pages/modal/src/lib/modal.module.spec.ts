import { async, TestBed } from '@angular/core/testing';
import { ModalModule } from './modal.module';

describe('ModalModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ModalModule]
    }).compileComponents();
  }));

  // TODO: Add real tests here.
  //
  // NB: This particular test does not do anything useful.
  //     It does NOT check for correct instantiation of the module.
  it('should have a module definition', () => {
    expect(ModalModule).toBeDefined();
  });
});
