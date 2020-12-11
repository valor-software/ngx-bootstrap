// tslint:disable:max-file-line-count max-line-length

import { Component } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { CarouselModule } from 'ngx-bootstrap/carousel';

@Component({selector: 'carousel-test', template: ''})
class TestCarouselComponent {
  myInterval = 5000;
  noWrapSlides = false;
  showIndicators = true;
  itemsPerSlide = 1;
  singleSlideOffset = false;
  startFromIndex = 0;

  slides: any[] = [
    {image: '//placekitten.com/600/300', text: 'slide0'},
    {image: '//placekitten.com/600/300', text: 'slide1'},
    {image: '//placekitten.com/600/300', text: 'slide2'},
    {image: '//placekitten.com/600/300', text: 'slide3'},
    {image: '//placekitten.com/600/300', text: 'slide4'},
    {image: '//placekitten.com/600/300', text: 'slide5'}
  ];
}

const html = `
  <div id="c1">
    <carousel [interval]="myInterval"
              [noWrap]="noWrapSlides"
              [showIndicators]="showIndicators"
              [itemsPerSlide]="itemsPerSlide">
      <slide *ngFor="let slide of slides; let index=index"
             [active]="slide.active">
        <img [src]="slide.image" style="margin:auto;">
        <div class="carousel-caption">
          <h4>Slide {{index}}</h4>
          <p>{{slide.text}}</p>
        </div>
      </slide>
    </carousel>
  </div>

  <div id="c2">
    <carousel>
      <slide>slide1</slide>
      <slide>slide2</slide>
    </carousel>
  </div>
`;

function expectActiveSlides(nativeEl: HTMLDivElement, active: boolean[]): void {
  const slideElms = nativeEl.querySelectorAll('.carousel-item');
  const indicatorElms = nativeEl.querySelectorAll(
    'ol.carousel-indicators > li'
  );

  expect(slideElms.length).toBe(active.length);
  expect(indicatorElms.length).toBe(active.length);

  for (let i = 0; i < active.length; i++) {
    if (active[i]) {
      expect(slideElms[i].classList).toContain('active');
      expect(indicatorElms[i].classList).toContain('active');
    } else {
      expect(slideElms[i].classList).not.toContain('active');
      expect(indicatorElms[i].classList).not.toContain('active');
    }
  }
}

describe('Component: Carousel', () => {
  /* tslint:disable-next-line: no-any */
  let fixture: ComponentFixture<any>;
  let context: TestCarouselComponent;
  /* tslint:disable-next-line: no-any */
  let element: any;
  /* tslint:disable-next-line: no-any no-unused-variable */
  let clean: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestCarouselComponent],
      imports: [CarouselModule]
    });
    TestBed.overrideComponent(TestCarouselComponent, {
      set: {template: html}
    });
    fixture = TestBed.createComponent(TestCarouselComponent);
    context = fixture.componentInstance;
    element = fixture.nativeElement.querySelector('#c1');
    clean = fixture.nativeElement.querySelector('#c2');
    fixture.detectChanges();
  });

  it('should set first slide as active by default', () => {
    expectActiveSlides(element, [true, false, false, false, false, false]);
  });

  // TODO:
  xit('should be able to select a slide via model changes', () => {
    context.slides[2].active = true;
    fixture.detectChanges();
    expectActiveSlides(element, [false, false, true, false, false, false]);
  });

  it('should create next/prev nav button', () => {
    const prev = element.querySelectorAll('a.left');
    const next = element.querySelectorAll('a.right');
    expect(prev.length).toBe(1);
    expect(next.length).toBe(1);
  });

  it('should display slide indicators', () => {
    const indicators = element.querySelectorAll('ol.carousel-indicators > li');
    expect(indicators.length).toBe(6);
  });

  it('should hide navigation when only one slide', () => {
    context.slides.splice(0, 5);
    fixture.detectChanges();
    expect(context.slides.length).toBe(1);
    const indicators = element.querySelectorAll('ol.carousel-indicators > li');
    expect(indicators.length).toBe(0);
    const prev = element.querySelectorAll('a.left');
    expect(prev.length).toBe(0);
    const next = element.querySelectorAll('a.right');
    expect(next.length).toBe(0);
  });

  it('should disable prev button when slide index is 0, noWrap is truthy', () => {
    context.noWrapSlides = true;
    fixture.detectChanges();
    const prev = element.querySelector('a.left');
    expect(prev.classList).toContain('disabled');
  });

  it('should disable next button when last slide is active, noWrap is truthy', () => {
    context.noWrapSlides = true;
    const indicators = element.querySelectorAll('ol.carousel-indicators > li');
    indicators[5].click();
    fixture.detectChanges();
    const next = element.querySelector('a.right');
    expect(next.classList).toContain('disabled');
  });

  it('should enable next button when last slide is active, noWrap is truthy', () => {
    const indicators = element.querySelectorAll('ol.carousel-indicators > li');
    indicators[5].click();
    fixture.detectChanges();
    const next = element.querySelector('a.right');
    expect(next.classList).not.toContain('disabled');
  });

  it('should change slide on indicator click', () => {
    const indicators = element.querySelectorAll('ol.carousel-indicators > li');
    expectActiveSlides(element, [true, false, false, false, false, false]);
    indicators[2].click();
    fixture.detectChanges();
    expectActiveSlides(element, [false, false, true, false, false, false]);
    indicators[1].click();
    fixture.detectChanges();
    expectActiveSlides(element, [false, true, false, false, false, false]);
  });

  it('should hide carousel-indicators if property showIndicators is == false', () => {
    context.showIndicators = false;
    fixture.detectChanges();
    expect(element.querySelector('ol')).toBeNull();
  });

  it('should change slide on carousel control click', () => {
    const prev = element.querySelector('a.left');
    const next = element.querySelector('a.right');

    next.click();
    fixture.detectChanges();
    expectActiveSlides(element, [false, true, false, false, false, false]);

    prev.click();
    fixture.detectChanges();
    expectActiveSlides(element, [true, false, false, false, false, false]);
  });

  it('should wrap slide changes by default', () => {
    const prev = element.querySelector('a.left');
    const next = element.querySelector('a.right');

    expectActiveSlides(element, [true, false, false, false, false, false]);

    next.click();
    fixture.detectChanges();
    expectActiveSlides(element, [false, true, false, false, false, false]);

    next.click();
    fixture.detectChanges();
    expectActiveSlides(element, [false, false, true, false, false, false]);

    next.click();
    fixture.detectChanges();
    expectActiveSlides(element, [false, false, false, true, false, false]);

    prev.click();
    fixture.detectChanges();
    expectActiveSlides(element, [false, false, true, false, false, false]);

    prev.click();
    fixture.detectChanges();
    expectActiveSlides(element, [false, true, false, false, false, false]);

    prev.click();
    fixture.detectChanges();
    expectActiveSlides(element, [true, false, false, false, false, false]);
  });

  it('should not wrap slide changes if noWrap == true', () => {
    context.noWrapSlides = true;
    fixture.detectChanges();

    const prev = element.querySelector('a.left');
    const next = element.querySelector('a.right');

    expectActiveSlides(element, [true, false, false, false, false, false]);

    prev.click();
    fixture.detectChanges();
    expectActiveSlides(element, [true, false, false, false, false, false]);

    next.click();
    fixture.detectChanges();
    expectActiveSlides(element, [false, true, false, false, false, false]);

    next.click();
    fixture.detectChanges();
    expectActiveSlides(element, [false, false, true, false, false, false]);
  });

  it('Multilist: should shift visible slides on carousel control click' +
  'by number equal to itemsPerSlide value', () => fakeAsync(() => {
    context.itemsPerSlide = 3;
    fixture.detectChanges();
    tick();

    const prev = element.querySelector('a.left');
    const next = element.querySelector('a.right');

    expectActiveSlides(element, [true, true, true, false, false, false]);

    next.click();
    fixture.detectChanges();
    expectActiveSlides(element, [false, false, false, true, true, true]);

    next.click();
    fixture.detectChanges();
    expectActiveSlides(element, [true, true, true, false, false, false]);

    prev.click();
    fixture.detectChanges();
    expectActiveSlides(element, [false, false, false, true, true, true]);
  }));

  it('Multilist: should select slides on carousel via indicator', () => fakeAsync(() => {
    const indicators = element.querySelectorAll('ol.carousel-indicators > li');

    context.itemsPerSlide = 3;

    fixture.detectChanges();
    tick();

    expectActiveSlides(element, [true, true, true, false, false, false]);

    indicators[2].click();
    fixture.detectChanges();
    expectActiveSlides(element, [true, true, true, false, false, false]);

    indicators[3].click();
    fixture.detectChanges();
    expectActiveSlides(element, [false, false, false, true, true, true]);
  }));

  it('Multilist: carousel should not shifts if noWrap is false' +
  'last or first items are visible', () => fakeAsync(() => {
    context.itemsPerSlide = 3;
    fixture.detectChanges();
    context.noWrapSlides = false;
    fixture.detectChanges();

    tick();

    const prev = element.querySelector('a.left');
    const next = element.querySelector('a.right');

    expectActiveSlides(element, [true, true, true, false, false, false]);

    next.click();
    fixture.detectChanges();
    expectActiveSlides(element, [false, false, false, true, true, true]);

    next.click();
    fixture.detectChanges();
    expectActiveSlides(element, [false, false, false, true, true, true]);

    prev.click();
    fixture.detectChanges();
    expectActiveSlides(element, [true, true, true, false, false, false]);

    prev.click();
    fixture.detectChanges();
    expectActiveSlides(element, [true, true, true, false, false, false]);
  }));

  it('Multilist: carousel should shifts by 1 one item if singleSlideOffset is true', () => fakeAsync(() => {
    context.itemsPerSlide = 3;
    fixture.detectChanges();

    context.singleSlideOffset = true;
    fixture.detectChanges();

    tick();

    const next = element.querySelector('a.right');

    expectActiveSlides(element, [true, true, true, false, false, false]);

    next.click();
    fixture.detectChanges();
    expectActiveSlides(element, [false, true, true, true, false, false]);

    next.click();
    fixture.detectChanges();
    expectActiveSlides(element, [false, false, true, true, true, false]);
  }));

  it('Multilist: carousel should starts from specific index if fromStartIndex is defined', () => fakeAsync(() => {
    context.itemsPerSlide = 3;
    fixture.detectChanges();

    context.startFromIndex = 5;
    fixture.detectChanges();

    tick();

    const next = element.querySelector('a.right');

    expectActiveSlides(element, [true, true, false, false, false, true]);

    next.click();
    fixture.detectChanges();
    expectActiveSlides(element, [true, true, true, false, false, false]);
  }));
});
