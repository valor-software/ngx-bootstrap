14.8: Timepicker Readonly example
=================================
**Primary Actor**: User

**Scope**: Ngx-bootstrap DEMO / BS version 3&4

**Goal**: Show user example how to use timepicker with readonly inputs param

Main success scenario:
----------------------
1. User opens Timepicker demo page
2. User clicks on Readonly sub-menu
3. User sees timepicker component with inputs and data(according to the current time)
4. User sees clickable button "Editable / Readonly input"
5. When user clicks on "Editable / Readonly input" button, then timepicker inputs and buttons become unclickable and readonly
6. When user clicks on any input or arrow - nothing happens
7. When user clicks on "Editable / Readonly input" button again, then timepicker inputs become clickable
8. When user clicks on arrow up above the hour and minute input, then hours increased at 1 and minutes increased at 5
9. When user clicks on arrow down under the hour and minute input, then hours decreased at 1 and minutes decreased at 5
10. Component and template src should be written with isMeridian=false and readonly=true params

Variations:
-----------
2*. User scrolls to Readonly sub-menu
