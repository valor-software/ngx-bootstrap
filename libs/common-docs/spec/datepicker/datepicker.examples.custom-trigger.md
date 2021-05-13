5.19: Datepicker Custom triggers example
========================================
**Primary Actor**: User

**Scope**: Ngx-bootstrap DEMO / BS version 3&4

**Goal**: Show user example how to use different triggers in datepicker

Main success scenario:
----------------------
1. User opens Datepicker demo page
2. User clicks on Custom triggers sub-menu
3. User see 1 Datepicker input and 2 DateRangepicker inputs
4. When user move mouse to the first Datepicker input, then bs-datepicker-container opens
5. When user chose any date, then this date appear in the first input field in format "mm/dd/yyyy"
6. When user click in the first DateRangepicker input, it's activated and bs-daterangepicker-container not shown
7. When user press any key, then bs-daterangepicker-container shown and user can chose any interval
8. When user chose interval, then bs-daterangepicker-container disappeared and this interval shown in appropriate input in format "mm/dd/yyyy" - "mm/dd/yyyy"
9. When user click in the second DateRangepicker input, it's activated and bs-daterangepicker-container not shown
10. When user press any key, then bs-daterangepicker-container still not shown
11. When user click twice on input, then bs-daterangepicker-container shown and user can chose any interval
12. When user chose interval, then bs-daterangepicker-container disappeared and this interval shown in appropriate input in format "mm/dd/yyyy" - "mm/dd/yyyy"

Variations:
-----------
2*. User scroll to Custom triggers sub-menu
