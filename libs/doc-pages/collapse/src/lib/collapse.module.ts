import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CollapseModule } from 'ngx-bootstrap/collapse';

import { DocsModule } from '@ngx-bootstrap-doc/docs';
import { CollapseSectionComponent } from './collapse-section.component';
import { DEMO_COMPONENTS } from './demos/index';
import { routes } from './demo-collapse.routes';
/*exports*/
export { CollapseSectionComponent } from './collapse-section.component';

@NgModule({
    declarations: [
        CollapseSectionComponent,
        ...DEMO_COMPONENTS
    ],
    imports: [
        CollapseModule,
        CommonModule,
        FormsModule,
        DocsModule,
        RouterModule.forChild(routes)
    ],
    exports: [CollapseSectionComponent]
})
export class DemoCollapseModule {}
