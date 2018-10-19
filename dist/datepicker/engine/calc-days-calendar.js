import { getFirstDayOfMonth } from '../../chronos/utils/date-getters';
import { getStartingDayOfCalendar } from '../utils/bs-calendar-utils';
import { createMatrix } from '../utils/matrix-utils';
export function calcDaysCalendar(startingDate, options) {
    var firstDay = getFirstDayOfMonth(startingDate);
    var initialDate = getStartingDayOfCalendar(firstDay, options);
    var matrixOptions = {
        width: options.width,
        height: options.height,
        initialDate: initialDate,
        shift: { day: 1 }
    };
    var daysMatrix = createMatrix(matrixOptions, function (date) { return date; });
    return {
        daysMatrix: daysMatrix,
        month: firstDay
    };
}
//# sourceMappingURL=calc-days-calendar.js.map