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

  it('should return random id on spin up a new modal', () => {
    modalService.onShown.subscribe((data) => {
      expect(data.id).toBeTruthy();
    });

    modalService.show(TestModalComponent);
  });

  it('should return different random id when open nested modal without specifying id', () => {
    modalService.onShown.pipe(
      pairwise(),
      tap(([firstData, secondData]) => {
        expect(firstData.id).not.toBe(secondData.id);
      })
    ).subscribe();

    modalService.show(TestModalComponent);
    modalService.show(TestModalComponent);
  });

  it('should return id in config when specified', () => {
    const id = 20;

    modalService.onShown.subscribe((data) => {
      expect(data.id).toBe(id);
    });

    modalService.show(TestModalComponent, { id });
  });

  it('should return id when hide modal', () => {
    const id = 20;
    jest.useFakeTimers();

    modalService.onHidden.subscribe((data) => {
      expect(data.id).toBe(id);
    });

    const bsRef = modalService.show(TestModalComponent, { id });
    bsRef.hide();

    jest.runAllTimers();
  });

  it('should hide modal even if invoked right after show', () => {
    const id = 25;
    const onHideSpy = jest.spyOn(modalService.onHide, 'emit');
    const onHiddenSpy = jest.spyOn(modalService.onHidden, 'emit');
    jest.useFakeTimers();

    modalService.onHidden.subscribe((data) => {
      expect(data.id).toBe(id);
    });

    modalService.onHide.subscribe((data) => {
      expect(data.id).toBe(id);
    });

    const bsRef = modalService.show(TestModalComponent, { id });
    bsRef.hide();

    jest.runAllTimers();
    expect(onHideSpy).toHaveBeenCalled();
    expect(onHiddenSpy).toHaveBeenCalledWith({ id });
  });
});
