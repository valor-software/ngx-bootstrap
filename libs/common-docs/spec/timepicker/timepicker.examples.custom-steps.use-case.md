14.9: Timepicker Custom steps example
=====================================
**Primary Actor**: User

**Scope**: Ngx-bootstrap DEMO / BS version 3&4

**Goal**: Show user example how to change steps in hour, minute, second input of timepicker

Main success scenario:
----------------------
1. User opens Timepicker demo page
2. User clicks on Custom steps sub-menu
3. User sees timepicker component with hour, minute, second inputs, clickable button "AM"("PM") and data(according to the current time)
4. User sees 3 dropdowns "Hours step is:", "Minutes step is:", "Seconds step is:" and chosen (1|15|10) values by default

##### Timepicker - hours, change step
5. When user clicks on arrow up above the hours input, then input value increased at 1 and info alert changed appropriate
6. When user clicks on arrow down under the hours input, then input value decreased at 1 and info alert changed appropriate
7. When user clicks on dropdown "Hours step is:" and select "N", then this value is selected
8. When user clicks on arrow up above the hours input, then input value increased at N and info alert changed appropriate
9. When user clicks on arrow down under the hours input, then input value decreased at N and info alert changed appropriate

##### Timepicker - minutes, change step
10. When user clicks on arrow up above the minutes input, then input value increased at 15 and info alert changed appropriate
11. When user clicks on arrow down under the minutes input, then input value decreased at 15 and info alert changed appropriate
12. When user clicks on dropdown "Minutes step is:" and select "N", then this value is selected
13. When user clicks on arrow up above the minutes input, then input value increased at M and info alert changed appropriate
14. When user clicks on arrow down under the minutes input, then input value decreased at M and info alert changed appropriate

##### Timepicker - seconds, change step
15. When user clicks on arrow up above the seconds input, then input value increased at 10 and info alert changed appropriate
16. When user clicks on arrow down under the seconds input, then input value decreased at 10 and info alert changed appropriate
17. When user clicks on dropdown "Seconds step is:" and select "N", then this value is selected
18. When user clicks on arrow up above the seconds input, then input value increased at L and info alert changed appropriate
19. When user clicks on arrow down under the seconds input, then input value decreased at L and info alert changed appropriate

Variations:
-----------
2*. User scrolls to Custom steps sub-menu
