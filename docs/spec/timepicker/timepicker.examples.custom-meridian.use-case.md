14.4: Timepicker custom meridian example
========================================
**Primary Actor**: User

**Scope**: Ngx-bootstrap DEMO / BS version 3&4

**Goal**: Show user timepicker functionality with changing meridian param

Main success scenario:
----------------------
1. User opens Timepicker demo page
2. User clicks on Custom meridian sub-menu
3. User sees timepicker component and info alert with selected date and time (current by default)
4. User sees current hour and current minute in timepicker inputs and button "12H"("24H") by default (depend on current time)
5. When user clicks on "12H / 24H", then input data stay the same and info changed appropriate
6. Component src should be written with meridians = \['12H', '24H']
7. Template src should be written with \[meridians]="meridians"

Variations:
-----------
2*. User scrolls to Custom meridian sub-menu
