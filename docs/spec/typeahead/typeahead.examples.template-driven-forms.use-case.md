16.6: Typeahead Template-driven forms example
===================================
**Primary Actor**: User

**Scope**: Ngx-bootstrap DEMO / BS version 3&4

**Goal**: Show user Template-driven forms functionality

Main success scenario:
----------------------
1. User open Typeahead demo page
2. User click on Template-driven forms sub-menu
3. User is able to fill the "Address" input
4. User is able to fill the "State" input
5. When user starts to type a name of a State from "states" array then a drop-down with a list of States matches is shown
6. Items in the drop-down are clickable. Click on any item auto-fills the "state" in "Model" with a selected State

Extensions:
-----------
3a. If there is any data, it could be deleted.
3b. The filed has no drop-down
4a. If there is any data, it could be deleted. While deleting data in the State field the drop-down with matches is shown
4a. If there is no matches the drop-down is hidden. The "Model" field is filled with inputted data

Variations:
-----------
2*. User scroll to Template-driven forms sub-menu
