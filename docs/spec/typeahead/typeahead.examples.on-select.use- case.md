16.17: Typeahead On select example
==================================
**Primary Actor**: User

**Scope**: Ngx-bootstrap DEMO / BS version 3&4

**Goal**: Show user On select functionality

Main success scenario:
----------------------
1. User open Typeahead demo page
2. User click on Selected sub-menu
3. User is able to fill the "Model:" input
4. User is able to see "Selected option:" filed
5. When user starts to type a name of a State from "states" array then a drop-down with a list of States matches is shown
6. User clicks on an option in the list than "Model:" filed is filled with a name of the selected State
and "Selected option" filed is filled with info about selected object: "id", "name" and "region"

Extensions:
-----------
3a. If there is any data, it could be deleted. While deleting data the drop-down with matches is shown
5a. If there is no matches the drop-down is hidden. The "Model" is filled with inputted data
6a. User submit choice by tapping the return key
6b. If there are no matches "Selected option" filed is empty and "Model" filed is filled with inputted data

Variations:
-----------
2*. User scroll to On selected sub-menu
