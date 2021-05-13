import { async, TestBed } from '@angular/core/testing';
import { CarouselModule } from './carousel.module';

describe('CarouselModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CarouselModule]
    }).compileComponents();
  }));

  // TODO: Add real tests here.
  //
  // NB: This particular test does not do anything useful.
  //     It does NOT check for correct instantiation of the module.
  it('should have a module definition', () => {
    expect(CarouselModule).toBeDefined();
  });
});
