import moment from 'moment';
export var DateFormatter = (function () {
    function DateFormatter() {
    }
    DateFormatter.prototype.format = function (date, format, locale) {
        moment.locale(locale);
        return moment(date.getTime()).format(format);
    };
    return DateFormatter;
}());
//# sourceMappingURL=date-formatter.js.map