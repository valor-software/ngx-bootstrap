import {it, beforeEach, inject, async} from '@angular/core/testing';
import { TestComponentBuilder, ComponentFixture } from '@angular/core/testing';
import {AlertComponent} from './alert.component';

describe('Component: Alert', () => {
    let fixture:ComponentFixture<any>;
    let context:any;
    const overTemplate = `
                  <div class="alert" role="alert" [ngClass]="classes" *ngIf="!closed">
                    <button *ngIf="dismissible" type="button" class="close" (click)="onClose()" (touch)="onClose()">
                        <span aria-hidden="true">&times;</span>
                        <span class="sr-only">Close</span>
                    </button>
                  </div>
            `;

    beforeEach(async(inject([TestComponentBuilder], (tcb:TestComponentBuilder) => {
        return tcb
            .overrideTemplate(AlertComponent, overTemplate)
            .createAsync(AlertComponent)
            .then((f:ComponentFixture<any>) => {
                fixture = f;
                context = fixture.debugElement.componentInstance;
            });
    })));

    it('should have a default type alert-warning', () => {
        context.ngOnInit();
        expect(context.type).toEqual(`warning`);
        expect(context.classes[0]).toEqual(`alert-warning`);
    });

    it('should have class dismissible if dismissible=true', () => {
        context.dismissible = true;
        context.ngOnInit();
        expect(context.classes.length).toEqual(2);
        expect(context.classes[1]).toEqual(`alert-dismissible`);
    });

    it('should be dismissed by timeout', (done:() => void) => {
        context.dismissOnTimeout = 1000;
        context
            .close
            .subscribe(() => {
                expect(context.closed).toBeTruthy();
                done();
            });
        context.ngOnInit();
    });

    it('should be closed by public method onClose', () => {
        context.ngOnInit();
        expect(context.closed).toBeFalsy();
        context.onClose();
        expect(context.closed).toBeTruthy();
    });
});
