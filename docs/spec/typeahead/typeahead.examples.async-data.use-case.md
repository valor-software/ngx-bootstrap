16.4: Typeahead Async data example
==================================
**Primary Actor**: User

**Scope**: Ngx-bootstrap DEMO / BS version 3&4

**Goal**: Show user Async data functionality

Main success scenario:
-------------------------
1. User open Typeahead demo page
2. User click on Async data sub-menu
3. User is able to fill the "Model:" input. The input has a placeholder "Locations loaded with timeout"
4. When user starts to type a name of a State from "statesComplex" array then a drop-down with a list of States matches is shown.
Items quantity in the drop-down is limited with the key `typeaheadOptionsLimit`
5. Items in the drop-down are clickable. Click on any item auto-fills the "Model" with a selected State

<!--
the example has an issue. it will be reported
-->

Extensions:
-----------
3a. If there is any data, it could be deleted. While deleting data the drop-down with matches is shown. No placeholder
4a. If there is no matches the drop-down is hidden. The "Model" is filled with inputted data

Variations:
-----------
2*. User scroll to Async data sub-menu
