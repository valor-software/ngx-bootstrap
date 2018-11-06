16.6: Typeahead Template-driven forms example
===================================
**Primary Actor**: User

**Scope**: Ngx-bootstrap DEMO / BS version 3&4

**Goal**: Show user how typeahead can be used in template-driven forms

Main success scenario:
----------------------
1. User opens Typeahead demo page
2. User clicks on Basic array sub-menu
3. User sees the typeahead input and typeahead card with "Model:", by default it filled with the next object: "{ "address": "312 Sundown Lane", "state": null }"
4. User sees typeahead input "Adress" input with a placeholder "312 Sundown Lane", by default
5. User sees typeahead input "State"
6. When user starts to type in the "Address" input then the inputted data is shown in the "Model"
7. When user starts to type a name of a State from "states" array and there is no matches the drop-down is hidden. The "Model" is filled with inputted data in the key: "state"
8. When there are any matches then a drop-down with a list of States matches is shown
9. Items in the drop-down are clickable
10. When user clicks on any item in typeahead drop-down, then typeahead container "Model:" auto-fills with a selected State in the key "state"

Variations:
-----------
2*. User scrolls to Template-driven forms sub-menu
