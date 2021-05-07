import { async, TestBed } from '@angular/core/testing';
import { DropdownModule } from './dropdown.module';

describe('DropdownModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [DropdownModule]
    }).compileComponents();
  }));

  // TODO: Add real tests here.
  //
  // NB: This particular test does not do anything useful.
  //     It does NOT check for correct instantiation of the module.
  it('should have a module definition', () => {
    expect(DropdownModule).toBeDefined();
  });
});
