import { async, TestBed } from '@angular/core/testing';
import { ButtonsModule } from './buttons.module';

describe('ButtonsModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ButtonsModule]
    }).compileComponents();
  }));

  // TODO: Add real tests here.
  //
  // NB: This particular test does not do anything useful.
  //     It does NOT check for correct instantiation of the module.
  it('should have a module definition', () => {
    expect(ButtonsModule).toBeDefined();
  });
});
