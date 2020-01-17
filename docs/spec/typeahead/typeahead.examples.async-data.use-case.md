16.4: Typeahead Async data example
==================================
**Primary Actor**: User

**Scope**: Ngx-bootstrap DEMO / BS version 3&4

**Goal**: Show user how typeahead works with async data and how it loads results

Main success scenario:
-------------------------
1. User opens Typeahead demo page
2. User clicks on Async data sub-menu
3. User sees typeahead input and typeahead card with "Model:" text. The input has a placeholder "Locations loaded with timeout"
4. User starts typing if there are any matches then a drop-down with a list of States matches is shown. Items quantity in the drop-down is limited to 7
5. When user clicks on any item in typeahead drop-down, then typeahead container auto-fills with a selected State

Variations:
-----------
2*. User scrolls to Async data sub-menu
