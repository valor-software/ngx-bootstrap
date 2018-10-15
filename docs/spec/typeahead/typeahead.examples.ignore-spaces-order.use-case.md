16.9: Typeahead Ignore spaces and order example
==============================================
**Primary Actor**: User

**Scope**: Ngx-bootstrap DEMO / BS version 3&4

**Goal**: Show user Ignore spaces and symbols order functionality

Main success scenario:
----------------------
1. User open Typeahead demo page
2. User click on Ignore spaces and order sub-menu
3. User is able to fill the "Model:" input
Default: the input property is set `typeaheadSingleWords = true`. Order of typed symbols and spaces between them will is ignored
4. When user starts to type a name of a State from "states" array then  and then a drop-down with a list of States matches is shown
5. Items in the drop-down are clickable. Click on any item auto-fills the "Model" with a selected State
6. User sets the `typeaheadSingleWords = false` by clicking on the button "Toggle typeaheadSingleWords"
7. When user starts to type a name of a State from "states" array then order of typed symbols and spaces between them will NOT be ignored

Extensions:
-----------
3a. If there is any data, it could be deleted. While deleting data the drop-down with matches is shown
4a. If there is no matches the drop-down is hidden. The "Model" is filled with inputted data
7a. If there is no matches the drop-down is hidden. The "Model" is filled with inputted data

Variations:
-----------
2*. User scroll to Ignore spaces and order sub-menu
