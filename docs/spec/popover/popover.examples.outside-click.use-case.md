9.10: Popover Outside click example
===================================
**Primary Actor**: User

**Scope**: Ngx-bootstrap DEMO / BS version 3&4

**Goal**: Show user how to configure popover with outside click closing

Main success scenario:
----------------------
1. User opens Popover demo page
2. User clicks on Outside click sub-menu
3. User see clickable button "Live demo"
4. When user clicks on "Live demo", then popover-container shown on the top of button with specific text
5. When user clicks on "Live demo" again, then popover-container disappeared
6. When user clicks on "Live demo" again, then popover-container shown on the top of button with specific text again
7. When user clicks outside of "Live demo", then popover-container disappeared
8. Template src should be written with \[outsideClick]="true" parameter

Variations:
-----------
2*. User scroll to Outside click sub-menu
