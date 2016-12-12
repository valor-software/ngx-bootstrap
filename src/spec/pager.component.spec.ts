import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { PagerComponent } from '../pagination/pager.component';
import { PaginationModule } from '../pagination/pagination.module';
const { fireEvent } = require('../../scripts/helpers');

describe('Component: Pager:', () => {

  let fixture: ComponentFixture<PagerComponent>;
  let context: any;
  let element: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PaginationModule]
    });
    fixture = TestBed.createComponent(PagerComponent);
    context = fixture.debugElement.componentInstance;

    element = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('checking of working with default values', () => {
    const listItems = element.querySelectorAll('li');

    expect(listItems.length).toEqual(2);
    expect(listItems[0].classList).toContain('disabled');
    expect(listItems[1].classList).toContain('disabled');

    const links = element.querySelectorAll('a');

    expect(links[0].innerHTML).toEqual('« Previous');
    expect(links[1].innerHTML).toEqual('Next »');

    expect(context._totalPages).toEqual(1);
  });

  it('checking of working with custom values', () => {
    context.totalItems = 10;
    context.itemsPerPage = 4;
    context.previousText = 'Prev';
    context.nextText = 'New next';
    context.pageBtnClass = 'btn';
    context.align = true;

    context.ngOnInit();
    fixture.detectChanges();

    const listItems = element.querySelectorAll('li');

    expect(listItems[0].classList).toContain('disabled');
    expect(listItems[0].classList).toContain('pull-right');
    expect(listItems[0].classList).toContain('previous');
    expect(listItems[0].classList).toContain('btn');
    expect(listItems[1].classList).not.toContain('disabled');
    expect(listItems[1].classList).toContain('pull-right');
    expect(listItems[1].classList).toContain('next');
    expect(listItems[1].classList).toContain('btn');

    const links = element.querySelectorAll('a');

    expect(links[0].innerHTML).toEqual('Prev');
    expect(links[1].innerHTML).toEqual('New next');

    expect(context._totalPages).toEqual(3);
  });

  it('check NgModel through click', fakeAsync(() => {

    context.totalItems = 10;
    context.itemsPerPage = 4;
    fixture.detectChanges();

    const links = element.querySelectorAll('a');
    const listItems = element.querySelectorAll('li');

    expect(listItems[0].classList).toContain('disabled');
    expect(listItems[1].classList).not.toContain('disabled');
    expect(context._page).toEqual(1);

    links[1].click();
    tick(200);
    fixture.detectChanges();

    expect(listItems[0].classList).not.toContain('disabled');
    expect(listItems[1].classList).not.toContain('disabled');
    expect(context._page).toEqual(2);

    links[1].click();
    tick(200);
    fixture.detectChanges();

    expect(listItems[0].classList).not.toContain('disabled');
    expect(listItems[1].classList).toContain('disabled');
    expect(context._page).toEqual(3);

    expect(context._totalPages).toEqual(3);
  }));

  it('check NgModel through event', () => {

    context.totalItems = 10;
    context.itemsPerPage = 4;
    fixture.detectChanges();

    const listItems = element.querySelectorAll('li');

    expect(listItems[0].classList).toContain('disabled');
    expect(listItems[1].classList).not.toContain('disabled');

    context.page = 2;
    fixture.detectChanges();
    fireEvent(element, 'input');
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(listItems[0].classList).not.toContain('disabled');
      expect(listItems[1].classList).not.toContain('disabled');
      expect(context._page).toEqual(2);

      expect(context._totalPages).toEqual(3);
    });
  });
});
