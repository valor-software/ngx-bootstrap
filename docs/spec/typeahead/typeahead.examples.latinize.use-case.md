16.16: Typeahead Latinize example
=================================
**Primary Actor**: User

**Scope**: Ngx-bootstrap DEMO / BS version 3&4

**Goal**: Show user a possibility to use Latinize letters

Main success scenario:
----------------------
1. User opens Typeahead demo page
2. User clicks on Latinize sub-menu
3. User sees typeahead input and typeahead card with "Model:" text
4. When user starts to type a name of a State from "frenchWords" array and there is no matches the drop-down is hidden. The "Model" is filled with inputted data
5. When there are any matches then a drop-down with a list of matches is shown. Letters are auto-switched to expanded latin
6. User is able to use expanded latin letters
7. When user starts to type a name of a State from "frenchWords" array and there is no matches the drop-down is hidden. The "Model" is filled with inputted data
6. When there are any matches then a drop-down with a list of matches is shown
8. Items in the drop-down are clickable
9. When user clicks on any item in typeahead drop-down, then typeahead container auto-fills with a selected State

Variations:
-----------
2*. User scrolls to Latinize sub-menu
