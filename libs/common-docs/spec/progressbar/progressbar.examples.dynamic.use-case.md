10.2: Progressbar dynamic example
=================================
**Primary Actor**: User

**Scope**: Ngx-bootstrap DEMO / BS version 3&4

**Goal**: Show user dynamic progressbar example

Main success scenario:
----------------------
1. User open Progressbar demo page
2. User click on Dynamic sub-menu
3. User see 3 progressbars with [value]="dynamic" and "Randomize" button
4. First should be default, second - type="success" and third - type depend on value
5. When user click "Randomize", then value of each progressbar changed
6. If value of third progressbar >= 25 && < 50, then text "info" shown

Extentions:
-----------
6*. If value of third progressbar >= 50 && < 75, then text "warning" shown
6**. If value of third progressbar < 25, then text "success" shown
6***. If value of third progressbar >= 75, then text "danger" shown

Variations:
-----------
2*. User scroll to Dynamic sub-menu
