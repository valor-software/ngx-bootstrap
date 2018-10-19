import { shiftDate } from '../../chronos/utils/date-setters';
import { formatDate } from '../../chronos/format';
import { createMatrix } from '../utils/matrix-utils';
var height = 4;
var width = 4;
export var yearsPerCalendar = height * width;
var initialShift = (Math.floor(yearsPerCalendar / 2) - 1) * -1;
var shift = { year: 1 };
export function formatYearsCalendar(viewDate, formatOptions) {
    var initialDate = shiftDate(viewDate, { year: initialShift });
    var matrixOptions = { width: width, height: height, initialDate: initialDate, shift: shift };
    var yearsMatrix = createMatrix(matrixOptions, function (date) { return ({
        date: date,
        label: formatDate(date, formatOptions.yearLabel, formatOptions.locale)
    }); });
    var yearTitle = formatYearRangeTitle(yearsMatrix, formatOptions);
    return {
        years: yearsMatrix,
        monthTitle: '',
        yearTitle: yearTitle
    };
}
function formatYearRangeTitle(yearsMatrix, formatOptions) {
    var from = formatDate(yearsMatrix[0][0].date, formatOptions.yearTitle, formatOptions.locale);
    var to = formatDate(yearsMatrix[height - 1][width - 1].date, formatOptions.yearTitle, formatOptions.locale);
    return from + " - " + to;
}
//# sourceMappingURL=format-years-calendar.js.map