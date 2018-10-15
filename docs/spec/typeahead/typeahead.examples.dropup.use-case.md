16.11: Typeahead Dropup example
===============================
**Primary Actor**: User

**Scope**: Ngx-bootstrap DEMO / BS version 3&4

**Goal**: Show user Dropup functionality

Main success scenario:
----------------------
1. User open Typeahead demo page
2. User click on Dropup sub-menu
3. User is able to fill the "Model:" input
4. When user starts to type a name of a State from "states" array then a drop-up with a list of States matches is shown.
5. Items in the drop-down are clickable. Click on any item auto-fills the "Model" with a selected State

Extensions:
-----------
3a. If there is any data, it could be deleted. While deleting data the drop-down with matches is shown
4a. If there is no matches the drop-down is hidden. The "Model" field is filled with inputted data

Variations:
-----------
2*. User scroll to Dropup sub-menu
