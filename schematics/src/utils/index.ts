/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import { getFileContent } from '@schematics/angular/utility/test/index';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import { UnitTestTree } from '@angular-devkit/schematics/testing/schematic-test-runner';
import { WorkspaceProject, WorkspaceSchema } from '@angular-devkit/core/src/workspace';


export function installPackageJsonDependencies(): Rule {
  return (host: Tree, context: SchematicContext) => {
    context.addTask(new NodePackageInstallTask());
    context.logger.log('info', `🔍 Installing packages...`);

    return host;
  };
}

export function addStyleToTarget(project: WorkspaceProject, targetName: string, host: Tree,
                                 assetPath: string, workspace: WorkspaceSchema) {

  const targetOptions = getProjectTargetOptions(project, targetName);

  if (!targetOptions.styles) {
    targetOptions.styles = [assetPath];
  } else {

    const existingStyles = targetOptions.styles
      .map((style: string | { input: string }) => {
        return typeof style === 'string' ? style : style.input;
      });

    const hasBootstrapStyle = existingStyles.find(
      (style: string) => {
        return style.includes(assetPath);
      });

    if (!hasBootstrapStyle) {
      targetOptions.styles.unshift(assetPath);
    }
  }

  host.overwrite('angular.json', JSON.stringify(workspace, null, 2));
}

export function getProjectFromWorkspace(workspace: WorkspaceSchema, projectName?: string): WorkspaceProject {

  /* tslint:disable-next-line: no-non-null-assertion */
  const project = workspace.projects[projectName || workspace.defaultProject!];

  if (!project) {
    throw new Error(`Could not find project in workspace: ${projectName}`);
  }

  return project;
}

export function expectProjectStyleFile(project: WorkspaceProject, filePath: string) {
  expect(getProjectTargetOptions(project, 'build').styles).toContain(filePath,
    `Expected "${filePath}" to be added to the project styles in the workspace.`);
}

export function getProjectTargetOptions(project: WorkspaceProject, buildTarget: string) {
  const targetConfig = project.architect && project.architect[buildTarget] ||
    project.targets && project.targets[buildTarget];

  if (targetConfig && targetConfig.options) {

    return targetConfig.options;
  }

  throw new Error(`Cannot determine project target configuration for: ${buildTarget}.`);
}

function sortObjectByKeys(obj: { [key: string]: string }) {
  return Object
    .keys(obj)
    .sort()
    /* tslint:disable-next-line: no-any */
    .reduce((result: any, key: any) => (
      result[key] = obj[key]
    ) && result, {});
}

export function addPackageToPackageJson(host: Tree, pkg: string, version: string): Tree {

  if (host.exists('package.json')) {
    /* tslint:disable-next-line: no-non-null-assertion */
    const sourceText = host.read('package.json')!.toString('utf-8');
    const json = JSON.parse(sourceText);

    if (!json.dependencies) {
      json.dependencies = {};
    }

    if (!json.dependencies[pkg]) {
      json.dependencies[pkg] = version;
      json.dependencies = sortObjectByKeys(json.dependencies);
    }

    host.overwrite('package.json', JSON.stringify(json, null, 2));
  }

  return host;
}

export function createTestApp(runner: SchematicTestRunner, appOptions = {}): UnitTestTree {
  const workspaceTree = runner.runExternalSchematic('@schematics/angular', 'workspace', {
    name: 'workspace',
    version: '6.0.0',
    newProjectRoot: 'projects'
  });

  return runner.runExternalSchematic('@schematics/angular', 'application',
    {...appOptions, name: 'ngx-bootstrap'}, workspaceTree);
}

export function removePackageJsonDependency(tree: Tree, dependencyName: string) {
  const packageContent = JSON.parse(getFileContent(tree, '/package.json'));
  delete packageContent.dependencies[dependencyName];
  tree.overwrite('/package.json', JSON.stringify(packageContent, null, 2));
}
