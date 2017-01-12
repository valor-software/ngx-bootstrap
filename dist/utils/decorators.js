"use strict";
/*tslint:disable:no-invalid-this */
function OnChange(defaultValue) {
    var sufix = 'Change';
    return function OnChangeHandler(target, propertyKey) {
        var _key = " __" + propertyKey + "Value";
        Object.defineProperty(target, propertyKey, {
            get: function () { return this[_key]; },
            set: function (value) {
                this[_key] = value;
                this[propertyKey + sufix].emit(value);
            }
        });
    };
}
exports.OnChange = OnChange;
