var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
import { Injectable } from '@angular/core';
import { timepickerReducer, initialState } from './timepicker.reducer';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { MiniStore } from '../../mini-ngrx/store.class';
import { MiniState } from '../../mini-ngrx/state.class';
export var TimepickerStore = (function (_super) {
    __extends(TimepickerStore, _super);
    function TimepickerStore() {
        var _dispatcher = new BehaviorSubject({ type: '[mini-ngrx] dispatcher init' });
        var state = new MiniState(initialState, _dispatcher, timepickerReducer);
        _super.call(this, _dispatcher, timepickerReducer, state);
    }
    TimepickerStore.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    TimepickerStore.ctorParameters = function () { return []; };
    return TimepickerStore;
}(MiniStore));
//# sourceMappingURL=timepicker.store.js.map