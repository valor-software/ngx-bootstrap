/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import { chain, noop, Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { getWorkspace } from '@schematics/angular/utility/config';
import { Schema } from './schema';
import { WorkspaceProject, WorkspaceSchema } from '@angular-devkit/core/src/workspace';

import {
  addModuleImportToRootModule,
  addPackageToPackageJson,
  addStyleToTarget,
  getProjectFromWorkspace,
  installPackageJsonDependencies
} from '../utils';

import { getAppModulePath } from '@schematics/angular/utility/ng-ast-utils';
import { getProjectMainFile } from '../utils/project-main-file';
import { hasNgModuleImport } from '../utils/ng-module-imports';


const bootstrapStylePath =  `./node_modules/bootstrap/dist/css/bootstrap.css`;
const datePickerStylePath =  `./node_modules/ngx-bootstrap/datepicker/bs-datepicker.css`;

/* tslint:disable-next-line: no-default-export */
export default function (options: Schema): Rule {
  return chain([
    addStyles(options),
    addPackageJsonDependencies(),
    installPackageJsonDependencies(),
    options.component ? addModuleOfComponent(options.project, options.component) : noop()
  ]);
}

function addModuleOfComponent(projectName: string | undefined, componentName: string) {

  const components: { [key: string]: { moduleName: string; link: string } } = {
    accordion: { moduleName: 'AccordionModule', link: 'ngx-bootstrap/accordion' },
    alerts: { moduleName: 'AlertModule', link: 'ngx-bootstrap/alert' },
    buttons: { moduleName: 'ButtonsModule', link: 'ngx-bootstrap/buttons' },
    carousel: { moduleName: 'CarouselModule', link: 'ngx-bootstrap/carousel' },
    collapse: { moduleName: 'CollapseModule', link: 'ngx-bootstrap/collapse' },
    datepicker: { moduleName: 'BsDatepickerModule', link: 'ngx-bootstrap/datepicker' },
    dropdowns: { moduleName: 'BsDropdownModule', link: 'ngx-bootstrap/dropdown' },
    modals: { moduleName: 'ModalModule', link: 'ngx-bootstrap/modal' },
    pagination: { moduleName: 'PaginationModule', link: 'ngx-bootstrap/pagination' },
    popover: { moduleName: 'PopoverModule', link: 'ngx-bootstrap/popover' },
    progressbar: { moduleName: 'ProgressbarModule', link: 'ngx-bootstrap/progressbar' },
    rating: { moduleName: 'RatingModule', link: 'ngx-bootstrap/rating' },
    sortable: { moduleName: 'SortableModule', link: 'ngx-bootstrap/sortable' },
    tabs: { moduleName: 'TabsModule', link: 'ngx-bootstrap/tabs' },
    timepicker: { moduleName: 'TimepickerModule', link: 'ngx-bootstrap/timepicker' },
    tooltip: { moduleName: 'TooltipModule', link: 'ngx-bootstrap/tooltip' },
    typeahead: { moduleName: 'TypeaheadModule', link: 'ngx-bootstrap/typeahead' }
  };


  return (host: Tree) => {
    const workspace = getWorkspace(host);
    const project = getProjectFromWorkspace(workspace, projectName);
    const appModulePath = getAppModulePath(host, getProjectMainFile(project));

    if (componentName && components[componentName]) {
      if (hasNgModuleImport(host, appModulePath, components[componentName].moduleName)) {
        /* tslint:disable-next-line: no-console */
        return console.warn(`Could not set up ${components[componentName].moduleName} because it already imported.`);
      }

      addModuleImportToRootModule(
        host, `${components[componentName].moduleName}.forRoot()`, components[componentName].link, project
      );
    }

    return host;
  };
}

function addPackageJsonDependencies(): Rule {
  return (host: Tree, context: SchematicContext) => {
    const dependencies: { name: string; version: string }[] = [
      { name: 'bootstrap', version: '4.1.1' },
      { name: 'ngx-bootstrap', version: '3.0.1' }
    ];

    dependencies.forEach(dependency => {
      addPackageToPackageJson(host, dependency.name, `^${dependency.version}`);
      context.logger.log('info', `✅️ Added "${dependency.name}`);
    });

    return host;
  };
}

export function addStyles(options: Schema): (host: Tree) => Tree {
  return function (host: Tree): Tree {
    const workspace = getWorkspace(host);
    const project = getProjectFromWorkspace(workspace, options.project);

    insertStyle(project, host, workspace);

    return host;
  };
}

function insertStyle(project: WorkspaceProject, host: Tree, workspace: WorkspaceSchema) {
  addStyleToTarget(project, 'build', host, datePickerStylePath, workspace);
  addStyleToTarget(project, 'test', host, datePickerStylePath, workspace);
  addStyleToTarget(project, 'build', host, bootstrapStylePath, workspace);
  addStyleToTarget(project, 'test', host, bootstrapStylePath, workspace);
}
