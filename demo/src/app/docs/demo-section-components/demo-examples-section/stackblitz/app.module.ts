export interface NgxModuleData {
  moduleName: string;
  moduleFolder: string;
}


export function getAppModuleCode(className: string, moduleData: NgxModuleData) {
  return `import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ${moduleData.moduleName} } from 'ngx-bootstrap/${moduleData.moduleFolder}';

import { ${className} } from './ngx-bootstrap-demo.component'
@NgModule({
  declarations: [${className}],
  imports: [
    ${moduleData.moduleName}.forRoot(),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule
  ],
  entryComponents: [],
  bootstrap: [${className}]
})
export class AppModule {
}
`;
}
