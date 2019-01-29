5.25: Datepicker Select week example
====================================
**Primary Actor**: User

**Scope**: Ngx-bootstrap DEMO / BS version 3&4

**Goal**: Show user how to use selectWeek option, which give possibility to user to chose weeks instead of days in datepicker

Main success scenario:
----------------------
1. User opens Datepicker demo page
2. User clicks on Select week sub-menu
3. User see 4 inputs of Datepicker, each with appropriate placeholder
4. When user clicks on the first datepicker input, then container opened and user can chose any week. Week numbers started from 1, from January 1 each year.
5. When user select week, then datepicker container disappeared and date shown in input in format MM/DD/YYYY (day should be always Monday)
6. When user clicks on this input again, then container opened and user see selected date
7. When user clicks on the second input, then container opened and user can select weeks from other months.
8. When user click on the week from previous month, then datepicker container disappeared and date shown in input in format MM/DD/YYYY
9. When user click on the 2d datepicker input again, then container opened and user see selected date
10. When user chose the week from the next month, then datepicker container disappeared and date shown in input in format MM/DD/YYYY
11. When user click on the 3d datepicker input, then datepicker container opened
12. When user click on Sunday or Monday, nothing happens, they disabled
13. When user click on the week from current month, then datepicker container disappeared and date shown in input in format MM/DD/YYYY (day should be Tuesday)
14. When user click on the 3d datepicker again, then container opened and user see selected date
15. When user click on the 4th datepicker input, then datepicker container opened
16. When user click on any item, nothing happens, they are disabled.
17. When user enter the correct date to the input and press enter, then after datepicker opens, this date selected.

Variations:
-----------
2*. User scroll to Select week sub-menu
