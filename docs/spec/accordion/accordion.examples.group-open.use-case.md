0.2: Accordion group opening event example
==========================================
**Primary Actor**: User

**Scope**: Ngx-bootstrap DEMO / BS version 3&4

**Goal**: Show example of event listener, which listen all actions with accordion items

Main success scenario:
----------------------
1. User open Accordion demo page
2. User click on Group opening event sub-menu
3. User able to click on each item of 3
4. After click on item without event listener, item is opened and in the browser console - nothing happens
5. After click on item with event listener, item is opened and in the browser console - should be message "Accordion has been opened"

Extensions:
-----------
4a. If item is opened, after click on item without event listener, item is closed and in the browser console - nothing happens
5a. If item is opened, after click on item with event listener, item is closed and in the browser console - should be message "Accordion has been closed"

Variations:
-----------
2*. User scroll to Group opening event sub-menu
