12.3: Sortable Custom item template example
===========================================
**Primary Actor**: User

**Scope**: Ngx-bootstrap DEMO / BS version 3&4

**Goal**: Show user sortable functionality with custom item template

Main success scenario:
----------------------
1. User opens Sortable demo page
2. User clicks on Custom item template sub-menu
3. User see 2 bs-sortable components (the first contain 4 items and the second - 2) by default
4. Each item in the first bs-sortable component have index (starting from 0)
5. Under each component user see code-preview block with appropriate models
6. When user moves item from the first sortable component to another, then this item appeared in the second component (item become without index) and model changed appropriate
7. Items inside first sortable component should be recounted and with appropriate indexes
8. When user moved items from the second sortable component to the first, then this item appeared in the first component (item become with index) and model changed appropriate
9. Items inside second sortable component should stay without indexes

Variations:
-----------
2*. User scroll to Custom item template sub-menu
