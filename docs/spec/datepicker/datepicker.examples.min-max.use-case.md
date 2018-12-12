5.7: Datepicker Min-max example
===============================
**Primary Actor**: User

**Scope**: Ngx-bootstrap DEMO / BS version 3&4

**Goal**: Show user how to use min and max date in Datepicker and Daterangepicker

Main success scenario:
----------------------
1. User opens Datepicker demo page
2. User clicks on Min-max sub-menu
3. User see 2 inputs: Datepicker and Daterangepicker
4. When user clicks on Datepicker input, then bs-datepicker-container opened and user can chose any date from interval (yesterday - current day in the next week)
5. When user clicks on any other date, not from this interval, nothing happens
6. When user clicks on date from this interval, this date chosen and shown in the input field in format "mm/dd/yyyy"
7. When user clicks on Daterangepicker input, then bs-daterangepicker-container opened and user can chose any interval from interval (yesterday - current day in the next week)
8. When user clicks on any other date, not from this interval, nothing happens
9. When user clicks on the first date from this interval and second date also from this interval, then this interval chosen and shown in the input field in format "mm/dd/yyyy" - "mm/dd/yyyy"

Variations:
-----------
2*. User scroll to Min-max sub-menu
