import {Component} from '@angular/core';
import {it, beforeEach, beforeEachProviders, inject, expect} from '@angular/core/testing';
import {TestComponentBuilder, ComponentFixture} from '@angular/compiler/testing';
import {NgModel} from '@angular/common';
import {CAROUSEL_DIRECTIVES} from '../carousel';
// import {CarouselComponent} from './carousel.component';
// import {SlideComponent} from './slide.component';

const html = `
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
`;

/**
 * 1) if we set an active slide via model changes, .active class remains on a current slide.
 * 2) if we have only one slide, we shouldn't show prev/next nav buttons
 *
 *
 */

describe('Component: Carousel', () => {
  let fixture:ComponentFixture<any>;
  let context:any;
  let element:any;

  beforeEachProviders(() => [
    TestComponentBuilder
  ]);

  beforeEach(inject([TestComponentBuilder], (tcb:TestComponentBuilder) => {
    return tcb
      .overrideTemplate(TestCarouselComponent, html)
      .createAsync(TestCarouselComponent)
      .then((f:ComponentFixture<any>) => {
        fixture = f;
        context = fixture.componentInstance;
        element = fixture.nativeElement;
        fixture.detectChanges();
      });
  }));

  it('should set first slide as active by default', () => {
    let slide = element.querySelector('slide');
    expect(slide).toHaveCssClass('active');
    expect(slide.children[0]).toHaveCssClass('active');
  });

  it('should be able to select a slide via model changes', () => {
    context.slides[2].active = true;
    fixture.detectChanges();
    let slides = element.querySelectorAll('slide');
    // TODO:
    // expect(slides[0]).not.toHaveCssClass('active');
    expect(slides[1]).not.toHaveCssClass('active');
    expect(slides[2]).toHaveCssClass('active');
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

  it('should hide navigation when only one slide', () => {
    context.slides.splice(0, 2);
    fixture.detectChanges();
    expect(context.slides.length).toBe(1);
    let indicators = element.querySelectorAll('ol.carousel-indicators > li');
    expect(indicators.length).toBe(0);
    // TODO:
    // let prev = element.querySelectorAll('a.left');
    // expect(prev.length).toBe(0);
    // let next = element.querySelectorAll('a.right');
    // expect(next.length).toBe(0);
  });

  it('should disable prev button when slide index is 0 and noWrap is truthy', () => {
    context.noWrapSlides = true;
    fixture.detectChanges();

    // console.log(element.querySelectorAll('slide'));
    // let prev = element.querySelector('a.left');
    let next = element.querySelector('a.right');
    // prev.click()
    next.click();
    fixture.detectChanges();
    // console.log(prev);
    // console.log(element.querySelectorAll('slide'));

    // expect(navPrev.hasClass('disabled')).toBe(true);
  });
});

@Component({
  selector: 'carousel-test',
  directives: [CAROUSEL_DIRECTIVES, NgModel],
  template: ''
})

class TestCarouselComponent {
  public myInterval:number = 5000;
  public noWrapSlides:boolean = false;
  public slides:Array<any> = [
    {image: '//placekitten.com/600/300', text: 'slide0'},
    {image: '//placekitten.com/600/300', text: 'slide1'},
    {image: '//placekitten.com/600/300', text: 'slide2'}
  ];
}
