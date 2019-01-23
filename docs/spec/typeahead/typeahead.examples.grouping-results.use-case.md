16.8: Typeahead Grouping results example
==============================================
**Primary Actor**: User

**Scope**: Ngx-bootstrap DEMO / BS version 3&4

**Goal**: Show user Grouping results functionality

Main success scenario:
----------------------
1. User opens Typeahead demo page
2. User clicks on Grouping results sub-menu
3. User sees typeahead input and typeahead card with "Model:" text
4. When user starts to type a name of a State from "statesComplex" array and there is no matches the drop-down is hidden. The "Model" is filled with inputted data
5. When there are any matches then a drop-down with a list of States matches is shown. All shown States are grouped by region
6. Items in the drop-down are clickable
7. When user clicks on any item in typeahead drop-down, then typeahead container auto-fills with a selected State

Variations:
-----------
2*. User scrolls to Grouping results sub-menu
