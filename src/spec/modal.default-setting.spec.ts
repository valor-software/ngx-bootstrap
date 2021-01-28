import { Component, NgModule } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';

import { BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { MODAL_CONFIG_DEFAULT_OVERRIDE } from '../modal/modal-options.class';

/* tslint:disable-next-line: max-classes-per-file */
@Component({ template: '<div>Dummy Component</div>' })
class DummyComponent {
  /* tslint:disable-next-line: no-empty */
  constructor(modalService: BsModalService) {}
}

/* tslint:disable-next-line: max-classes-per-file */
@Component({
  template: '<div>Test Component</div>'
})
class TestModalComponent {}

/* tslint:disable-next-line: max-classes-per-file */
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
    /* tslint:disable-next-line: no-floating-promises */
    expect(modalService.config.ignoreBackdropClick).toBeFalsy();
  });

  it('should be able to replace module defined default config on show', () => {
    modalService.show(TestModalComponent, { ignoreBackdropClick: false });

    /* tslint:disable-next-line: no-floating-promises */
    expect(modalService.config.ignoreBackdropClick).toBeFalsy();
  });
});
