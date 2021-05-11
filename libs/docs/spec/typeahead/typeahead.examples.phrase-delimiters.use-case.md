16.10: Typeahead Phrase delimiters example
====================================
**Primary Actor**: User

**Scope**: Ngx-bootstrap DEMO / BS version 3&4

**Goal**: Show user delimiters functionality to match exact phrase

Main success scenario:
----------------------
1. User open Typeahead demo page
2. User clicks on Phrase delimiters sub-menu
3. User sees typeahead input and typeahead card with "Model:" text
4. User is able to use "&" and "," to delimit words for exact match
5. When user uses "&" or "," and type "&york new&" or ",york new," than no drop-down with the match would be shown
6. When user starts to type "york new" without delimiters than a drop-down with the match is shown
7. When user clicks on any item in typeahead drop-down, then typeahead container auto-fills with a selected State

Variations:
-----------
2*. User scrolls to Phrase delimiters sub-menu
