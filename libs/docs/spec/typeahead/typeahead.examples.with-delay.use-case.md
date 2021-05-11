16.5: Typeahead With delay example
==================================
**Primary Actor**: User

**Scope**: Ngx-bootstrap DEMO / BS version 3&4

**Goal**: Show user With delay functionality

Main success scenario:
----------------------
1. User open Typeahead demo page
2. User clicks on With delay sub-menu
3. User sees typeahead input and typeahead card with "Model:" text
4. When user starts to type a name of a State from "states" array Drop-down update delay depends on key "typeaheadWaitMs", time delay = 1 sec, by default
5. If there are any matches then a drop-down with a list of States matches is shown
6. When user clicks on any item in typeahead drop-down, then typeahead container auto-fills with a selected State

Variations:
-----------
2*. User scrolls to With delay sub-menu
