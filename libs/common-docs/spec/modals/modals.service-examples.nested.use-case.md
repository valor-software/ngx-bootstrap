7.3: Modals service examples nested
===================================

**Primary Actor**: User  

**Scope**: Ngx-bootstrap DEMO / BS version 3&4

**Goal**: Show user modal nested functionality

Main success scenario:
----------------------

1. User opens "Modals" demo page
2. User clicks on "Nedted" sub-menu
3. When user clicks on "Open first modal" button, modal popup is opened and contains button for opening second modal, backdrop is enabled
4. When user clicks on "Open second modal" in first popup, second modal popup is opened, "Close first modal" button should be present, backdrop is enabled
5. When user closes second modal popup by click on the cross, second modal popup is closed, first popup shown, backdrop is enabled
6. When user closes first modal popup by click on the cross, first popup is closed, backdrop is disabled

Extensions:
----------

5a. When user closes second modal popup by click on backdrop, second modal popup is closed, first popup shown, backdrop is enabled
5b. When user closes second modal popup by click ESC, second modal popup is closed, first popup shown, backdrop is enabled
5c. When user closes second modal popup by click on "Close first modal" button, second modal popup is closed, first popup shown, backdrop is enabled

6a. When user closes first modal popup by click ESC, first popup is closed, backdrop is disabled
6b. When user closes first modal popup by click on backdrop, first popup is closed, backdrop is disabled

Variations:
----------

2*. User scrolls to "Nested"
