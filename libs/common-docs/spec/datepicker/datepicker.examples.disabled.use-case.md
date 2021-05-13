5.8: Datepicker Disabled example
================================
**Primary Actor**: User

**Scope**: Ngx-bootstrap DEMO / BS version 3&4

**Goal**: Show user how to disable content in Datepicker and Daterangepicker

Main success scenario:
----------------------
1. User opens Datepicker demo page
2. User clicks on Disabled sub-menu
3. User see 2 inputs: Datepicker and Daterangepicker and button "Toggle disabling"

###### Datepicker
4. When user clicks on Datepicker input, then bs-datepicker-container opened and user can chose any date
5. When user clicks on any date, then this date chosen and shown in the input field in format "mm/dd/yyyy"
6. When user clicks on "Toggle disabling" and then clicks on Datepicker input, then user unable to chose any date
7. When user clicks on any date, month or year - nothing happens //TODO in current implementation user can click on Month and Year, it's not necessary
8. When user clicks on "Toggle disabling" again and then clicks on Datepicker input, then user able to chose another date
9. When user clicks on any date, then this date chosen and shown in the input field in format "mm/dd/yyyy"

###### Daterangepicker
10. When user clicks on Daterangepicker input, then bs-daterangepicker-container opened and user can chose any date
11. When user chose any interval, then this interval chosen and shown in the input field in format "mm/dd/yyyy" - "mm/dd/yyyy"
12. When user clicks on "Toggle disabling" and then clicks on Daterangepicker input, then user unable to chose any date
13. When user clicks on any date, month or year - nothing happens //TODO in current implementation user can click on Month and Year, it's not necessary
14. When user clicks on "Toggle disabling" again and then clicks on Daterangepicker input, then user able to chose another interval
15. When user chose any other interval, then this interval chosen and shown in the input field in format "mm/dd/yyyy" - "mm/dd/yyyy"

Variations:
-----------
2*. User scroll to Disabled sub-menu
