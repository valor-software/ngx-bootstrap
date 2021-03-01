import { Component, NgModule } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';

import { BsModalService, ModalModule } from '../index';
import { MODAL_CONFIG_DEFAULT_OVERRIDE } from '../modal-options.class';

@Component({ template: '<div>Dummy Component</div>' })
class DummyComponent {
  // eslint-disable-next-line @typescript-eslint/no-empty-function,@typescript-eslint/no-unused-vars
  constructor(modalService: BsModalService) {}
}

@Component({
  template: '<div>Test Component</div>'
})
class TestModalComponent {}

@NgModule({
  declarations: [TestModalComponent],
  providers: [{ provide: MODAL_CONFIG_DEFAULT_OVERRIDE, useValue: { ignoreBackdropClick: true, keyboard: false } }],
  entryComponents: [TestModalComponent]
})
export class TestModule {}

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

  it('should replace modal setting by default', () => {
    expect(modalService.config.ignoreBackdropClick).toBeTruthy();
  });

  it('should be able to replace module defined default config on show', () => {
    modalService.show(TestModalComponent, { ignoreBackdropClick: false });

    expect(modalService.config.ignoreBackdropClick).toBeFalsy();
  });
});
