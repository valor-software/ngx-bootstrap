16.7: Typeahead Reactive forms example
=============================================
**Primary Actor**: User

**Scope**: Ngx-bootstrap DEMO / BS version 3&4

**Goal**: Show user Reactive forms functionality

Main success scenario:
----------------------
1. User open Typeahead demo page
2. User click on Reactive forms forms sub-menu
3. User is able to fill the "Model" input. The input has a placeholder "Typeahead inside a form"
4. When user places mouse coursor in the "Model" input then a drop-down with the first seven States is shown
5. When user starts to type a name of a State from "states" array then the drop-down updates according inputed data
6. Items in the drop-down are clickable. Click on any item auto-fills the "state" in "Model" with a selected State

Extensions:
-----------
3a. "Model:" is already filled with "null"
3b. If there is already, it could be deleted.
4a. If there is any data, it could be deleted. While deleting data in the State field the drop-down with matches is shown
4a. If there is no matches the drop-down is hidden. The "Model" field is filled with inputted data

Variations:
-----------
2*. User scroll to Reactive forms forms sub-menu
