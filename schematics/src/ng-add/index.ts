/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

// import { ProjectDefinition, WorkspaceDefinition } from '@angular-devkit/core/src/workspace';
import { WorkspaceDefinition } from '@angular-devkit/core/src/workspace';

import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';

import { getAppModulePath } from '@schematics/angular/utility/ng-ast-utils';
// import { getWorkspace } from '@schematics/angular/utility/workspace';

import {
  addModuleImportToRootModule,
  addPackageToPackageJson,
  addStyleToTarget,
  getProjectFromWorkSpace,
  getWorkspace
} from '../utils';
import { hasNgModuleImport } from '../utils/ng-module-imports';
import { getProjectMainFile } from '../utils/project-main-file';
import { Schema } from './schema';
import { WorkspaceProject } from '@schematics/angular/utility/workspace-models';
const NGX_BOOTSTRAP_VERSION = '^6.2.0';
const BOOTSTRAP_VERSION = '^4.5.0';

const bootstrapStylePath = `./node_modules/bootstrap/dist/css/bootstrap.min.css`;
const datePickerStylePath = `./node_modules/ngx-bootstrap/datepicker/bs-datepicker.css`;
const datepickerComponentName = 'datepicker';
const bsName = 'ngx-bootstrap';

const components: { [key: string]: { moduleName: string; link: string; animated?: boolean } } = {
  accordion: { moduleName: 'AccordionModule', link: `${bsName}/accordion`, animated: true },
  alerts: { moduleName: 'AlertModule', link: `${bsName}/alert` },
  buttons: { moduleName: 'ButtonsModule', link: `${bsName}/buttons` },
  carousel: { moduleName: 'CarouselModule', link: `${bsName}/carousel` },
  collapse: { moduleName: 'CollapseModule', link: `${bsName}/collapse`, animated: true },
  datepicker: { moduleName: 'BsDatepickerModule', link: `${bsName}/datepicker`, animated: true },
  dropdowns: { moduleName: 'BsDropdownModule', link: `${bsName}/dropdown`, animated: true },
  modals: { moduleName: 'ModalModule', link: `${bsName}/modal` },
  pagination: { moduleName: 'PaginationModule', link: `${bsName}/pagination` },
  popover: { moduleName: 'PopoverModule', link: `${bsName}/popover` },
  progressbar: { moduleName: 'ProgressbarModule', link: `${bsName}/progressbar` },
  rating: { moduleName: 'RatingModule', link: `${bsName}/rating` },
  sortable: { moduleName: 'SortableModule', link: `${bsName}/sortable` },
  tabs: { moduleName: 'TabsModule', link: `${bsName}/tabs` },
  timepicker: { moduleName: 'TimepickerModule', link: `${bsName}/timepicker` },
  tooltip: { moduleName: 'TooltipModule', link: `${bsName}/tooltip` },
  typeahead: { moduleName: 'TypeaheadModule', link: `${bsName}/typeahead`, animated: true }
};

export default function addBsToPackage(options: Schema): Rule {
  console.log('MODULE NAME', options)
  const componentName = options.component
    ? options.component
    : options['--'] && options['--'][1];

  return async (tree: Tree, context: SchematicContext) => {
    const workspace = getWorkspace(tree) as any;
    const projectName = options.project ? options.project : Object.keys(workspace.projects)[0];
    const projectWorkspace = getProjectFromWorkSpace(workspace, projectName);

    addPackageJsonDependencies(tree, context);
    context.addTask(new NodePackageInstallTask());

    if (!componentName || componentName === datepickerComponentName) {
      insertCommonStyles(projectWorkspace, tree, workspace);
    } else {
      insertBootstrapStyles(projectWorkspace, tree, workspace);
    }
    if (componentName) {
      addModuleOfComponent(projectWorkspace, tree, context, componentName);
    }
    addAnimationModule(projectWorkspace, tree, context, componentName);
  };
}

function addModuleOfComponent(project: WorkspaceProject, host: Tree, context: SchematicContext, componentName: string): Rule {
  if (!project) {
    return;
  }

  const appModulePath = getAppModulePath(host, getProjectMainFile(project));

  if (componentName && components[componentName]) {
    console.log('added module', componentName)
    if (hasNgModuleImport(host, appModulePath, components[componentName].moduleName)) {
      context.logger.warn(`Could not set up ${components[componentName].moduleName} because it already imported.`);
      return;
    }
    console.log('addModuleOfComponent missed if', componentName)

    addModuleImportToRootModule(
      host, `${components[componentName].moduleName}.forRoot()`, components[componentName].link, project
    );
  }
}

function addPackageJsonDependencies(host: Tree, context: SchematicContext) {
  const dependencies: { name: string; version: string }[] = [
    { name: 'bootstrap', version: NGX_BOOTSTRAP_VERSION },
    { name: 'ngx-bootstrap', version: BOOTSTRAP_VERSION }
  ];

  dependencies.forEach(dependency => {
    addPackageToPackageJson(host, dependency.name, `${dependency.version}`);
    context.logger.log('info', `✅️ Added "${dependency.name}`);
  });
}

function insertBootstrapStyles(project: WorkspaceProject, host: Tree, workspace: WorkspaceDefinition) {
  if (!project) {
    return;
  }
  addStyleToTarget(project, 'build', host, bootstrapStylePath, workspace);
  addStyleToTarget(project, 'test', host, bootstrapStylePath, workspace);
}

function insertCommonStyles(project: WorkspaceProject, host: Tree, workspace: WorkspaceDefinition) {
  if (!project) {
    return;
  }
  addStyleToTarget(project, 'build', host, datePickerStylePath, workspace);
  addStyleToTarget(project, 'test', host, datePickerStylePath, workspace);

  insertBootstrapStyles(project, host, workspace);
}

function addAnimationModule(project: WorkspaceProject, host: Tree, context: SchematicContext, componentName: string): Rule {
  if (!project || !(!componentName || components[componentName].animated)) {
    return;
  }

  addModuleImportToRootModule(host, 'BrowserAnimationsModule', '@angular/platform-browser/animations', project);
}
