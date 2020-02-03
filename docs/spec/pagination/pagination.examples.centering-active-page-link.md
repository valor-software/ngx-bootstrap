8.10: Pagination Centering the active page link examples
============================================

 **Primary Actor**: User

 **Scope**: Ngx-bootstrap DEMO / BS version 3&4

 **Goal**: Show user centering the active page link functionality

 Main success scenario:
----------------------

 1. User opens "Pagination" demo page
 2. User clicks on "Centering the active page link" sub-menu
 3. By default maximum page numbers equal to 5 and active page 1.
 4. By default centering the active page link is enabled
 5. When the user clicks on 5th page, then active page - 5 and it centered, maximum count of pages - 5
 6. After click on "Next" button, then active page - 6 and it centered, maximum count of pages - 5
 7. After click on "Previous" button, then active page - 5 and it centered, maximum count of pages should 5
 8. When the user clicks on "Toggle centering current page link", then "last" and "first" buttons are appeared, and should be marked like "..."
 9. When the user clicks on 5th page, then active page - 5 and it located by right side, maximum count of pages - 5
 10. After click on "Next" button, then active page - 6 and it located by left side, maximum count page - 5
 11. After click on "Previous" button, then active page - 5 and it located by left side, maximum count of pages - 5
 12. After click on "Last" button, next 5 pages are appeared, maximum count of pages - 5
 13. After click on "Previous" button, Previous 5 pages are appeared, maximum count of pages - 5

 Variations:
 ----------

 2*. User scrolls to "Centering the active page"
