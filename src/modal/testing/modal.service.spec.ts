import { Component, NgModule } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { pairwise, tap } from 'rxjs/operators';

import { BsModalService, ModalModule } from '../index';

@Component({ template: '<div>Dummy Component</div>' })
class DummyComponent {
  // eslint-disable-next-line @typescript-eslint/no-empty-function,@typescript-eslint/no-unused-vars
  constructor(modalService: BsModalService) { }
}

@Component({
  template: '<div>Test Component</div>'
})
export class TestModalComponent { }

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
    modalService.onShown.subscribe((data) => {
      expect(data.id).toBeTruthy();
      done();
    });

    modalService.show(TestModalComponent);
  });

  it('should return different random id when open nested modal without specifying id', done => {
    modalService.onShown.pipe(
      pairwise(),
      tap(([firstData, secondData]) => {
        expect(firstData.id).not.toBe(secondData.id);
        done();
      })
    ).subscribe();

    modalService.show(TestModalComponent);
    modalService.show(TestModalComponent);
  });

  it('should return id in config when specified', done => {
    const id = 20;

    modalService.onShown.subscribe((data) => {
      expect(data.id).toBe(id);
      done();
    });

    modalService.show(TestModalComponent, { id });
  });

  it('should return id when hide modal', done => {
    const id = 20;
    jest.useFakeTimers();

    modalService.onHidden.subscribe((data) => {
      expect(data.id).toBe(id);
      done();
    });

    const bsRef = modalService.show(TestModalComponent, { id });
    bsRef.hide();

    jest.runAllTimers();
  });

  it('should hide modal even if invoked right after show', () => {
    const id = 25;
    jest.useFakeTimers();

    const bsRef = modalService.show(TestModalComponent, { id });
    expect(modalService.getModalsCount()).toBe(1);
    bsRef.hide();

    jest.runAllTimers();
    expect(modalService.getModalsCount()).toBe(0);
  });

  it('should emit onHide after hide is invoked', done => {
    const id = 25;
    const onHideSpy = jest.spyOn(modalService.onHide, 'emit');
    jest.useFakeTimers();

    modalService.onHide.subscribe((data) => {
      expect(data.id).toBe(id);
      done();
    });

    const bsRef = modalService.show(TestModalComponent, { id });
    bsRef.hide();

    jest.runAllTimers();
    expect(onHideSpy).toHaveBeenCalled();
  });

  it('should emit (id) onHidden after hide is invoked', done => {
    const id = 25;
    const onHiddenSpy = jest.spyOn(modalService.onHidden, 'emit');
    jest.useFakeTimers();

    modalService.onHidden.subscribe((data) => {
      expect(data.id).toBe(id);
      done();
    });

    const bsRef = modalService.show(TestModalComponent, { id });
    bsRef.hide();

    jest.runAllTimers();
    expect(onHiddenSpy).toHaveBeenCalledWith({ id });
  });
});
