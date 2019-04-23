9.5: Popover Custom content template example
============================================
**Primary Actor**: User

**Scope**: Ngx-bootstrap DEMO / BS version 3&4

**Goal**: Show user how to provide template refs as a content for popover

Main success scenario:
----------------------
1. User opens Popover demo page
2. User clicks on Custom content template sub-menu
3. User see clickable button "TemplateRef binding"
4. When user clicks on "TemplateRef binding", then popover-container shown on the top of button with specific text and header "Template ref content inside"
5. When user clicks on "TemplateRef binding" again, then popover-container disappeared
6. Template src should be written with ng-template and \[popover]=param

Variations:
-----------
2*. User scroll to Custom content template sub-menu
