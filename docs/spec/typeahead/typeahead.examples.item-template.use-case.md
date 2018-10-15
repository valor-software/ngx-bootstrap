16.2: Typeahead Item template example
=====================================
**Primary Actor**: User

**Scope**: Ngx-bootstrap DEMO / BS version 3&4

**Goal**: Show user Item template functionality

Main success scenario:
----------------------
1. User open Typeahead demo page
2. User click on Item template sub-menu
3. User is able to fill the "Model:" input
4. When user starts to type a name of a State from "states" array then a drop-down with a list of States matches is shown.
The list contains a template "This is: "_matched state_" index: _index #"_
5. Items in the drop-down are clickable. Click on any item auto-fills the "Model" with a selected State

Extensions:
-----------
3a. If there is any data, it could be deleted. While deleting data the drop-down with matches is shown
4a. If there is no matches the drop-down is hidden. The "Model" is filled with inputted data
4b. Typing a part of the template "This is:" or "Index" does not call the drop-down

Variations:
-----------
2*. User scroll to Item template sub-menu
