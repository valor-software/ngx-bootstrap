import { async, TestBed } from '@angular/core/testing';
import { DemoCollapseModule } from '@ngx-bootstrap-doc/collapse';
DemoCollapseModule
describe('CollapseModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [DemoCollapseModule]
    }).compileComponents();
  }));

  // TODO: Add real tests here.
  //
  // NB: This particular test does not do anything useful.
  //     It does NOT check for correct instantiation of the module.
  it('should have a module definition', () => {
    expect(DemoCollapseModule).toBeDefined();
  });
});
