5.24: Datepicker Select dates from other month example
======================================
**Primary Actor**: User

**Scope**: Ngx-bootstrap DEMO / BS version 3&4

**Goal**: Show user how to manage selectFromOtherMonth option of Datepicker for getting possibility to chose day from other month

Main success scenario:
----------------------
1. User opens Datepicker demo page
2. User clicks on Select dates from other month sub-menu
3. User see Datepicker input
4. When user clicks on Datepicker input, bs-datepicker-container opens
5. When user clicks on any date from previous month in this view, then this date chosen and appear in the input
6. When user clicks on bs-datepicker-container again, then user see calendar with chosen month
7. When user clicks on any date from next month in this view, then this date chosen and appear in the input
8. When user clicks on bs-datepicker-container again, then user see calendar with chosen month
9. Template src should be written with dateInputFormat: 'DD-MM-YYYY' and selectFromOtherMonth: true

Variations:
-----------
2*. User scroll to Select dates from other month sub-menu
