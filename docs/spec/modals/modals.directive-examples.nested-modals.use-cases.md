7.14: Modals directive examples nested modals
===============================================

**Primary Actor**: User  

**Scope**: Ngx-bootstrap DEMO / BS version 3&4

**Goal**: Show user Child modal functionality

Main success scenario:
----------------------

1. User opens "Modals" demo page
2. User clicks on "Nested modals" sub-menu
3. After click on "Open parent modal" button,  modal popup is opened and user sees "Open second modal" button
4. When user clicks on "Open second modal" button, then second modal is opened, user sees 
 "Open third modal button", backdrop is changed
5. When user clicks on "Open third modal button" button, then second modal is opened, backdrop is changed
6. When user closes third modal popup by click on the cross, then third modal popup is closed, backdrop is changed
7. When user closes second modal popup by click on the cross, then second modal popup is closed, backdrop is changed
8. When user closes first modal popup by click on the cross, then first modal popup is closed, backdrop is closed

Variations:
----------

2*. User scrolls to "Nested modals"
6*. When user closes third modal popup by backdrop click, then third modal popup is closed, backdrop is changed
6**. When user closes third modal popup by click ESC , then third modal popup is closed, backdrop is changed

7*. When user closes second modal popup by backdrop click, then second modal popup is closed, backdrop is changed
7**. When user closes second modal popup by click ESC , then second modal popup is closed, backdrop is changed

8*. When user closes first modal popup by backdrop click, then first modal popup is closed, backdrop is changed
8**. When user closes first modal popup by click ESC , then first modal popup is closed, backdrop is changed
