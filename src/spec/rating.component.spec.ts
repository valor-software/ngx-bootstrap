import { Component } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { RatingComponent } from '../rating/rating.component';
import { RatingModule } from '../rating/rating.module';
import { FormsModule } from '@angular/forms';

describe('Component: Rating. Init:', () => {

  let fixture: ComponentFixture<RatingComponent>;
  let context: any;
  let element: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RatingComponent]
    });
    fixture = TestBed.createComponent(RatingComponent);
    context = fixture.debugElement.componentInstance;

    element = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('checking of working with default values', () => {
    const items = element.querySelectorAll('.sr-only');

    expect(items.length).toEqual(5);
    expect(items[0].innerHTML).toEqual('( )');
    expect(items[4].innerHTML).toEqual('( )');
    expect(items[5]).toBeUndefined();

    const icons = element.querySelectorAll('i');

    expect(icons[0].classList).toContain('glyphicon-star-empty');
    expect(icons[4].classList).toContain('glyphicon-star-empty');
    expect(icons[4].getAttribute('title')).toEqual('five');
  });

  it('checking of working with changed values', () => {
    context.max = 3;
    context.titles = ['one', 'two', 'new title'];
    context.stateOff='glyphicon-ok-circle';

    context.ngOnInit();
    fixture.detectChanges();

    const items = element.querySelectorAll('.sr-only');

    expect(items.length).toEqual(3);
    expect(items[0].innerHTML).toEqual('( )');
    expect(items[2].innerHTML).toEqual('( )');
    expect(items[3]).toBeUndefined();

    const icons = element.querySelectorAll('i');

    expect(icons[0].classList).toContain('glyphicon-ok-circle');
    expect(icons[2].getAttribute('title')).toEqual('new title');
  });

  it('checking of working with custom icons', () => {
    context.ratingStates = [
      {stateOff: 'glyphicon-ok-circle'},
      {stateOff: 'glyphicon-star-empty'},
      {stateOff: 'glyphicon-ban-circle'},
      {stateOff: 'glyphicon-heart'},
      {stateOff: 'glyphicon-off'}
    ];

    context.ngOnInit();
    fixture.detectChanges();

    const icons = element.querySelectorAll('i');
    expect(icons[0].classList).toContain('glyphicon-ok-circle');
    expect(icons[1].classList).toContain('glyphicon-star-empty');
    expect(icons[2].classList).toContain('glyphicon-ban-circle');
    expect(icons[3].classList).toContain('glyphicon-heart');
    expect(icons[4].classList).toContain('glyphicon-off');
  });

});
  describe('Component: Rating. Clicks:', () => {
    const tpl = `
      <rating [(ngModel)]="rate" [readonly]="isReadonly" [stateOn]="stateOn"
        (onHover)="hoveringOver($event)" (onLeave)="resetStar($event)"
        [titles]="titles"></rating>
    `;
    let fixture:ComponentFixture<TestRatingComponent>;
    let context:any;
    let element:any;

    beforeEach(fakeAsync(() => {
      TestBed.configureTestingModule({
        declarations: [TestRatingComponent],
        imports: [RatingModule.forRoot(), FormsModule]
      });
      TestBed.overrideComponent(TestRatingComponent, {set: {template: tpl}});
      fixture = TestBed.createComponent(TestRatingComponent);
      context = fixture.debugElement.componentInstance;
      element = fixture.nativeElement;
      fixture.detectChanges();
    }));

    it('check simple click', fakeAsync(() => {

      let items = element.querySelectorAll('.sr-only');
      let icons = element.querySelectorAll('i');

      expect(items[0].innerHTML).toEqual('( )');
      expect(icons[0].classList).toContain('glyphicon-star-empty');
      expect(icons[0].classList).not.toContain('glyphicon-star');

      icons[1].click();
      tick(200);
      fixture.detectChanges();

      expect(items[0].innerHTML).toEqual('(*)');
      expect(icons[0].classList).not.toContain('glyphicon-star-empty');
      expect(icons[0].classList).toContain('glyphicon-star');
    }));

    it('check disabling', fakeAsync(() => {

      let items = element.querySelectorAll('.sr-only');
      let icons = element.querySelectorAll('i');

      expect(items[0].innerHTML).toEqual('( )');
      expect(icons[0].classList).toContain('glyphicon-star-empty');
      expect(icons[0].classList).not.toContain('glyphicon-star');

      context.isReadonly = true;
      fixture.detectChanges();

      icons[1].click();
      tick(200);
      fixture.detectChanges();

      expect(items[0].innerHTML).toEqual('( )');
      expect(icons[0].classList).toContain('glyphicon-star-empty');
      expect(icons[0].classList).not.toContain('glyphicon-star');

      context.isReadonly = false;
      fixture.detectChanges();

      icons[1].click();
      tick(200);
      fixture.detectChanges();

      expect(items[0].innerHTML).toEqual('(*)');
      expect(icons[0].classList).not.toContain('glyphicon-star-empty');
      expect(icons[0].classList).toContain('glyphicon-star');
    }));

});

@Component({
  selector: 'rating-test',
  template: ''
})

class TestRatingComponent {
  public max:number = 5;
  public rate:number = 0;
  public isReadonly:boolean = false;
  public titles:[string] = ['one', 'two', 'three', 'four', 'five'];
}
