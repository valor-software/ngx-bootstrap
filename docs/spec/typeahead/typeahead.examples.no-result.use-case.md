16.14: Typeahead No result example
===================================
**Primary Actor**: User

**Scope**: Ngx-bootstrap DEMO / BS version 3&4

**Goal**: Show user how typeahead works if there are no matches

Main success scenario:
----------------------
1. User opens Typeahead demo page
2. User clicks on No result sub-menu
3. User sees typeahead input and typeahead card with "Model:" text
4. When user starts to type a name of a State from "states" and if there are no matches found than an error message "No Results Found" is shown. The "Model" is filled with inputted data
5. If there are any matches the drop-down is shown
6. When user clicks on any item in typeahead drop-down, then typeahead container auto-fills with a selected State

Variations:
-----------
2*. User scrolls to No result sub-menu
