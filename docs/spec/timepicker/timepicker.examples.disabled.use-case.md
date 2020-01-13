14.7: Timepicker Disabled example
=================================
**Primary Actor**: User

**Scope**: Ngx-bootstrap DEMO / BS version 3&4

**Goal**: Show user example how to disable inputs and buttons in timepicker

Main success scenario:
----------------------
1. User opens Timepicker demo page
2. User clicks on Disabled sub-menu
3. User sees timepicker component and clickable button "AM"("PM") (according to the current time)
4. User sees clickable button "Enable / Disable input"
5. When user clicks on "Enable / Disable input" button, then timepicker inputs and buttons become unclickable and disabled
6. When user clicks on input or on button "AM"(""PM) - nothing happens
7. When user clicks on "Enable / Disable input" button again, then timepicker inputs and buttons become clickable
8. When user clicks on arrow up above the hour and minute input, then hours increased at 1 and minutes increased at 5
9. When user clicks on arrow down under the hour and minute input, then hours decreased at 1 and minutes decreased at 5
10. Component and template src should be written with isMeridian=true and isDisabled=true params

Variations:
-----------
2*. User scrolls to Disabled sub-menu
