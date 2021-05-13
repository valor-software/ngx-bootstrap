7.5: Modals service examples events
=================================================

**Primary Actor**: User 
 
**Scope**: Ngx-bootstrap DEMO / BS version 3&4

**Goal**: Show user modals events functionality

Main success scenario:
----------------------

1. User opens "Modals" demo page
2. User clicks on "Events"  sub-menu
3. When user clicks on "Open modal" button, modal popup is opened, should be two messages "onShow event has been fired"
4. When user closes modal popup by click on the cross, should be messages "onHide event has been fired" and "onHidden event has been fired"

Variations:
----------

2*. User scrolls to "Events"
4*. When user closes modal popup by click on backdrop, should be messages "onHide event has been fired, dismissed by backdrop-click" 
and "onHidden event has been fired, dismissed by backdrop-click"
4**. When user closes modal popup by click ESC, should be messages "onHide event has been fired, dismissed by esc" 
and "onHidden event has been fired, dismissed by esc"
