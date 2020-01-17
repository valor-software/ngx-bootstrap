11.2: Rating dynamic example
============================
**Primary Actor**: User

**Scope**: Ngx-bootstrap DEMO / BS version 3&4

**Goal**: Show user dynamic rating functionality

Main success scenario:
----------------------
1. User opens Rating demo page
2. User clicks on Dynamic rating sub-menu
3. User see rating with 10 stars and card with "Rate: N, Readonly is: false;  Hovering over: none" text
4. User see 2 clickable buttons "Clear" and "Toggle Readonly"
5. First N stars should be selected and 10-N not selected
6. When user move mouse to any other star from N (Y), then text in card changed with "Hovering over: Y" and percentage block shown with "Y*10%" text
7. When user clicks on any star (different from selected), then card info updated with this new number
8. When user clicks "Clear", then all stars become unselected and card text is "Rate: 0;  Readonly is: false;  Hovering over: none"
9. When user clicks on any star, then rating and card text updated again
10. When user clicks on "Toggle Readonly", then card text updated with "Readonly is: true" and button "Clear" became unclickable
11. When user clicks on any star in the rating, nothing happens
12. When user clicks on "Toggle Readonly" again, then button "Clear" became clickable and card text updated with "Readonly is: false"
13. When user clicks on any star, then rating and card text updated again


Variations:
-----------
2*. User scroll to Dynamic rating sub-menu
