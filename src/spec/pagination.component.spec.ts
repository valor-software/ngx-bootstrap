import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick
} from '@angular/core/testing';
import { PaginationModule } from '../pagination/pagination.module';
import { PaginationComponent } from '../pagination/pagination.component';

describe('Component: Pagination:', () => {
  let fixture: ComponentFixture<PaginationComponent>;
  let context: any;
  let element: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PaginationModule.forRoot()]
    });
    fixture = TestBed.createComponent(PaginationComponent);
    context = fixture.debugElement.componentInstance;
    element = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('checking of working with default values', () => {
    const listItems = element.querySelectorAll('li');
    const links = element.querySelectorAll('a');

    context.disabled = true;
    fixture.detectChanges();

    // <~Previous~> _1_ <~Next~>
    expect(listItems.length).toEqual(3);
    expect(listItems[0].classList).toContain('disabled');
    expect(listItems[2].classList).toContain('disabled');

    expect(links[0].innerHTML).toEqual('Previous');
    expect(links[1].innerHTML).toEqual('1');
    expect(links[2].innerHTML).toEqual('Next');

    expect(context._totalPages).toEqual(1);
  });

  it('checking of working with custom values(several pages)', () => {
    context.totalItems = 10;
    context.itemsPerPage = 4;
    context.previousText = 'Prev';
    context.nextText = 'New next';
    context.align = true;

    context.ngOnInit();
    fixture.detectChanges();

    const listItems = element.querySelectorAll('li');
    const links = element.querySelectorAll('a');

    // <~Prev~> _1_ 2 3 <New next>
    expect(listItems[0].classList).toContain('disabled');
    expect(listItems[0].classList).toContain('pagination-prev');
    expect(listItems[2].classList).toContain('pagination-page');
    expect(listItems[4].classList).not.toContain('disabled');
    expect(listItems[4].classList).toContain('pagination-next');

    expect(links[0].innerHTML).toEqual('Prev');
    expect(links[2].innerHTML).toEqual('2');
    expect(links[4].innerHTML).toEqual('New next');

    expect(context._totalPages).toEqual(3);
  });

  it('checking of working with custom values(many pages)', () => {
    context.totalItems = 30;
    context.itemsPerPage = 4;

    context.ngOnInit();
    fixture.detectChanges();

    let listItems = element.querySelectorAll('li');
    let links = element.querySelectorAll('a');

    // <~Previous~> _1_ 2 3 4 5 6 7 8 <Next>
    expect(listItems[0].classList).toContain('disabled');
    expect(listItems[1].classList).toContain('active');
    expect(listItems[9].classList).not.toContain('disabled');
    expect(listItems.length).toEqual(10);
    expect(context._totalPages).toEqual(8);

    expect(links[0].innerHTML).toEqual('Previous');
    expect(links[1].innerHTML).toEqual('1');
    expect(links[8].innerHTML).toEqual('8');
    expect(links[9].innerHTML).toEqual('Next');

    context.maxSize = 3;

    context.ngOnInit();
    fixture.detectChanges();

    listItems = element.querySelectorAll('li');
    links = element.querySelectorAll('a');

    // <~Previous~> _1_ 2 3 <Next>
    expect(listItems[0].classList).toContain('disabled');
    expect(listItems[1].classList).toContain('active');
    expect(listItems[4].classList).not.toContain('disabled');

    // total number of pages should be unchanged
    expect(context._totalPages).toEqual(8);

    expect(links[0].innerHTML).toEqual('Previous');
    expect(links[1].innerHTML).toEqual('1');
    expect(links[3].innerHTML).toEqual('3');
    expect(links[4].innerHTML).toEqual('Next');

    expect(context._page).toEqual(1);
    expect(listItems.length).toEqual(5);
  });

  it(
    'check clicks(many page links)',
    fakeAsync(() => {
      context.totalItems = 30;
      context.itemsPerPage = 4;

      context.ngOnInit();
      fixture.detectChanges();

      let listItems = element.querySelectorAll('li');
      let links = element.querySelectorAll('a');

      expect(listItems[0].classList).toContain('disabled');
      expect(listItems[1].classList).toContain('active');

      // <Previous> 1 2 3 4 _5_ 6 7 8 <Next>
      links[5].click();
      tick(200);
      fixture.detectChanges();

      listItems = element.querySelectorAll('li');
      links = element.querySelectorAll('a');

      expect(listItems[0].classList).not.toContain('disabled');
      expect(listItems[1].classList).not.toContain('active');
      expect(listItems[5].classList).toContain('active');

      expect(context._page).toEqual(5);

      // <Previous> 1 2 3 4 5 6 7 _8_ <~Next~>
      links[8].click();
      tick(200);
      fixture.detectChanges();

      listItems = element.querySelectorAll('li');

      expect(listItems[9].classList).toContain('disabled');
      expect(listItems[0].classList).not.toContain('disabled');
      expect(listItems[1].classList).not.toContain('active');
      expect(listItems[8].classList).toContain('active');

      expect(context._page).toEqual(8);
      expect(context._totalPages).toEqual(8);
    })
  );

  it(
    'check clicks(several page links)',
    fakeAsync(() => {
      context.totalItems = 30;
      context.itemsPerPage = 4;
      context.maxSize = 3;

      context.ngOnInit();
      fixture.detectChanges();

      let listItems = element.querySelectorAll('li');
      let links = element.querySelectorAll('a');

      // <~Previous~> _1_ 2 3 <Next>

      expect(listItems[0].classList).toContain('disabled');
      expect(listItems[1].classList).toContain('active');
      expect(listItems.length).toEqual(5);

      expect(context._page).toEqual(1);

      links[3].click();
      tick(200);
      fixture.detectChanges();
      //
      listItems = element.querySelectorAll('li');
      links = element.querySelectorAll('a');

      // <Previous> 2 _3_ 4 <Next>
      expect(listItems[0].classList).not.toContain('disabled');
      expect(listItems[1].classList).not.toContain('active');
      expect(listItems[2].classList).toContain('active');
      expect(listItems[4].classList).not.toContain('disabled');

      expect(context._page).toEqual(3);
      expect(links[1].innerHTML).toEqual('2');
      expect(context._totalPages).toEqual(8);
    })
  );

  it(
    'check clicks(boundary links)',
    fakeAsync(() => {
      context.totalItems = 30;
      context.itemsPerPage = 4;
      context.maxSize = 5;
      context.boundaryLinks = true;

      context.ngOnInit();
      fixture.detectChanges();

      let listItems = element.querySelectorAll('li');
      const links = element.querySelectorAll('a');

      // <~First~> <~Previous~> _1_ 2 3 4 5 <Next> <Last>
      expect(listItems[0].classList).toContain('disabled');
      expect(listItems[1].classList).toContain('disabled');
      expect(listItems[7].classList).not.toContain('disabled');
      expect(listItems[8].classList).not.toContain('disabled');
      expect(listItems[2].classList).toContain('active');
      expect(listItems.length).toEqual(9);
      expect(context._page).toEqual(1);

      expect(links[2].innerHTML).toEqual('1');
      expect(links[6].innerHTML).toEqual('5');

      links[0].click();
      tick(200);
      fixture.detectChanges();

      // Click to disabled "First" link -> page should'nt change
      expect(context._page).toEqual(1);

      links[8].click();
      tick(200);
      fixture.detectChanges();

      listItems = element.querySelectorAll('li');

      // <First> <Previous> 4 5 6 7 _8_ <~Next~> <~Last~>
      expect(context._page).toEqual(8);
      expect(listItems[0].classList).not.toContain('disabled');
      expect(listItems[1].classList).not.toContain('disabled');
      expect(listItems[6].classList).toContain('active');
      expect(listItems[7].classList).toContain('disabled');
      expect(listItems[8].classList).toContain('disabled');
      expect(context._totalPages).toEqual(8);
    })
  );
});
