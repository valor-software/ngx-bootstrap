var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
import { Observable } from 'rxjs/Observable';
import { distinctUntilChanged } from 'rxjs/operator/distinctUntilChanged';
import { map } from 'rxjs/operator/map';
export var MiniStore = (function (_super) {
    __extends(MiniStore, _super);
    function MiniStore(_dispatcher, _reducer, state$) {
        _super.call(this);
        this._dispatcher = _dispatcher;
        this._reducer = _reducer;
        this.source = state$;
    }
    MiniStore.prototype.select = function (pathOrMapFn) {
        var mapped$ = map.call(this, pathOrMapFn);
        return distinctUntilChanged.call(mapped$);
    };
    MiniStore.prototype.lift = function (operator) {
        var store = new MiniStore(this._dispatcher, this._reducer, this);
        store.operator = operator;
        return store;
    };
    MiniStore.prototype.dispatch = function (action) { this._dispatcher.next(action); };
    MiniStore.prototype.next = function (action) { this._dispatcher.next(action); };
    MiniStore.prototype.error = function (err) { this._dispatcher.error(err); };
    MiniStore.prototype.complete = function () { };
    return MiniStore;
}(Observable));
//# sourceMappingURL=store.class.js.map