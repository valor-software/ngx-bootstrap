5.1: Datepicker basic example
=============================
**Primary Actor**: User

**Scope**: Ngx-bootstrap DEMO / BS version 3&4

**Goal**: Show user basic Datepicker and Daterangepicker functionality

Main success scenario:
----------------------
1. User opens Datepicker demo page
2. User clicks on Basic sub-menu
3. User see 2 inputs: Datepicker and Daterangepicker

###### Datepicker
4. When user clicks on "Datepicker" input, bs-datepicker-container opened and no one date selected
5. User see Datepicker container with 2 arrows in the bs-datepicker-head block: left "<" and right ">"
6. By default, Datepicker show current year and current month in head block
7. When the user clicks on the left arrow "<" - then the previous month name with current year shown in the bs-datepicker-head block and the previous month's calendar shown in the bs-datepicker-body block
8. When user clicks on the right arrow ">" after that twice - then the next month name with current year number shown in the the bs-datepicker-head block, and next month's calendar shown in the bs-datepicker-body block
9. When the user clicks on the month name in the bs-datepicker-head block, the current year number is displayed in the bs-datepicker-head block, and the full table with 12 months is displayed in the bs-datepicker-body block 
10. When the user clicks a year in the bs-datepicker-head block, a 16-year interval appears in the bs-datepicker-head block, and the bs-datepicker-body displays the complete table with that 16 year period
11. When user clicks on any year, next clicks on any month name and next click on the any date in the bs-datepicker-body - then selected date appears in the input in the format "mm/dd/yyyy"
12. When user clicks on "Datepicker" input again, bs-datepicker-container opened and chosen date selected in the month calendar
13. When user clears input and add there date in format "mm.dd.yyyy", click "Enter" - date converted to "mm/dd/yyyy"
14. When user clears input and add there date in format "mm-dd-yyyy", click "Enter" - date converted to "mm/dd/yyyy"
15. When user clicks on "Datepicker" input again, bs-datepicker-container opened and chosen date selected

###### Daterangepicker
14. Daterangepicker bs-datepicker-container opens with animation and with no one date selected, and Datepicker bs-datepicker-container closes
15. By default, user see 2 bs-days-calendar-view blocks in the bs-datepicker-container
16. User see Daterangepicker container with 2 arrows: "‹" and "›"
17. When user clicks on "‹" - shown interval, which started from previous month
18. When user clicks on "›" - shown interval, which started from next month
19. By default, Daterangepicker show interval from current month, year and next month, year in head block
20. When user clicks on month, then 2 tables with 12 months in each shown with years(current and next) in head block
21. When user clicks on year, then 2 tables with 16 years in each shown with year interval in head block
22. When user clicks on any date - then this date selected
23. When user click on the later date, then this interval appeared in the input in format "mm/dd/yyyy" - "mm/dd/yyyy"
24. When user clicks on "Daterangepicker" input again, bs-dateragdepicker-container opened and chosen date interval selected
25. When user clears input and add there date interval in format "mm.dd.yyyy" - "mm.dd.yyyy", click "Enter" - interval converted to "mm/dd/yyyy" - "mm/dd/yyyy"

Variations:
-----------
2*. User scroll to Basic sub-menu

Extentions:
-----------
###### Datepicker
9a. When user clicks on "‹" button - previous year in head block shown
9b. When user clicks on "›" button - next year in head block shown
9c. When user clicks on any month - then this month shown in head block and table with dates shown

10a. When user clicks on "‹" button - interval with previous 16 years shown
10b. When user clicks on "›" button - interval with next 16 years shown
10c. When user clicks on any year - then this year shown in head block and table with 12 months shown
10d. When user clicks on any month - then this month and year shown in head block and table with dates shown

13a. When user clears input and add there date in bad format, click "Enter" - "Invalid date" shown
13b. When user clears input and add there date in format "mmddyyyy", click "Enter" - date converted to "mm/dd/yyyy"

###### Daterangepicker
14a. If "Datepicker" closed, when user clicks on "Daterangepicker" input, bs-dateragdepicker-container opened

20a. When user clicks on "‹" button - interval, which started from previous year in head block shown
20b. When user clicks on "›" button - interval, which started from next year in head block shown
20c. When user clicks on any month - then tables with dates shown and in head block shown interval, which start from chosen month

21a. When user clicks on "‹" button - interval with previous 16 years shown in each table
21b. When user clicks on "›" button - interval with next 16 years shown in each table
21c. When user clicks on any year from the left table - then this year shown in head block and tables with 12 months in each shown
21d. When user clicks on any month from the left table - then this month and year shown in head block and tables with dates in each shown

25a. When user clears input and add there date interval in bad format, click "Enter" - nothing happens
25b. When user clears input and add there date interval in format "mmddyyyy" - "mmddyyyy", click "Enter" - date converted to "mm/dd/yyyy" - "mm/dd/yyyy"
