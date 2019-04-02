14.16: Timepicker Configuring defaults example
==============================================
**Primary Actor**: User

**Scope**: Ngx-bootstrap DEMO / BS version 3&4

**Goal**: Show user how to configure defaults for timepicker

Main success scenario:
----------------------
1. User opens Timepicker demo page
2. User clicks on Configuring defaults sub-menu
3. User sees timepicker component with hour, minute inputs and arrows and placeholders "HH" and "MM"
4. User sees info alert with text "Time is:"
5. Component src should assign to TimepickerConfig params:  hourStep: A, minuteStep: B, showMeridian, readonlyInput, mousewheel, showMinutes, showSeconds
6. When showMeridian is true then button "AM"("PM") should be visible and clickable near inputs
7. When readonlyInput is true then inputs and arrows should be not clickable
8. When mousewheel is true then user able to change input values through the mouse wheel scrolling
9. When showMinutes is true then minutes input with arrows are shown
10. When showSeconds is true then seconds input with arrows are shown
11. When user clicks on arrow up/down near hours input, then hour number increased/decreased at A and appropriate date and time shown in info alert
11. When user clicks on arrow up/down near minutes input, then minutes number increased/decreased at B and appropriate date and time shown in info alert

Extentions:
-----------
6.a. When showMeridian is false then button "AM"("PM") should not appear
7.a. When readonlyInput is false then inputs and arrows should be clickable
8.a. When mousewheel is false then user unable to change input values through the mouse wheel scrolling
9.a. When showMinutes is false then minutes input with arrows are not shown
10.a. When showSeconds is false then seconds input with arrows are not shown

Variations:
-----------
2*. User scrolls to Configuring defaults sub-menu
