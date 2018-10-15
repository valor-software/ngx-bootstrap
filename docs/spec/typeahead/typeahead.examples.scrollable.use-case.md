16.15: Typeahead Scrollable example
===================================
**Primary Actor**: User

**Scope**: Ngx-bootstrap DEMO / BS version 3&4

**Goal**: Show user Scrollable drop-down functionality

Main success scenario:
----------------------
1. User open Typeahead demo page
2. User click on Scrollable sub-menu
3. User is able to fill the "Model:" input
4. When user starts to type a name of a State from "states" array then a drop-down with a list of States matches is shown.
The drop-down is limited to show 5 items and has a scroll.
5. User is able to scroll down/up to see the matches list
6. Items in the drop-down are clickable. Click on any item auto-fills the "Model" with a selected State

Extensions:
-----------
3a. If there is any data, it could be deleted. While deleting data the drop-down with matches is shown
4a. If there is no matches the drop-down is hidden. The "Model" is filled with inputted data

Variations:
-----------
2*. User scroll to Scrollable sub-menu
