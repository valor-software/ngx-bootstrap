/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import { WorkspaceProject } from '@schematics/angular/utility/workspace-models';

/** Resolves the architect options for the build target of the given project. */
export function getProjectTargetOptions(project: WorkspaceProject, buildTarget: string) {
  if (!project?.architect?.[buildTarget]?.options?.main) {
    throw new Error(`Cannot determine project target configuration for: ${buildTarget}.`);
  }
  return project.architect[buildTarget].options;
}
