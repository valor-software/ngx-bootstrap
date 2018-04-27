import { Component, NgModule } from "@angular/core";
import { TestBed, inject, ComponentFixture } from "@angular/core/testing";

import { BsModalService, ModalModule } from "../modal";

@Component({ template: '<div>Dummy Component</div>' })
class DummyComponent {
    constructor(modalService: BsModalService) { }
}

@Component({
    template: '<div>Test Component</div>'
})
class TestModalComponent { }

@NgModule({
    declarations: [TestModalComponent],
    entryComponents: [TestModalComponent]
})
export class TestModule { }

describe('Modal service', () => {
    let fixture: ComponentFixture<DummyComponent>;
    let modalService: BsModalService
    let context: any;
    let element: any;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [DummyComponent],
            providers: [BsModalService,],
            imports: [ModalModule.forRoot(), TestModule]
        });
        fixture = TestBed.createComponent(DummyComponent);
        modalService = fixture.debugElement.injector.get(BsModalService);

        fixture.detectChanges();
    });

    it('should return random id on spin up a new modal', () => {
        modalService.onShown.subscribe((data: any) => {
            expect(data.id).toBeTruthy();
        });

        modalService.show(TestModalComponent);
    });

    it('should return id in config when specified', () => {
        let id = 20;

        modalService.onShown.subscribe((data: any) => {
            expect(data.id).toBe(id);
        });

        modalService.show(TestModalComponent, { id: id });
    });

    it('should return id when hide modal', () => {
        let id = 20;

        modalService.onHidden.subscribe((data: any) => {
            expect(data.id).toBe(id);
        })

        let bsRef = modalService.show(TestModalComponent, { id: id });
        bsRef.hide();
    })
});