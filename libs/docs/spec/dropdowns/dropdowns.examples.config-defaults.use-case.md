6.14: Dropdowns Configuring defaults example
============================================
**Primary Actor**: User

**Scope**: Ngx-bootstrap DEMO / BS version 3&4

**Goal**: Show user example how to override default dropdown parameters

Main success scenario:
----------------------
1. User opens Dropdowns demo page
2. User clicks on Configuring defaults sub-menu
3. User see clickable button "Button dropdown"
4. When user clicks on "Button dropdown", then dropdown opened and there are 3 items
5. When user clicks on any item, nothing happens.
6. When user click on button "Button dropdown" again, then dropdown closes
7. Component src should be written with BsDropdownConfig as a provider and autoClose: false as a value object

Variations:
-----------
2*. User scroll to Configuring defaults sub-menu
