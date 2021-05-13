11.4: Rating Select on enter example
====================================
**Primary Actor**: User

**Scope**: Ngx-bootstrap DEMO / BS version 3&4

**Goal**: Show user rating with key navigation (with arrows and enter)

Main success scenario:
----------------------
1. User opens Rating demo page
2. User clicks on Select on enter sub-menu
3. User see rating card with info "Rating: N;  Readonly is: false;" and clickable button "Reset rating and status"
4. When user change the mark, then rating changed with appropriate info in the card
5. When user focus on the rating, then after press "right arrow" on the keyboard, rating value increased at 1
6. When user press "left arrow" on the keyboard, rating value decreased at 1
7. When user press "Enter" on the keyboard, then rating saved this state and card info updated with "Rating: N;  Readonly is: true;"
8. When user clicks on "Reset rating and status", then all stars in rating become unselected and card text become "Rating: 0;  Readonly is: false;"
9. When user change the mark, then rating changed with appropriate info in the card

Variations:
-----------
2*. User scroll to Select on enter sub-menu
