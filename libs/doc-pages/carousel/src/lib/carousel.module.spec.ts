import { async, TestBed } from '@angular/core/testing';
import { DemoCarouselModule } from './carousel.module';

describe('CarouselModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [DemoCarouselModule]
    }).compileComponents();
  }));

  // TODO: Add real tests here.
  //
  // NB: This particular test does not do anything useful.
  //     It does NOT check for correct instantiation of the module.
  it('should have a module definition', () => {
    expect(DemoCarouselModule).toBeDefined();
  });
});
