9.8: Popover Visibility events example
======================================
**Primary Actor**: User

**Scope**: Ngx-bootstrap DEMO / BS version 3&4

**Goal**: Show user how to handle popover visibility events

Main success scenario:
----------------------
1. User opens Popover demo page
2. User clicks on Visibility events sub-menu
3. User see clickable button "Live demo" and card with "Event: " text
4. When user clicks on "Live demo", then popover-container shown on the top of button with specific text and card updated with "Event: shown" text
5. When user clicks on "Live demo" again, then popover-container disappeared and card updated with "Event: hidden" text
6. Component src should be written with onShown and onHidden methods

Variations:
-----------
2*. User scroll to Visibility events sub-menu
