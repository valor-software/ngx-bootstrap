14.6: Timepicker Toggle minutes/seconds example
===============================================
**Primary Actor**: User

**Scope**: Ngx-bootstrap DEMO / BS version 3&4

**Goal**: Show user example with toggle minutes and seconds in timepicker

Main success scenario:
----------------------
1. User opens Timepicker demo page
2. User clicks on Toggle minutes/seconds sub-menu
3. User sees timepicker component with hours, minutes and seconds and clickable button "AM"("PM") (according to the current time)
4. User sees info alert with selected date and time and showMinutes: true, showSeconds: true by default
5. User sees 2 clickable buttons "Hide minutes" and "Hide seconds"
6. When user clicks on "Hide minutes" button, then input and arrows with minutes hidden and info alert show "showMinutes: false"
7. When user clicks on "Hide seconds" button, then input and arrows with seconds hidden and info alert show "showSeconds: false"
8. When user clicks on "Hide minutes" button again, then input and arrows with minutes shown and info alert show "showMinutes: true"
9. When user clicks on "Hide seconds" button again, then input and arrows with seconds shown and info alert show "showSeconds: true"
10. Component and template src should be written with toggleMinutes and toggleSeconds methods

Variations:
-----------
2*. User scrolls to Toggle minutes/seconds sub-menu
