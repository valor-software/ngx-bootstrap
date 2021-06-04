/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

// import { ProjectDefinition } from '@angular-devkit/core/src/workspace';
import { WorkspaceProject } from '@schematics/angular/utility/workspace-models';

/** Resolves the architect options for the build target of the given project. */
export function getProjectTargetOptions(project: WorkspaceProject, buildTarget: string) {
  console.log('PROJECT ARCHITECT', project.architect[buildTarget].options);

  if (
    !project.architect ||
    !project.architect[buildTarget] ||
    !project.architect[buildTarget].options ||
    !project.architect[buildTarget].options.main
  ) {
    throw new Error(`Cannot determine project target configuration for: ${buildTarget}.`);
  }
  return project.architect[buildTarget].options


  // if (project.targets &&
  //   project.targets[buildTarget] &&
  //   project.targets[buildTarget].options) {
  //
  //   return project.targets[buildTarget].options;
  // }
  //
  // throw new Error(`Cannot determine project target configuration for: ${buildTarget}.`);


}
