16.8: Typeahead Grouping results  example
==============================================
**Primary Actor**: User

**Scope**: Ngx-bootstrap DEMO / BS version 3&4

**Goal**: Show user Grouping results functionality

Main success scenario:
----------------------
1. User open Typeahead demo page
2. User click on Grouping results sub-menu
3. User is able to fill the "Model:" input
4. When user starts to type a name of a State from "statesComplex" array then a drop-down with a list of States matches is shown
All shown States are grouped by region
5. Items in the drop-down are clickable. Click on any item auto-fills the "Model" with a selected State

Extensions:
-----------
3a. If there is any data, it could be deleted. While deleting data the drop-down with matches is shown
4a. If there is no matches the drop-down is hidden. The "Model" is filled with inputted data

Variations:
-----------
2*. User scroll to Grouping results sub-menu
