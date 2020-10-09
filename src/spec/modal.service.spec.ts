import { Component, NgModule } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';

import { BsModalService, ModalModule } from '../modal';
import { pairwise, tap } from 'rxjs/operators';

/* tslint:disable-next-line: max-classes-per-file */
@Component({ template: '<div>Dummy Component</div>' })
class DummyComponent {
/* tslint:disable-next-line: no-empty */
    constructor(modalService: BsModalService) { }
}

/* tslint:disable-next-line: max-classes-per-file */
@Component({
    template: '<div>Test Component</div>'
})
class TestModalComponent { }

/* tslint:disable-next-line: max-classes-per-file */
@NgModule({
    declarations: [TestModalComponent],
    entryComponents: [TestModalComponent]
})
export class TestModule { }

describe('Modal service', () => {
  let fixture: ComponentFixture<DummyComponent>;
  let modalService: BsModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DummyComponent],
      providers: [BsModalService],
      imports: [ModalModule.forRoot(), TestModule]
    });
    fixture = TestBed.createComponent(DummyComponent);
    modalService = fixture.debugElement.injector.get(BsModalService);

    fixture.detectChanges();
  });

  it('should return random id on spin up a new modal', done => {
    modalService.onShown.subscribe((data: any) => {
      /* tslint:disable-next-line: no-floating-promises */
      expect(data.id).toBeTruthy();
      done();
    });

    modalService.show(TestModalComponent);
  });

  it('should return different random id when open nested modal without specifying id', done => {
    modalService.onShown.pipe(
      pairwise(),
      tap(([firstData, secondData]) => {
        /* tslint:disable-next-line: no-floating-promises */
        expect(firstData.id).not.toBe(secondData.id);
        done();
      })
    ).subscribe();

    modalService.show(TestModalComponent);
    modalService.show(TestModalComponent);
  });

  it('should return id in config when specified', done => {
    const id = 20;

    modalService.onShown.subscribe((data: any) => {
      /* tslint:disable-next-line: no-floating-promises */
      expect(data.id).toBe(id);
      done();
    });

    modalService.show(TestModalComponent, { id });
  });

  it('should return id when hide modal', () => {
    const id = 20;

    modalService.onHidden.subscribe((data: any) => {
      /* tslint:disable-next-line: no-floating-promises */
      expect(data.id).toBe(id);
    });

    const bsRef = modalService.show(TestModalComponent, { id });
    bsRef.hide();
  });
});
