16.12: Typeahead On blur example
================================
**Primary Actor**: User

**Scope**: Ngx-bootstrap DEMO / BS version 3&4

**Goal**: Show user On blur functionality

Main success scenario:
----------------------
1. User open Typeahead demo page
2. User click on On blur sub-menu
3. User is able to fill the "Model:" input
4. When user starts to type a name of a State from "states" array then a drop-down with a list of States matches is shown.
5. When user clicks anywhere outside the input than the "Option on blur" field is filled with the first item from the States matches

Extensions:
-----------
3a. If there is any data, it could be deleted. While deleting data the drop-down with matches is shown
4a. If there is no matches the drop-down is hidden. The "Model" field is filled with inputted data
5a. If there is no matches the drop-down is hidden. The "Option on blur" stays empty

Variations:
-----------
2*. User scroll to On blur sub-menu
