5.16: Datepicker Config properties example
==========================================
**Primary Actor**: User

**Scope**: Ngx-bootstrap DEMO / BS version 3&4

**Goal**: Show user example how to configure datepicker with bsConfig

Main success scenario:
----------------------
1. User opens Datepicker demo page
2. User clicks on Config properties sub-menu
3. User see Datepicker input
4. Template src should contain bsConfig parameter with dateInputFormat: "DD-MM-YYYY" and containerClass: "theme-red"
5. When user clicks on Datepicker input, bs-datepicker-container opens in style "theme-red"
6. When user chose any date, then bs-datepicker-container disappeared and date is shown in the input in format "DD-MM-YYYY"

Variations:
-----------
2*. User scroll to Config properties sub-menu
