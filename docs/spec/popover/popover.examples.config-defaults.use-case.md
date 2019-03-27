9.9: Popover Configuring defaults example
=========================================
**Primary Actor**: User

**Scope**: Ngx-bootstrap DEMO / BS version 3&4

**Goal**: Show user how to configure default popover parameters

Main success scenario:
----------------------
1. User opens Popover demo page
2. User clicks on Configuring defaults sub-menu
3. User see clickable button "Preconfigured popover"
4. When user clicks on "Preconfigured popover", then popover-container shown on the right of button with specific text
5. When user clicks on "Preconfigured popover" again, nothing happens
5. When user clicks outside of "Preconfigured popover", then popover-container disabled
6. Component src should be written with PopoverConfig and parameters: placement: "right", triggers: "focus"

Variations:
-----------
2*. User scroll to Configuring defaults sub-menu
