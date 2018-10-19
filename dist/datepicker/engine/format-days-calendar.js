import { formatDate } from '../../chronos/format';
import { getLocale } from '../../chronos/locale/locales';
export function formatDaysCalendar(daysCalendar, formatOptions, monthIndex) {
    return {
        month: daysCalendar.month,
        monthTitle: formatDate(daysCalendar.month, formatOptions.monthTitle, formatOptions.locale),
        yearTitle: formatDate(daysCalendar.month, formatOptions.yearTitle, formatOptions.locale),
        weekNumbers: getWeekNumbers(daysCalendar.daysMatrix, formatOptions.weekNumbers, formatOptions.locale),
        weekdays: getShiftedWeekdays(formatOptions.locale),
        weeks: daysCalendar.daysMatrix.map(function (week, weekIndex) { return ({
            days: week.map(function (date, dayIndex) { return ({
                date: date,
                label: formatDate(date, formatOptions.dayLabel, formatOptions.locale),
                monthIndex: monthIndex,
                weekIndex: weekIndex,
                dayIndex: dayIndex
            }); })
        }); })
    };
}
export function getWeekNumbers(daysMatrix, format, locale) {
    return daysMatrix.map(function (days) { return (days[0] ? formatDate(days[0], format, locale) : ''); });
}
export function getShiftedWeekdays(locale) {
    var _locale = getLocale(locale);
    var weekdays = _locale.weekdaysShort();
    var firstDayOfWeek = _locale.firstDayOfWeek();
    return weekdays.slice(firstDayOfWeek).concat(weekdays.slice(0, firstDayOfWeek));
}
//# sourceMappingURL=format-days-calendar.js.map