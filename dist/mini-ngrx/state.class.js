var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { observeOn } from 'rxjs/operator/observeOn';
import { queue } from 'rxjs/scheduler/queue';
import { scan } from 'rxjs/operator/scan';
export var MiniState = (function (_super) {
    __extends(MiniState, _super);
    function MiniState(_initialState, actionsDispatcher$, reducer) {
        var _this = this;
        _super.call(this, _initialState);
        var actionInQueue$ = observeOn.call(actionsDispatcher$, queue);
        var state$ = scan.call(actionInQueue$, function (state, action) {
            if (!action) {
                return state;
            }
            return reducer(state, action);
        }, _initialState);
        state$.subscribe(function (value) { return _this.next(value); });
    }
    return MiniState;
}(BehaviorSubject));
//# sourceMappingURL=state.class.js.map