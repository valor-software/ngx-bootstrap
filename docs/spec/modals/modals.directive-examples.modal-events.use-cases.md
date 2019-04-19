7.16: Modals service modal events
=================================================

**Primary Actor**: User 
 
**Scope**: Ngx-bootstrap DEMO / BS version 3&4

**Goal**: Show user modals events functionality

Main success scenario:
----------------------

1. User opens "Modals" demo page
2. User clicks on "Modal events"  sub-menu
3. When user clicks on "Open modal" button, modal popup is opened, should be messages "event onShow is fired" and "event onShown is fired"
4. When user closes modal popup by click on the cross, should be  messages "event onHide is fired" and "event onHidden is fired"

Variations:
----------

2*. User scrolls to "Modals events"
4*. When user closes modal popup by click on backdrop, should be messages "event onHide is fired, dismissed by backdrop-click" 
and "event onHidden is fired, dismissed by backdrop-click"
4**. When user closes modal popup by click ESC, should be messages "event onHide is fired, dismissed by esc" 
and "event onHidden is fired, dismissed by esc"
