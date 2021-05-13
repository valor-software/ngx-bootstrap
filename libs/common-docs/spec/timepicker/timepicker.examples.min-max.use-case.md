14.5: Timepicker Min - Max example
==================================
**Primary Actor**: User

**Scope**: Ngx-bootstrap DEMO / BS version 3&4

**Goal**: Show user timepicker functionality with Min - Max values

Main success scenario:
----------------------
1. User opens Timepicker demo page
2. User clicks on Min - Max sub-menu
3. User sees timepicker component and info alert with selected date and time (current by default)
4. User sees current hour and current minute in timepicker inputs and not clickable button "PM"("AM") by default (depend on current time)
5. Component src should be written with minTime.setHours(B), minTime.setMinutes(M), maxTime.setHours(A), maxTime.setMinutes(N)

##### Timepicker - hour input, min-max values
6. When user clicks on arrow up, then input data and info alert changed appropriate
7. Maximum hour, which user can chose - A. When user chose (A-1) hour, then arrow up become unclickable
9. When user clicks on arrow down, then input data and info alert changed appropriate
10. Minimum hour, which user can chose - B. When user chose (B) hour, then arrow down become unclickable
11. When user sends valid hour to the input, from interval (B-A), then input time and info alert changed appropriate
12. When user sends invalid hour or string to the input, then red border appear in the input and danger alert show "Time is: "

##### Timepicker - minute input, min-max values
13. When user clicks on arrow up, then input data and info alert changed appropriate (with step 5 minutes)
14. Maximum minute, which user can chose - N. When user chose (N-1) minute, then arrow up become unclickable
15. When user clicks on arrow down, then input data and info alert changed appropriate (with step 5 minutes)
16. Minimum minute, which user can chose - M. When user chose (M) minute, then arrow down become unclickable
17. When user send valid minute to the input, from interval (M-N), then input time and info alert changed appropriate
18. When user send invalid minute or string to the input, then red border appear in the input and danger alert show "Time is: "

Variations:
-----------
2*. User scrolls to Min - Max sub-menu
