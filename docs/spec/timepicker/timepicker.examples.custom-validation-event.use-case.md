14.11: Timepicker Custom validation with isValid event example
==============================================================
**Primary Actor**: User

**Scope**: Ngx-bootstrap DEMO / BS version 3&4

**Goal**: Show user example how to use custom validation with isValid event in the timepicker

Main success scenario:
----------------------
1. User opens Timepicker demo page
2. User clicks on Custom validation with isValid event sub-menu
3. User sees timepicker component with hour, minute inputs, clickable button "AM"("PM") and success alert with current date and time
4. When user sends any invalid time or string in hours input, then 2 danger alerts shown (1 with "Invalid time" and 2d - with "Time is:" info)
5. When user sends any invalid time or string in minutes input, then 2 danger alerts still present (1 with "Invalid time" and 2d - with "Time is:" info)
6. When user clicks on any arrow, then date become valid (taken the nearest date from now)
7. Component src should be written with isValid method

Variations:
-----------
2*. User scrolls to Custom validation with isValid event sub-menu
