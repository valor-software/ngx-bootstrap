16.12: Typeahead On blur example
================================
**Primary Actor**: User

**Scope**: Ngx-bootstrap DEMO / BS version 3&4

**Goal**: Show user how typeahead works if focus on input was lost

Main success scenario:
----------------------
1. User opens Typeahead demo page
2. User clicks on On blur sub-menu
3. User sees typeahead input and typeahead card with "Model:" text. User sees typeahead card with "Option on blur:" text
4. When user starts to type a name of a State from "states" array and there is no matches the drop-down is hidden
5. If user clicks anywhere outside the input than the "Option on blur" stays empty
6. When there are any matches then a drop-down with a list of States matches is shown
7. If user highlights any option in the list with a mouse or arrow keys and clicks anywhere outside the input than the "Option on blur" is filled with the option user selected

Variations:
-----------
2*. User scrolls to On blur sub-menu
