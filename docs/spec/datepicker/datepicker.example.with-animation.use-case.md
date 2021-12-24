5.26: Datapicker With animation example
==========================
**Primary Actor**: User

**Scope**: Ngx-bootstrap DEMO / BS version 3&4

**Goal**: Show user datapicker and datarangepicker With animation usage example 

Main success scenario:
----------------------
1. User opens Datapicker demo page
2. User clicks on With animation sub-menu
3. User see 2 inputs: Datepicker and Daterangepicker

###### Datepicker
4. When a user clicks on "Datepicker" input, bs-datepicker-container opened with animation and with no one date selected
5. By default, Datepicker shows the current year and current month in the head block with 2 arrows at the edges of it: "‹" and "›", and with the current month calendar in the bs-datepicker-container body
6. By default, no date is selected in the Datepicker month calendar, all the data of the current month are enabled and data of the previous and the next month are disabled
7. When the user clicks on the left arrow "‹" in the bs-datepicker-container head block - previous month and current year shown in the head block with the previous month calendar in the bs-datepicker-container body
8. When user clicks on the right arrow "›" in the bs-datepicker-container head block after that twice - next month shown
9. When user clicks on month in the bs-datepicker-container head block, then full table with 12 months shown with current year in head block
10. When user clicks on year in the bs-datepicker-container head block, then table with 16 years shown with year interval in head block
11. When user clicks on any date in the bs-datepicker-container body - then this date appeared in the input in format "mm/dd/yyyy"
12. When user clears input and add there date in format "mm.dd.yyyy", click "Enter" - date converted to "mm/dd/yyyy" 
13. When user clears input and add there date in format "mm-dd-yyyy", click "Enter" - date converted to "mm/dd/yyyy"
14. When user clicks on "Datepicker" input again, bs-datepicker-container opened and chosen date selected  

###### Daterangepicker
15. When user clicks on "Daterangepicker" input, Daterangepicker bs-datepicker-container opens with animation and with no one date selected, and Datepicker bs-datepicker-container closes
16. By default, user sees  Daterangepicker container with 2 arrows: left "‹" and right "›". It consists of 2 bs-datepicker-head blocks with the current year and current month in the left datepicker-head block with the left arrow "‹" at the left edge of it, and with the current month calendar in the left bs-datepicker-body block. And with next month and the current year in the right datepicker-head block with right arrow ">" at the right edge of it, and with the next month calendar in the right bs-datepicker-body block.
17. When user clicks on the left arrow "<" of the bs-days-calendar-view block - the interval starts from the previous month, is shown
18. When user clicks on the right arrow ">" of the bs-days-calendar-view block twice - the interval starts from the next month, is shown
19. When user clicks on month name in any of the bs-datepicker-head blocks, then 2 tables with 12 months in each shown with current year in the right bs-datepicker-head block and with thee next year in the left bs-datepicker-head block
21. When user clicks on year in any of the bs-datepicker-head blocks, then bs-datepicker-container reach with 16 years period shown in each bs-datepicker-body block with that periods years interval in head blocks, and the current year is shown in the left bs-datepicker-body block
22. When user clicks on any year in any of the bs-datepicker-container, clicks on any month name after that, and chose any date from the bs-datepicker-container - then this date apears selected in the bs-datepicker-head blocks
23. When user click on the later date, then this interval chosen and appeared in the input in format "mm/dd/yyyy" - "mm/dd/yyyy"
24. When user clicks on "Daterangepicker" input field again, bs-dateragdepicker-container opened and chosen date interval selected
25. When user clears input and clicks on the input field another one, the chosen date interval still appears as selected
26. When user clears input and add there date interval in format "mm.dd.yyyy" - "mm.dd.yyyy", click "Enter" - interval converted to "mm/dd/yyyy" - "mm/dd/yyyy"
27. When user clears input and add there date interval in format "mm-dd-yyyy" - "mm-dd-yyyy", click "Enter" - interval converted to "mm/dd/yyyy" - "mm/dd/yyyy"

Variations:
-----------
2*. User scrolls to Radio without explicit group sub-menu