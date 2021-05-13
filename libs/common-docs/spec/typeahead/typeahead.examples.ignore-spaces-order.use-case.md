16.9: Typeahead Ignore spaces and order example
==============================================
**Primary Actor**: User

**Scope**: Ngx-bootstrap DEMO / BS version 3&4

**Goal**: Show user how spaces and symbols order can be ignored during typing

Main success scenario:
----------------------
1. User opens Typeahead demo page
2. User clicks on Ignore spaces and order sub-menu
3. User sees typeahead input and typeahead card with "Model:" text. User sees the button "Toggle typeaheadSingleWords"
4. "Default:" the input property is set "typeaheadSingleWords = true". Order of typed symbols and spaces between them is ignored
5. User starts typing then order of typed symbols and spaces between them is ignored if there are any matches then a drop-down with a list of States matches is shown
7. When user sets the "typeaheadSingleWords = false" by clicking on the button "Toggle typeaheadSingleWords" then order of typed symbols and spaces between them will NOT be ignored
8. If user starts to type a name of a State from "states" array and there is no matches the drop-down is hidden. The "Model" is filled with inputted data
9. When user clicks on any item in typeahead drop-down, then typeahead container auto-fills with a selected State

Variations:
-----------
2*. User scrolls to Ignore spaces and order sub-menu
