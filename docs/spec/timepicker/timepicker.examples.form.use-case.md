14.2: Timepicker form example
=============================
**Primary Actor**: User

**Scope**: Ngx-bootstrap DEMO / BS version 3&4

**Goal**: Show user timepicker functionality with enable/disable the timepicker

Main success scenario:
----------------------
1. User opens Timepicker demo page
2. User clicks on Forms sub-menu
3. User sees timepicker component and info alert with selected date and time (current by default). Timepicker is enabled by default
4. User sees current hour and current minute in timepicker inputs and button "AM"("PM") by default (depend on current time)
5. User sees clickable buttons "Enable Control" and "Disable Control"
6. When user clicks on "Disable Control" button then the timepicker is disabled
7. When user clicks on "Enable Control" button then the timepicker is enable again, buttons become clickable
8. When user sends invalid number or string to input and click outside, then the red border appeared in input and danger alert shown "Time is: " info
9. When user clicks on arrow up, then invalid value changed to the 01 and info alert show appropriate time


Extentions:
-----------
9.a. When user clicks on arrow down, then invalid value changed to the 00 and info alert show appropriate time

Variations:
-----------
2*. User scrolls to Form sub-menu
