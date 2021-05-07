import { async, TestBed } from '@angular/core/testing';
import { AlertsModule } from './alerts.module';

describe('AlertsModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AlertsModule]
    }).compileComponents();
  }));

  // TODO: Add real tests here.
  //
  // NB: This particular test does not do anything useful.
  //     It does NOT check for correct instantiation of the module.
  it('should have a module definition', () => {
    expect(AlertsModule).toBeDefined();
  });
});
