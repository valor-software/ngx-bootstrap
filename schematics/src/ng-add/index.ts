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


const bootstrapStylePath =  `./node_modules/bootstrap/dist/css/bootstrap.min.css`;
const datePickerStylePath =  `./node_modules/ngx-bootstrap/datepicker/bs-datepicker.css`;
const datepickerComponentName = 'datepicker';
const accordionComponentName = 'accordion';
const collapseComponentName = 'collapse';

/* tslint:disable-next-line: no-default-export */
export default function (options: Schema): Rule {
  const componentName = options.component
    ? options.component
    : (options as any)['--'] && (options as any)['--'][1];

  return chain([
    addPackageJsonDependencies(),
    installPackageJsonDependencies(),
    !componentName || componentName === datepickerComponentName
      ? addStyles(options, insertCommonStyles)
      : addStyles(options, insertBootstrapStyles),
    componentName
      ? addModuleOfComponent(options.project, componentName)
      : noop(),
    addAnimationModule(options.project, componentName)
  ]);
}

function addModuleOfComponent(projectName: string | undefined, componentName: string) {
  const bsName = 'ngx-bootstrap';

  const components: { [key: string]: { moduleName: string; link: string } } = {
    accordion:   { moduleName: 'AccordionModule',    link: `${bsName}/accordion` },
    alerts:      { moduleName: 'AlertModule',        link: `${bsName}/alert` },
    buttons:     { moduleName: 'ButtonsModule',      link: `${bsName}/buttons` },
    carousel:    { moduleName: 'CarouselModule',     link: `${bsName}/carousel` },
    collapse:    { moduleName: 'CollapseModule',     link: `${bsName}/collapse` },
    datepicker:  { moduleName: 'BsDatepickerModule', link: `${bsName}/datepicker` },
    dropdowns:   { moduleName: 'BsDropdownModule',   link: `${bsName}/dropdown` },
    modals:      { moduleName: 'ModalModule',        link: `${bsName}/modal` },
    pagination:  { moduleName: 'PaginationModule',   link: `${bsName}/pagination` },
    popover:     { moduleName: 'PopoverModule',      link: `${bsName}/popover` },
    progressbar: { moduleName: 'ProgressbarModule',  link: `${bsName}/progressbar` },
    rating:      { moduleName: 'RatingModule',       link: `${bsName}/rating` },
    sortable:    { moduleName: 'SortableModule',     link: `${bsName}/sortable` },
    tabs:        { moduleName: 'TabsModule',         link: `${bsName}/tabs` },
    timepicker:  { moduleName: 'TimepickerModule',   link: `${bsName}/timepicker` },
    tooltip:     { moduleName: 'TooltipModule',      link: `${bsName}/tooltip` },
    typeahead:   { moduleName: 'TypeaheadModule',    link: `${bsName}/typeahead` }
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
      { name: 'ngx-bootstrap', version: '^4.1.1' }
    ];

    dependencies.forEach(dependency => {
      addPackageToPackageJson(host, dependency.name, `${dependency.version}`);
      context.logger.log('info', `✅️ Added "${dependency.name}`);
    });

    return host;
  };
}

export function addStyles(options: Schema, insertStyle: Function): (host: Tree) => Tree {
  return function (host: Tree): Tree {
    const workspace = getWorkspace(host);
    const project = getProjectFromWorkspace(workspace, options.project);

    insertStyle(project, host, workspace);

    return host;
  };
}

function insertBootstrapStyles(project: WorkspaceProject, host: Tree, workspace: WorkspaceSchema) {
  addStyleToTarget(project, 'build', host, bootstrapStylePath, workspace);
  addStyleToTarget(project, 'test', host, bootstrapStylePath, workspace);
}

function insertCommonStyles(project: WorkspaceProject, host: Tree, workspace: WorkspaceSchema) {
  addStyleToTarget(project, 'build', host, datePickerStylePath, workspace);
  addStyleToTarget(project, 'test', host, datePickerStylePath, workspace);

  insertBootstrapStyles(project, host, workspace);
}

function addAnimationModule(projectName: string | undefined, componentName: string) {
  return (host: Tree) => {
    if (!(!componentName || componentName === accordionComponentName || componentName === collapseComponentName)) {
      return host;
    }

    const workspace = getWorkspace(host);
    const project = getProjectFromWorkspace(workspace, projectName);

    addModuleImportToRootModule(host, 'BrowserAnimationsModule', '@angular/platform-browser/animations', project);

    return host;
  };
}
