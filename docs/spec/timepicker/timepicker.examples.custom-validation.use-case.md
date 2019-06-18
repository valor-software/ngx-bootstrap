14.10: Timepicker Custom validation example
===========================================
**Primary Actor**: User

**Scope**: Ngx-bootstrap DEMO / BS version 3&4

**Goal**: Show user example how to use custom validators in the timepicker

Main success scenario:
----------------------
1. User opens Timepicker demo page
2. User clicks on Custom validation sub-menu
3. User sees timepicker component with hour, minute inputs, clickable button "AM"("PM") and success alert
4. User sees HH placeholder for hours input and MM placeholder for minutes input
5. When user sets any time between 11:00 and 12:59, then success alert with current date and appropriate time is shown
6. When user sets any time outside of interval 11:00 - 12:59, then 2 danger alerts shown (1 with "Invalid time" and 2d - with "Time is:" info)

Variations:
-----------
2*. User scrolls to Custom validation sub-menu
