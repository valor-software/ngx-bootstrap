16.16: Typeahead Latinize example
=================================
**Primary Actor**: User

**Scope**: Ngx-bootstrap DEMO / BS version 3&4

**Goal**: Show user Latinize functionality

Main success scenario:
----------------------
1. User open Typeahead demo page
2. User click on Latinize sub-menu
3. User is able to fill the "Model:" input
4. When user starts to type a word from "frenchWords" array then a drop-down with a list of matches is shown.
Letters are auto-switched to expanded latin
5. User is able to use expanded latin letters
6. When user starts to type a word from "frenchWords" array using expanded latin letters then the drop-down with a list of matches is shown
7. Items in the drop-down are clickable. Click on any item auto-fills the "Model" with a selected State


Extensions:
-----------
3a. If there is any data, it could be deleted. While deleting data the drop-down with matches is shown
4a. If there is no matches the drop-down is hidden. The "Model" is filled with inputted data
6a. If there is no matches the drop-down is hidden. The "Model" is filled with inputted data

Variations:
-----------
2*. User scroll to Latinize sub-menu
