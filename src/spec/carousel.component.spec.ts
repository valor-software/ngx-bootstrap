import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselModule } from '../carousel/carousel.module';

const html = `
  <div id="c1">
    <carousel [interval]="myInterval" [noWrap]="noWrapSlides">
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

function expectActiveSlides(nativeEl:HTMLDivElement, active:boolean[]):void {
  const slideElms = nativeEl.querySelectorAll('.carousel-item');
  const indicatorElms = nativeEl.querySelectorAll('ol.carousel-indicators > li');

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
  let fixture:ComponentFixture<any>;
  let context:TestCarouselComponent;
  let element:any;
  let clean:any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestCarouselComponent],
      imports: [CarouselModule]
    });
    TestBed.overrideComponent(TestCarouselComponent, {set: {template: html}});
    fixture = TestBed.createComponent(TestCarouselComponent);
    context = fixture.componentInstance;
    element = fixture.nativeElement.querySelector('#c1');
    clean = fixture.nativeElement.querySelector('#c2');
    fixture.detectChanges();
  });

  // beforeEach(fakeAsync(inject([TestComponentBuilder], (tcb:TestComponentBuilder) => {
  //   return tcb
  //     .overrideTemplate(TestCarouselComponent, html)
  //     .createAsync(TestCarouselComponent)
  //     .then((f:ComponentFixture<any>) => {
  //       fixture = f;
  //       context = fixture.componentInstance;
  //       fixture.detectChanges();
  //       element = fixture.nativeElement.querySelector('#c1');
  //       clean = fixture.nativeElement.querySelector('#c2');
  //       discardPeriodicTasks();
  //     });
  // })));

  it('should set first slide as active by default', () => {
    expectActiveSlides(element, [true, false, false]);
  });

  // TODO:
  xit('should be able to select a slide via model changes', () => {
    context.slides[2].active = true;
    fixture.detectChanges();
    expectActiveSlides(element, [false, false, true]);
  });

  it('should create next/prev nav button', () => {
    let prev = element.querySelectorAll('a.left');
    let next = element.querySelectorAll('a.right');
    expect(prev.length).toBe(1);
    expect(next.length).toBe(1);
  });

  it('should display slide indicators', () => {
    let indicators = element.querySelectorAll('ol.carousel-indicators > li');
    expect(indicators.length).toBe(3);
  });

  // TODO:
  xit('should hide navigation when only one slide', () => {
    context.slides.splice(0, 2);
    fixture.detectChanges();
    expect(context.slides.length).toBe(1);
    let indicators = element.querySelectorAll('ol.carousel-indicators > li');
    expect(indicators.length).toBe(0);
    let prev = element.querySelectorAll('a.left');
    expect(prev.length).toBe(0);
    let next = element.querySelectorAll('a.right');
    expect(next.length).toBe(0);
  });

  // TODO:
  xit('should disable prev button when slide index is 0 and noWrap is truthy', () => {
    context.noWrapSlides = true;
    fixture.detectChanges();
    let prev = element.querySelector('a.left');
    expect(prev.classList).toContain('disabled');
  });

  // TODO:
  xit('should disable next button when last slide is active and noWrap is truthy', () => {
    context.noWrapSlides = true;
    context.slides[2].active = true;
    fixture.detectChanges();
    let next = element.querySelector('a.right');
    expect(next.classList).toContain('disabled');
  });

  it('should change slide on indicator click', () => {
    let indicators = element.querySelectorAll('ol.carousel-indicators > li');
    expectActiveSlides(element, [true, false, false]);
    indicators[2].click();
    fixture.detectChanges();
    expectActiveSlides(element, [false, false, true]);
    indicators[1].click();
    fixture.detectChanges();
    expectActiveSlides(element, [false, true, false]);
  });

  it('should change slide on carousel control click', () => {
    const prev = element.querySelector('a.left');
    const next = element.querySelector('a.right');
    next.click();
    fixture.detectChanges();
    expectActiveSlides(element, [false, true, false]);
    prev.click();
    fixture.detectChanges();
    expectActiveSlides(element, [true, false, false]);
  });

  // it('should change slide on time passage (default)', fakeAsync(() => {
  //   expectActiveSlides(clean, [true, false]);
  //   tick(6000);
  //   fixture.detectChanges();
  //   expectActiveSlides(clean, [false, true]);
  // }));

  it('should wrap slide changes by default', () => {
    const prev = element.querySelector('a.left');
    const next = element.querySelector('a.right');
    expectActiveSlides(element, [true, false, false]);
    next.click();
    fixture.detectChanges();
    expectActiveSlides(element, [false, true, false]);
    next.click();
    fixture.detectChanges();
    expectActiveSlides(element, [false, false, true]);
    next.click();
    fixture.detectChanges();
    expectActiveSlides(element, [true, false, false]);
    prev.click();
    fixture.detectChanges();
    expectActiveSlides(element, [false, false, true]);
  });

  it('should not wrap slide changes if noWrap == true', () => {
    context.noWrapSlides = true;
    fixture.detectChanges();
    const prev = element.querySelector('a.left');
    const next = element.querySelector('a.right');
    expectActiveSlides(element, [true, false, false]);
    prev.click();
    fixture.detectChanges();
    expectActiveSlides(element, [true, false, false]);
    next.click();
    fixture.detectChanges();
    expectActiveSlides(element, [false, true, false]);
    next.click();
    fixture.detectChanges();
    expectActiveSlides(element, [false, false, true]);
    next.click();
    fixture.detectChanges();
    expectActiveSlides(element, [false, false, true]);
  });
});

@Component({
  selector: 'carousel-test',
  template: ''
})

class TestCarouselComponent {
  public myInterval:number = 5000;
  public noWrapSlides:boolean = false;
  public slides:any[] = [
    {image: '//placekitten.com/600/300', text: 'slide0'},
    {image: '//placekitten.com/600/300', text: 'slide1'},
    {image: '//placekitten.com/600/300', text: 'slide2'}
  ];
}
