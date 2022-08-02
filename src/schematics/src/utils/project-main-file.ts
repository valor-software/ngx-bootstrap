/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import { SchematicsException } from '@angular-devkit/schematics';
import { getProjectTargetOptions } from './project-targets';
import { workspaces } from '@angular-devkit/core';

/** Looks for the main TypeScript file in the given project and returns its path. */
export function getProjectMainFile(project: workspaces.ProjectDefinition): string {
  const buildOptions = getProjectTargetOptions(project, 'build');
  if (!buildOptions.main) {
    throw new SchematicsException(`Could not find the project main file inside of the ` +
      `workspace config (${project.sourceRoot})`);
  }

  return buildOptions.main.toString();
}
