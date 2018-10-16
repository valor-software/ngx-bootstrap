/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import { chain, Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { getWorkspace } from '@schematics/angular/utility/config';
import { Schema } from './schema';
import { WorkspaceProject, WorkspaceSchema } from '@angular-devkit/core/src/workspace';

import {
  addPackageToPackageJson,
  addStyleToTarget,
  getProjectFromWorkspace,
  installPackageJsonDependencies
} from '../utils';

const bootstrapStylePath =  `./node_modules/bootstrap/dist/css/bootstrap.css`;
const datePickerStylePath =  `./node_modules/ngx-bootstrap/datepicker/bs-datepicker.css`;

/* tslint:disable-next-line: no-default-export */
export default function (options: Schema): Rule {
  return chain([
    addStyles(options),
    addPackageJsonDependencies(),
    installPackageJsonDependencies()
  ]);
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

/* tslint:disable-next-line: no-any */
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
