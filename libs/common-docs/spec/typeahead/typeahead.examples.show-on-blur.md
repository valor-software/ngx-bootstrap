16.18: Typeahead Show results on blur example
================================
**Primary Actor**: User

**Scope**: Ngx-bootstrap DEMO / BS version 3&4

**Goal**: Show user how to use functionality to keep dropdown active on no focus

Main success scenario:
----------------------
1. User opens Typeahead demo page
2. User clicks on Show results on blur sub-menu
3. User sees typeahead input and typeahead card with "typeaheadHideResultsOnBlur: false Model:" text. User sees button with "Toggle typeaheadHideResultsOnBlur" text
4. When user clicks outside the input then drop-down stays opened
5. User clicks on the button and sees typeahead card with "typeaheadHideResultsOnBlur: false Model:" text was changed to TRUE
6. If user clicks anywhere outside the input than the drop-down closes
7. When user clicks on any item in typeahead drop-down, then typeahead container auto-fills with a selected State

Variations:
-----------
2*. User scrolls to Show results on blur sub-menu
