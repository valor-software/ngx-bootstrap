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
4. User sees typeahead input "Adress" input. It already filled with the next info: "312 Sundown Lane"
5. User sees typeahead input "State"
6. User starts typing if there are any matches then a drop-down with a list of States matches is shown. The "Model" is filled with inputted data in the key: "state"
7. When user clicks on any item in typeahead drop-down, then typeahead container auto-fills with a selected State

Variations:
-----------
2*. User scrolls to Template-driven forms sub-menu
