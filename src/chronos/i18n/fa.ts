/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// tslint:disable:comment-format binary-expression-operand-order max-line-length
//! moment.js locale configuration
//! locale : Persian [fa]
//! author : Abdel Said: https://github.com/mhkaram97
//! author : Mohammad Hossein Karami
//! author : forabi https://github.com/mhkaram97
/** @type {?} */
var symbolMap = {
    1: '١',
    2: '٢',
    3: '٣',
    4: '٤',
    5: '٥',
    6: '٦',
    7: '٧',
    8: '٨',
    9: '٩',
    0: '٠'
};
/** @type {?} */
var numberMap = {
    '١': '1',
    '٢': '2',
    '٣': '3',
    '٤': '4',
    '٥': '5',
    '٦': '6',
    '٧': '7',
    '٨': '8',
    '٩': '9',
    '٠': '0'
};
/** @type {?} */
var pluralForm = (/**
 * @param {?} num
 * @return {?}
 */
function (num) {
    return num === 0 ? 0 : num === 1 ? 1 : num === 2 ? 2 : num % 100 >= 3 && num % 100 <= 10 ? 3 : num % 100 >= 11 ? 4 : 5;
});
var ɵ0 = pluralForm;
/** @type {?} */
var plurals = {
    s: ['کمتر از یک ثانیه', 'یک ثانیه', ['دو ثانیه', 'دو ثانیه'], '%d ثانیه', '%d ثانیه', '%d ثانیه'],
    m: ['کمتر از یک دقیقه', 'یک دقیقه', ['دو دقیقه', 'دو دقیقه'], '%d دقیقه', '%d دقیقه', '%d دقیقه'],
    h: ['کمتر از یک ساعت', 'یک ساعت', ['دو ساعت', 'دو ساعت'], '%d ساعت', '%d ساعت', '%d ساعت'],
    d: ['کمتر از یک روز', 'یک روز', ['دو روز', 'دو روز'], '%d روز', '%d روز', '%d روز'],
    M: ['کمتر از یک ماه', 'یک ماه', ['دو ماه', 'دو ماه'], '%d ماه', '%d ماه', '%d ماه'],
    y: ['کمتر از یک سال', 'یک سال', ['دو سال', 'دو سال'], '%d سال', '%d سال', '%d سال']
};
/** @type {?} */
var pluralize = (/**
 * @param {?} u
 * @return {?}
 */
function (u) {
    return (/**
     * @param {?} num
     * @param {?} withoutSuffix
     * @return {?}
     */
    function (num, withoutSuffix) {
        /** @type {?} */
        var f = pluralForm(num);
        /** @type {?} */
        var str = plurals[u][pluralForm(num)];
        if (f === 2) {
            str = str[withoutSuffix ? 0 : 1];
        }
        return ((/** @type {?} */ (str))).replace(/%d/i, num.toString());
    });
});
var ɵ1 = pluralize;
/** @type {?} */
var months = [
    'ژانویه',
    'فوریه',
    'مارس',
    'آوریل',
    'می',
    'ژوئن',
    'جولای',
    'آگوست',
    'سپتامبر',
    'اکتبر',
    'نوامبر',
    'دسامبر'
];
/** @type {?} */
export var faLocale = {
    abbr: 'fa',
    months: months,
    monthsShort: months,
    weekdays: 'یکشنبه_دوشنبه_سه شنبه_چهارشنبه_پنج شنبه_جمعه_شنبه'.split('_'),
    weekdaysShort: 'یکشنبه_دو‌شنبه_سه‌شنبه_چهار‌شنبه_پنج‌شنبه_جمعه_شنبه'.split('_'),
    weekdaysMin: 'ی_د_س_چ_پ_ج_ش'.split('_'),
    weekdaysParseExact: true,
    longDateFormat: {
        LT: 'HH:mm',
        LTS: 'HH:mm:ss',
        L: 'D/\u200FM/\u200FYYYY',
        LL: 'D MMMM YYYY',
        LLL: 'D MMMM YYYY HH:mm',
        LLLL: 'dddd D MMMM YYYY HH:mm'
    },
    meridiemParse: /ص|م/,
    isPM: /**
     * @param {?} input
     * @return {?}
     */
    function (input) {
        return 'م' === input;
    },
    meridiem: /**
     * @param {?} hour
     * @param {?} minute
     * @param {?} isLower
     * @return {?}
     */
    function (hour, minute, isLower) {
        if (hour < 12) {
            return 'ص';
        }
        else {
            return 'م';
        }
    },
    calendar: {
        sameDay: '[امروز در ساعت] LT',
        nextDay: '[فردا در ساعت] LT',
        nextWeek: 'dddd [در ساعت] LT',
        lastDay: '[دیروز در ساعت] LT',
        lastWeek: 'dddd [در ساعت] LT',
        sameElse: 'L'
    },
    relativeTime: {
        future: 'بعد %s',
        past: 'پیش %s',
        s: pluralize('s'),
        ss: pluralize('s'),
        m: pluralize('m'),
        mm: pluralize('m'),
        h: pluralize('h'),
        hh: pluralize('h'),
        d: pluralize('d'),
        dd: pluralize('d'),
        M: pluralize('M'),
        MM: pluralize('M'),
        y: pluralize('y'),
        yy: pluralize('y')
    },
    preparse: /**
     * @param {?} str
     * @return {?}
     */
    function (str) {
        return str.replace(/[١٢٣٤٥٦٧٨٩٠]/g, (/**
         * @param {?} match
         * @return {?}
         */
        function (match) {
            return numberMap[match];
        })).replace(/،/g, ',');
    },
    postformat: /**
     * @param {?} str
     * @return {?}
     */
    function (str) {
        return str.replace(/\d/g, (/**
         * @param {?} match
         * @return {?}
         */
        function (match) {
            return symbolMap[match];
        })).replace(/,/g, '،');
    },
    week: {
        dow: 6, // Saturday is the first day of the week.
        doy: 12 // The week that contains Jan 1st is the first week of the year.
    }
};
export { ɵ0, ɵ1 };






//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjoxLCJmaWxlIjoiZmEuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtYm9vdHN0cmFwL2Nocm9ub3MvIiwic291cmNlcyI6WyJpMThuL2ZhLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0lBVU0sU0FBUyxHQUE0QjtJQUN6QyxDQUFDLEVBQUUsR0FBRztJQUNOLENBQUMsRUFBRSxHQUFHO0lBQ04sQ0FBQyxFQUFFLEdBQUc7SUFDTixDQUFDLEVBQUUsR0FBRztJQUNOLENBQUMsRUFBRSxHQUFHO0lBQ04sQ0FBQyxFQUFFLEdBQUc7SUFDTixDQUFDLEVBQUUsR0FBRztJQUNOLENBQUMsRUFBRSxHQUFHO0lBQ04sQ0FBQyxFQUFFLEdBQUc7SUFDTixDQUFDLEVBQUUsR0FBRztDQUNQOztJQUNLLFNBQVMsR0FBNEI7SUFDekMsR0FBRyxFQUFFLEdBQUc7SUFDUixHQUFHLEVBQUUsR0FBRztJQUNSLEdBQUcsRUFBRSxHQUFHO0lBQ1IsR0FBRyxFQUFFLEdBQUc7SUFDUixHQUFHLEVBQUUsR0FBRztJQUNSLEdBQUcsRUFBRSxHQUFHO0lBQ1IsR0FBRyxFQUFFLEdBQUc7SUFDUixHQUFHLEVBQUUsR0FBRztJQUNSLEdBQUcsRUFBRSxHQUFHO0lBQ1IsR0FBRyxFQUFFLEdBQUc7Q0FDVDs7SUFDSyxVQUFVOzs7O0FBQUcsVUFBVSxHQUFXO0lBQ3RDLE9BQU8sR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLElBQUksR0FBRyxHQUFHLEdBQUcsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLEdBQUcsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMs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VyxHQUFXO1FBQ3BCLE9BQU8sR0FBRyxDQUFDLE9BQU8sQ0FBQyxLQUFLOzs7O1FBQUUsVUFBVSxLQUFLO1lBQ3ZDLE9BQU8sU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzFCLENBQUMsRUFBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDeEIsQ0FBQztJQUNELElBQUksRUFBRTtRQUNKLEdBQUcsRUFBRSxDQUFDOztRQUNOLEdBQUcsRUFBRSxFQUFFLENBQUUsZ0VBQWdFO0tBQzFFO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvLyB0c2xpbnQ6ZGlzYWJsZTpjb21tZW50LWZvcm1hdCBiaW5hcnktZXhwcmVzc2lvbi1vcGVyYW5kLW9yZGVyIG1heC1saW5lLWxlbmd0aFxuXG4vLyEgbW9tZW50LmpzIGxvY2FsZSBjb25maWd1cmF0aW9uXG4vLyEgbG9jYWxlIDogUGVyc2lhbiBbZmFdXG4vLyEgYXV0aG9yIDogTW9oYW1tYWQgSG9zc2VpbiBLYXJhbWk6IGh0dHBzOi8vZ2l0aHViLmNvbS9taGthcmFtaTk3XG4vLyEgYXV0aG9yIDptaGthcmFtaTk3XG4vLyEgYXV0aG9yIDogbWhrYXJhbWk5NyBodHRwczovL2dpdGh1Yi5jb20vbWhrYXJhbWk5N1xuXG5pbXBvcnQgeyBMb2NhbGVEYXRhIH0gZnJvbSAnLi4vbG9jYWxlL2xvY2FsZS5jbGFzcyc7XG5cbmNvbnN0IHN5bWJvbE1hcDoge1trZXk6IHN0cmluZ106IHN0cmluZ30gPSB7XG4gIDE6ICfZoScsXG4gIDI6ICfZoicsXG4gIDM6ICfZoycsXG4gIDQ6ICfZpCcsXG4gIDU6ICfZpScsXG4gIDY6ICfZpicsXG4gIDc6ICfZpycsXG4gIDg6ICfZqCcsXG4gIDk6ICfZqScsXG4gIDA6ICfZoCdcbn07XG5jb25zdCBudW1iZXJNYXA6IHtba2V5OiBzdHJpbmddOiBzdHJpbmd9ID0ge1xuICAn2aEnOiAnMScsXG4gICfZoic6ICcyJyxcbiAgJ9mjJzogJzMnLFxuICAn2aQnOiAnNCcsXG4gICfZpSc6ICc1JyxcbiAgJ9mmJzogJzYnLFxuICAn2acnOiAnNycsXG4gICfZqCc6ICc4JyxcbiAgJ9mpJzogJzknLFxuICAn2aAnOiAnMCdcbn07XG5jb25zdCBwbHVyYWxGb3JtID0gZnVuY3Rpb24gKG51bTogbnVtYmVyKTogbnVtYmVyIHtcbiAgcmV0dXJuIG51bSA9PT0gMCA/IDAgOiBudW0gPT09IDEgPyAxIDogbnVtID09PSAyID8gMiA6IG51bSAlIDEwMCA+PSAzICYmIG51bSAlIDEwMCA8PSAxMCA/IDMgOiBudW0gJSAxMDAgPj0gMTEgPyA0IDogNTtcbn07XG5jb25zdCBwbHVyYWxzOiB7W2tleTogc3RyaW5nXTogW3N0cmluZywgc3RyaW5nLCBbc3RyaW5nLCBzdHJpbmddLCBzdHJpbmcsIHN0cmluZywgc3RyaW5nXX0gPSB7XG4gIHM6IFsn2qnZhdiq2LEg2KfYsiDbjNqpINir2KfZhtuM2YcnLCAn24zaqSDYq9in2YbbjNmHJywgWyfYr9mIINir2KfZhtuM2YcnLCAn2K/ZiCDYq9in2YbbjNmHJ10sICclZCDYq9in2YbbjNmHJywgJyVkINir2KfZhtuM2YcnLCAnJWQg2KvYp9mG24zZhyddLFxuICBtOiBbJ9qp2YXYqtixINin2LIg24zaqSDYr9mC24zZgtmHJywgJ9uM2qkg2K/ZgtuM2YLZhycsIFsn2K/ZiCDYr9mC24zZgtmHJywgJ9iv2Ygg2K/ZgtuM2YLZhyddLCAnJWQg2K/ZgtuM2YLZhycsICclZCDYr9mC24zZgtmHJywgJyVkINiv2YLbjNmC2YcnXSxcbiAgaDogWyfaqdmF2KrYsSDYp9iyINuM2qkg2LPYp9i52KonLCAn24zaqSDYs9in2LnYqicsIFsn2K/ZiCDYs9in2LnYqicsICfYr9mIINiz2KfYudiqJ10sICclZCDYs9in2LnYqicsICclZCDYs9in2LnYqicsICclZCDYs9in2LnYqiddLFxuICBkOiBbJ9qp2YXYqtixINin2LIg24zaqSDYsdmI2LInLCAn24zaqSDYsdmI2LInLCBbJ9iv2Ygg2LHZiNiyJywgJ9iv2Ygg2LHZiNiyJ10sICclZCDYsdmI2LInLCAnJWQg2LHZiNiyJywgJyVkINix2YjYsiddLFxuICBNOiBbJ9qp2YXYqtixINin2LIg24zaqSDZhdin2YcnLCAn24zaqSDZhdin2YcnLCBbJ9iv2Ygg2YXYp9mHJywgJ9iv2Ygg2YXYp9mHJ10sICclZCDZhdin2YcnLCAnJWQg2YXYp9mHJywgJyVkINmF2KfZhyddLFxuICB5OiBbJ9qp2YXYqtixINin2LIg24zaqSDYs9in2YQnLCAn24zaqSDYs9in2YQnLCBbJ9iv2Ygg2LPYp9mEJywgJ9iv2Ygg2LPYp9mEJ10sICclZCDYs9in2YQnLCAnJWQg2LPYp9mEJywgJyVkINiz2KfZhCddXG59O1xuY29uc3QgcGx1cmFsaXplID0gZnVuY3Rpb24gKHU6IHN0cmluZykge1xuICByZXR1cm4gZnVuY3Rpb24gKG51bTogbnVtYmVyLCB3aXRob3V0U3VmZml4OiBib29sZWFuKTogc3RyaW5nIHtcbiAgICBjb25zdCBmID0gcGx1cmFsRm9ybShudW0pO1xuICAgIGxldCBzdHIgPSBwbHVyYWxzW3VdW3BsdXJhbEZvcm0obnVtKV07XG4gICAgaWYgKGYgPT09IDIpIHtcbiAgICAgIHN0ciA9IHN0clt3aXRob3V0U3VmZml4ID8gMCA6IDFdO1xuICAgIH1cblxuICAgIHJldHVybiAoc3RyIGFzIHN0cmluZykucmVwbGFjZSgvJWQvaSwgbnVtLnRvU3RyaW5nKCkpO1xuICB9O1xufTtcbmNvbnN0IG1vbnRoczogc3RyaW5nW10gPSBbXG4gICfamNin2YbZiNuM2YcnLFxuICAn2YHZiNix24zZhycsXG4gICfZhdin2LHYsycsXG4gICfYotmI2LHbjNmEJyxcbiAgJ9mF24wnLFxuICAn2pjZiNim2YYnLFxuICAn2KzZiNmE2KfbjCcsXG4gICfYotqv2YjYs9iqJyxcbiAgJ9iz2b7Yqtin2YXYqNixJyxcbiAgJ9in2qnYqtio2LEnLFxuICAn2YbZiNin2YXYqNixJyxcbiAgJ9iv2LPYp9mF2KjYsSdcbl07XG5cbmV4cG9ydCBjb25zdCBmYUxvY2FsZTogTG9jYWxlRGF0YSA9IHtcbiAgYWJicjogJ2FyJyxcbiAgbW9udGhzLFxuICBtb250aHNTaG9ydDogbW9udGhzLFxuICB3ZWVrZGF5czogJ9uM2qnYtNmG2KjZh1/Yr9mI2LTZhtio2Ydf2LPZhyDYtNmG2KjZh1/ahtmH2KfYsdi02YbYqNmHX9m+2YbYrCDYtNmG2KjZh1/YrNmF2LnZh1/YtNmG2KjZhycuc3BsaXQoJ18nKSxcbiAgd2Vla2RheXNTaG9ydDogJ9uM2qnYtNmG2KjZh1/Yr9mI4oCM2LTZhtio2Ydf2LPZh+KAjNi02YbYqNmHX9qG2YfYp9ix4oCM2LTZhtio2Ydf2b7Zhtis4oCM2LTZhtio2Ydf2KzZhdi52Ydf2LTZhtio2YcnLnNwbGl0KCdfJyksXG4gIHdlZWtkYXlzTWluOiAn24xf2K9f2LNf2oZf2b5f2Kxf2LQnLnNwbGl0KCdfJyksXG4gIHdlZWtkYXlzUGFyc2VFeGFjdDogdHJ1ZSxcbiAgbG9uZ0RhdGVGb3JtYXQ6IHtcbiAgICBMVDogJ0hIOm1tJyxcbiAgICBMVFM6ICdISDptbTpzcycsXG4gICAgTDogJ0QvXFx1MjAwRk0vXFx1MjAwRllZWVknLFxuICAgIExMOiAnRCBNTU1NIFlZWVknLFxuICAgIExMTDogJ0QgTU1NTSBZWVlZIEhIOm1tJyxcbiAgICBMTExMOiAnZGRkZCBEIE1NTU0gWVlZWSBISDptbSdcbiAgfSxcbiAgbWVyaWRpZW1QYXJzZTogL9i1fNmFLyxcbiAgaXNQTShpbnB1dCkge1xuICAgIHJldHVybiAn2YUnID09PSBpbnB1dDtcbiAgfSxcbiAgbWVyaWRpZW0oaG91ciwgbWludXRlLCBpc0xvd2VyKSB7XG4gICAgaWYgKGhvdXIgPCAxMikge1xuICAgICAgcmV0dXJuICfYtSc7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAn2YUnO1xuICAgIH1cbiAgfSxcbiAgY2FsZW5kYXI6IHtcbiAgICBzYW1lRGF5OiAnW9in2YXYsdmI2LIg2K/YsSDYs9in2LnYql0gTFQnLFxuICAgIG5leHREYXk6ICdb2YHYsdiv2Kcg2K/YsSDYs9in2LnYql0gTFQnLFxuICAgIG5leHRXZWVrOiAnZGRkZCBb2K/YsSDYs9in2LnYql0gTFQnLFxuICAgIGxhc3REYXk6ICdb2K/bjNix2YjYsiDYr9ixINiz2KfYudiqXSBMVCcsXG4gICAgbGFzdFdlZWs6ICdkZGRkIFvYr9ixINiz2KfYudiqXSBMVCcsXG4gICAgc2FtZUVsc2U6ICdMJ1xuICB9LFxuICByZWxhdGl2ZVRpbWU6IHtcbiAgICBmdXR1cmU6ICfYqNi52K8gJXMnLFxuICAgIHBhc3Q6ICfZgtio2YQgJXMnLFxuICAgIHM6IHBsdXJhbGl6ZSgncycpLFxuICAgIHNzOiBwbHVyYWxpemUoJ3MnKSxcbiAgICBtOiBwbHVyYWxpemUoJ20nKSxcbiAgICBtbTogcGx1cmFsaXplKCdtJyksXG4gICAgaDogcGx1cmFsaXplKCdoJyksXG4gICAgaGg6IHBsdXJhbGl6ZSgnaCcpLFxuICAgIGQ6IHBsdXJhbGl6ZSgnZCcpLFxuICAgIGRkOiBwbHVyYWxpemUoJ2QnKSxcbiAgICBNOiBwbHVyYWxpemUoJ00nKSxcbiAgICBNTTogcGx1cmFsaXplKCdNJyksXG4gICAgeTogcGx1cmFsaXplKCd5JyksXG4gICAgeXk6IHBsdXJhbGl6ZSgneScpXG4gIH0sXG4gIHByZXBhcnNlKHN0cjogc3RyaW5nKTogc3RyaW5nIHtcbiAgICByZXR1cm4gc3RyLnJlcGxhY2UoL1vZodmi2aPZpNml2abZp9mo2anZoF0vZywgZnVuY3Rpb24gKG1hdGNoKSB7XG4gICAgICByZXR1cm4gbnVtYmVyTWFwW21hdGNoXTtcbiAgICB9KS5yZXBsYWNlKC/YjC9nLCAnLCcpO1xuICB9LFxuICBwb3N0Zm9ybWF0KHN0cjogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHN0ci5yZXBsYWNlKC9cXGQvZywgZnVuY3Rpb24gKG1hdGNoKSB7XG4gICAgICByZXR1cm4gc3ltYm9sTWFwW21hdGNoXTtcbiAgICB9KS5yZXBsYWNlKC8sL2csICfYjCcpO1xuICB9LFxuICB3ZWVrOiB7XG4gICAgZG93OiA2LCAvLyBTYXR1cmRheSBpcyB0aGUgZmlyc3QgZGF5IG9mIHRoZSB3ZWVrLlxuICAgIGRveTogMTIgIC8vIFRoZSB3ZWVrIHRoYXQgY29udGFpbnMgSmFuIDFzdCBpcyB0aGUgZmlyc3Qgd2VlayBvZiB0aGUgeWVhci5cbiAgfVxufTtcbiJdfQ==