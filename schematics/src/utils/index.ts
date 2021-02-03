/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import * as ts from 'typescript';
import { addImportToModule } from '@schematics/angular/utility/ast-utils';
import { Change, InsertChange } from '@schematics/angular/utility/change';
import { getAppModulePath } from '@schematics/angular/utility/ng-ast-utils';
import { getFileContent } from '@schematics/angular/utility/test/index';
import { getProjectMainFile } from './project-main-file';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import { Rule, SchematicContext, SchematicsException, Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner, UnitTestTree } from '@angular-devkit/schematics/testing';
import { WorkspaceProject, WorkspaceSchema } from '@schematics/angular/utility/workspace-models';

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

export async function createTestApp(runner: SchematicTestRunner, appOptions = {}): Promise<UnitTestTree>  {
  const workspaceTree = await runner
    .runExternalSchematicAsync('@schematics/angular', 'workspace', {
      name: 'workspace',
      version: '8.2.0',
      newProjectRoot: 'projects',
    }).toPromise();

  return runner
    .runExternalSchematicAsync(
      '@schematics/angular',
      'application',
      {
        ...appOptions,
        name: 'ngx-bootstrap',
      },
      workspaceTree,
    ).toPromise();
}

export function removePackageJsonDependency(tree: Tree, dependencyName: string) {
  const packageContent = JSON.parse(getFileContent(tree, '/package.json'));
  delete packageContent.dependencies[dependencyName];
  tree.overwrite('/package.json', JSON.stringify(packageContent, null, 2));
}


export function addModuleImportToRootModule(host: Tree, moduleName: string, src: string, project: WorkspaceProject) {
  const modulePath = getAppModulePath(host, getProjectMainFile(project));
  addModuleImportToModule(host, modulePath, moduleName, src);
}

export function addModuleImportToModule(host: Tree, modulePath: string, moduleName: string, src: string) {

  const moduleSource = getSourceFile(host, modulePath);

  if (!moduleSource) {
    throw new SchematicsException(`Module not found: ${modulePath}`);
  }

  const changes: Change[] = addImportToModule(moduleSource, modulePath, moduleName, src);
  const recorder = host.beginUpdate(modulePath);

  changes.forEach((change: Change) => {
    if (change instanceof InsertChange) {
      recorder.insertLeft(change.pos, change.toAdd);
    }
  });

  host.commitUpdate(recorder);
}

export function getSourceFile(host: Tree, path: string) {
  const buffer = host.read(path);
  if (!buffer) {
    throw new SchematicsException(`Could not find file for path: ${path}`);
  }
  const content = buffer.toString();

  return ts.createSourceFile(path, content, ts.ScriptTarget.Latest, true);
}
