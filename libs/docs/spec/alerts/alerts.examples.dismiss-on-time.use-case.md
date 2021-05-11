1.7: Alerts Dismiss on timeout example
======================================
**Primary Actor**: User

**Scope**: Ngx-bootstrap DEMO / BS version 3&4

**Goal**: Show user possibilities to show alert for a limited time

Main success scenario:
----------------------
1. User open Alerts demo page
2. User click on Dismiss on timeout sub-menu
3. User see 1 alert with type: success
4. User should see message "If you missed alert under me, just press Add more button"
5. User should see "Add more" button and be able to click on it
6. When user click on "Add more" button, then info alert shown
7. If user in a short time (up to 5 sec) click on button a few times, then a few alerts should be shown

Extensions:
-----------
3a. If user don't see success alert, need to jump to 5 step

Variations:
-----------
2*. User scroll to Dismiss on timeout sub-menu
