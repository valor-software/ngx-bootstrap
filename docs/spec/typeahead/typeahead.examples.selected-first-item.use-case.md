16.20: Typeahead Select first item example
==========================================
**Primary Actor**: User

**Scope**: Ngx-bootstrap DEMO / BS version 3&4

**Goal**: Show user the first item won't be chosen when pressing TAB key

Main success scenario:
----------------------
1. User opens Typeahead demo page
2. User clicks on Select first item sub-menu
3. User sees typeahead input and typeahead card with "Model:" text
4. When user starts to type a name of a State from "states" array a drop-down with a list of States matches is shown
5. When user presses the TAB button on a keyboard then the dropdown closes and typeahead card stays not filled
6. When user clicks on any item in typeahead drop-down, then typeahead container auto-fills with a selected State

Variations:
-----------
2*. User scrolls to Select first item sub-menu
