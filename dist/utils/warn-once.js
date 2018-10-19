import { isDevMode } from '@angular/core';
var _messagesHash = {};
var _hideMsg = typeof console === 'undefined' || !('warn' in console);
export function warnOnce(msg) {
    if (!isDevMode() || _hideMsg || msg in _messagesHash) {
        return;
    }
    _messagesHash[msg] = true;
    /*tslint:disable-next-line*/
    console.warn(msg);
}
//# sourceMappingURL=warn-once.js.map