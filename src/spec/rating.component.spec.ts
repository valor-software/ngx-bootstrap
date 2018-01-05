import { Component } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { RatingComponent } from '../rating/rating.component';
import { RatingModule } from '../rating/rating.module';

@Component({
  selector: 'rating-test',
  template: ''
})
class TestRatingComponent {
  max = 5;
  rate = 0;
  isReadonly = false;
  titles: [string] = ['one', 'two', 'three', 'four', 'five'];
}

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

    const icons = element.querySelectorAll('span.bs-rating-star');

    expect(icons[0].classList).not.toContain('active');
    expect(icons[4].classList).not.toContain('active');
    expect(icons[4].getAttribute('title')).toEqual('five');
  });

  it('checking of working with changed values', () => {
    context.max = 3;
    context.titles = ['one', 'two', 'new title'];
    context.changeDetection.markForCheck();
    context.ngOnInit();
    fixture.detectChanges();

    const items = element.querySelectorAll('.sr-only');

    expect(items.length).toEqual(3);
    expect(items[0].innerHTML).toEqual('( )');
    expect(items[2].innerHTML).toEqual('( )');
    expect(items[3]).toBeUndefined();

    const icons = element.querySelectorAll('span.bs-rating-star');

    expect(icons[0].classList).not.toContain('active');
    expect(icons[2].getAttribute('title')).toEqual('new title');
  });
});

describe('Component: Rating. Custom template:', () => {
  let fixture: ComponentFixture<TestRatingComponent>;
  let context: any;
  let element: any;

  beforeEach(
    fakeAsync(() => {
      TestBed.configureTestingModule({
        declarations: [TestRatingComponent],
        imports: [RatingModule.forRoot(), FormsModule]
      });
      TestBed.overrideComponent(TestRatingComponent, {
        set: { template: `
        <rating max="5" [customTemplate]="tt" style="font-size: 32px;"></rating>
  <ng-template #tt let-i="index" let-v="value">
    <span class="label label-{{i < v ? 'warning' : 'default'}}">{{i < v ? '&#9733;' : '&#9734;'}}</span>
  </ng-template>` }
      });
      fixture = TestBed.createComponent(TestRatingComponent);
      context = fixture.debugElement.componentInstance;
      element = fixture.nativeElement;
      fixture.detectChanges();
    })
  );

  it('checking of working with custom icons', () => {
    const icons = element.querySelectorAll('span.bs-rating-star');
    expect(icons[0].querySelector('span').classList).toContain('label-default');
  });
});

describe('Component: Rating. Clicks:', () => {
  const tpl = `
      <rating [(ngModel)]="rate" [readonly]="isReadonly"
        (onHover)="hoveringOver($event)" (onLeave)="resetStar($event)"
        [titles]="titles"></rating>
    `;
  let fixture: ComponentFixture<TestRatingComponent>;
  let context: any;
  let element: any;

  beforeEach(
    fakeAsync(() => {
      TestBed.configureTestingModule({
        declarations: [TestRatingComponent],
        imports: [RatingModule.forRoot(), FormsModule]
      });
      TestBed.overrideComponent(TestRatingComponent, {
        set: {template: tpl}
      });
      fixture = TestBed.createComponent(TestRatingComponent);
      context = fixture.debugElement.componentInstance;
      element = fixture.nativeElement;
      fixture.detectChanges();
    })
  );

  it(
    'check simple click',
    fakeAsync(() => {
      const items = element.querySelectorAll('.sr-only');
      const icons = element.querySelectorAll('span.bs-rating-star');

      expect(items[0].innerHTML).toEqual('( )');
      expect(icons[0].classList).not.toContain('active');

      icons[1].click();
      tick(200);
      fixture.detectChanges();

      expect(items[0].innerHTML).toEqual('(*)');
      expect(icons[0].classList).toContain('active');
    })
  );

  it(
    'check disabling',
    fakeAsync(() => {
      const items = element.querySelectorAll('.sr-only');
      const icons = element.querySelectorAll('span.bs-rating-star');

      expect(items[0].innerHTML).toEqual('( )');
      expect(icons[0].classList).not.toContain('active');

      context.isReadonly = true;
      fixture.detectChanges();

      icons[1].click();
      tick(200);
      fixture.detectChanges();

      expect(items[0].innerHTML).toEqual('( )');
      expect(icons[0].classList).not.toContain('active');

      context.isReadonly = false;
      fixture.detectChanges();

      icons[1].click();
      tick(200);
      fixture.detectChanges();

      expect(items[0].innerHTML).toEqual('(*)');
      expect(icons[0].classList).toContain('active');
    })
  );
});

