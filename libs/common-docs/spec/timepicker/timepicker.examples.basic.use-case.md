14.1: Timepicker basic example
==============================
**Primary Actor**: User

**Scope**: Ngx-bootstrap DEMO / BS version 3&4

**Goal**: Show user basic timepicker functionality

Main success scenario:
----------------------
1. User opens Timepicker demo page
2. User clicks on Basic sub-menu
3. User sees timepicker component and info alert with selected date and time (current by default)
4. User sees current hour and current minute in timepicker inputs and button "AM/PM" (depend on the current time) by default

##### Timepicker - hours
5. When user clicks on arrow up above the hour input, then number in the input increased at 1 and info alert changed appropriate
6. When user clicks on arrow down under the hour input, then number in the input decreased at 1 and info alert changed appropriate
7. User able to chose hour from interval (01-12) by default
8. When user send other valid (1-12) number to input and click outside, then number in the input saved and info alert changed appropriate
9. When user send invalid number or string to input and click outside, then the red border appeared in input and danger alert shown "Time is: " info

##### Timepicker - minutes
10. When user clicks on arrow up above the minutes input, then number in the input increased at 5 and info alert changed appropriate
11. When user clicks on arrow down under the minutes input, then number in the input decreased at 5 and info alert changed appropriate
12. User able to chose minutes from interval (00-60) by default with 5 minutes step
13. When user send other valid (00-60) number to input and click outside, then number in the input saved and info alert changed appropriate
14. When user send invalid number or string to input and click outside, then the red border appeared in input and danger alert shown "Time is: " info

##### Timepicker - AM/PM
15. When user clicks on "PM"("AM") button, then it changed to "AM"("PM") and time converted appropriate

Variations:
-----------
2*. User scrolls to Basic sub-menu
