/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { workspaces } from '@angular-devkit/core';
import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import { getAppModulePath } from '@schematics/angular/utility/ng-ast-utils';
import { addModuleImportToRootModule, addPackageToPackageJson } from '../utils';
import { hasNgModuleImport } from '../utils/ng-module-imports';
import { getProjectMainFile } from '../utils/project-main-file';
import { Schema } from './schema';
import { addStyles } from '../utils/addStyles';
import { getDependencies } from '../utils/getVersions';
import { getWorkspace } from '@schematics/angular/utility/workspace';

const datepickerComponentName = 'datepicker';
const bsName = 'ngx-bootstrap';
const BOOTSTRAP_AVAILABLE_STYLES = {
  'css': [`./node_modules/bootstrap/dist/css/bootstrap.min.css`],
  'scss': [`
/* Importing Bootstrap SCSS file. */
@import "~bootstrap/scss/bootstrap";
`]
};
const DATEPICKER_AVAILABLESTYLES = {
  'css': [`./node_modules/ngx-bootstrap/datepicker/bs-datepicker.css`],
  'scss': [`
/* Importing Datepicker SCSS file. */
@import "~ngx-bootstrap/datepicker/bs-datepicker";
`]
};

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
  const componentName = options.component
    ? options.component
    : options['--'] && options['--'][1];

  return async (tree: Tree, context: SchematicContext) => {
    const workspace = await getWorkspace(tree);
    const projectName = options.project || workspace.extensions.defaultProject !.toString();
    const project = workspace.projects.get(projectName);

    addPackageJsonDependencies(tree, context);
    if (!componentName || componentName === datepickerComponentName || !components[componentName]) {
      insertCommonStyles(project, tree, projectName, options.stylesExtension);
    } else {
      insertBootstrapStyles(project, tree, projectName, options.stylesExtension);
    }

    context.addTask(new NodePackageInstallTask());
    if (componentName) {
      addModuleOfComponent(project, tree, context, componentName);
    }

    addAnimationModule(project, tree, context, componentName);
  };
}

function addModuleOfComponent(project: workspaces.ProjectDefinition, host: Tree, context: SchematicContext, componentName: string): Rule {
  if (!project) {
    return;
  }

  const appModulePath = getAppModulePath(host, getProjectMainFile(project));
  if (componentName && components[componentName]) {
    if (hasNgModuleImport(host, appModulePath, components[componentName].moduleName)) {
      context.logger.warn(`Could not set up ${components[componentName].moduleName} because it already imported.`);
      return;
    }
    addModuleImportToRootModule(
      host, `${components[componentName].moduleName}.forRoot()`, components[componentName].link, project
    );
  }
}

function addPackageJsonDependencies(host: Tree, context: SchematicContext): Tree {
  const dependencies = getDependencies(host);
  dependencies.forEach(dependency => {
    addPackageToPackageJson(host, dependency.name, `${dependency.version}`);
    context.logger.log('info', `✅️ Added "${dependency.name}`);
  });
  return host;
}

function insertBootstrapStyles(project: workspaces.ProjectDefinition, host: Tree, projectName: string, extension?: string ): Tree {
  if (!project) {
    return;
  }

  return addStyles(project, 'build', host, BOOTSTRAP_AVAILABLE_STYLES, projectName, extension);
}

function insertCommonStyles(project: workspaces.ProjectDefinition, host: Tree, projectName: string, extension?: string): Tree {
  if (!project) {
    return;
  }

  insertBootstrapStyles(project, host, projectName, extension);
  return addStyles(project, 'build', host, DATEPICKER_AVAILABLESTYLES, projectName, extension);
}

function addAnimationModule(project: workspaces.ProjectDefinition, host: Tree, context: SchematicContext, componentName: string): Rule {
  if (!project || !(!componentName || components[componentName]?.animated)) {
    return;
  }

  addModuleImportToRootModule(host, 'BrowserAnimationsModule', '@angular/platform-browser/animations', project);
}

export function checkComponentName(componentName: string): boolean {
  return !!components[componentName];
}
