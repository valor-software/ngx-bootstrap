14.3: Timepicker meridian example
=================================
**Primary Actor**: User

**Scope**: Ngx-bootstrap DEMO / BS version 3&4

**Goal**: Show user timepicker functionality with changing meridian param

Main success scenario:
----------------------
1. User opens Timepicker demo page
2. User clicks on Meridian sub-menu
3. User sees timepicker component and info alert with selected date and time (current by default)
4. User sees current hour and current minute in timepicker inputs and button "AM"("PM") by default (depend on current time)
5. User sees clickable button "12H / 24H" by default
6. When user clicks on "12H / 24H", then "AM"("PM") button disappeared and time changed appropriate (according to 24-hours format)
7. When user sends other valid number to hours input (00-24), then time changed appropriate
8. When user sends invalid number or string to input and click outside, then the red border appeared in input and danger alert shown "Time is: " info
9. When user clicks on arrow up, then invalid value changed to the 01 and info alert show appropriate time
10. User able to chose hour from interval (00-24)
11. When user clicks on "12H / 24H" again, then "AM"("PM") button appeared in appropriate state and time number in the input changed appropriate. Info alert did not changed anyhow.
12. User able to chose hour from interval (01-12)

Extentions:
-----------
9.a. When user clicks on arrow down, then invalid value changed to the 00 and info alert show appropriate time

Variations:
-----------
2*. User scrolls to Meridian sub-menu
