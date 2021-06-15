/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { JsonArray } from '@angular-devkit/core';
import { WorkspaceDefinition } from '@angular-devkit/core/src/workspace';
import { SchematicsException, Tree, Rule } from '@angular-devkit/schematics';
import { SchematicTestRunner, UnitTestTree } from '@angular-devkit/schematics/testing';
import { addImportToModule } from '@schematics/angular/utility/ast-utils';
import { Change, InsertChange } from '@schematics/angular/utility/change';
import { getAppModulePath } from '@schematics/angular/utility/ng-ast-utils';
import { getFileContent } from '@schematics/angular/utility/test';
import { updateWorkspace } from '@schematics/angular/utility/workspace';
import * as ts from 'typescript';
import { getProjectMainFile } from './project-main-file';
import {
  BrowserBuilderOptions,
  TestBuilderOptions,
  WorkspaceProject,
  WorkspaceSchema
} from '@schematics/angular/utility/workspace-models';
import { getWorkspacePath } from '@nrwl/workspace';
import { parse } from 'jsonc-parser';
import { getProjectStyleFile } from '../utils/getVersions';
import path = require("path");
interface availablePaths {
  type?: string;
  '.css': string[];
  '.scss': string[];
}

export function addStyleToTarget(project: WorkspaceProject, targetName: string, host: Tree,
                                 availableAssetPaths: availablePaths, workspace: WorkspaceDefinition, extension?: string) {

  const targetOptions = getProjectTargetOptions(project, targetName);
  const styles = (targetOptions.styles as JsonArray | undefined);
  if (!styles) {
    if (!extension) {
      targetOptions.styles = availableAssetPaths[extension];
    }
    targetOptions.styles = availableAssetPaths['.css'];
  } else {
    const existingStyles = styles.map((s) => typeof s === 'string' ? s : s['input']);
    const styleFilePath = getProjectStyleFile(existingStyles, extension) || '';
    const styleFileExtension = path.extname(styleFilePath);
    const styleFilePatch = availableAssetPaths[styleFileExtension];
    for (const[, stylePath] of existingStyles.entries()) {
      // If the given asset is already specified in the styles, we don't need to do anything.
      if (Object.keys(availableAssetPaths).some(key => availableAssetPaths[key] === stylePath)) {
        return () => host;
      } else {
        console.log('AVAILABLE ASSETPATH type', availableAssetPaths.type);
        console.log('styleFileExtension', styleFileExtension);

        if (availableAssetPaths.type && styleFileExtension === '.scss') {
          return addBootstrapToStylesFile(styleFilePath, styleFilePatch)
        } else {
          styles.unshift(styleFilePatch[0]);
          console.log('STYLES',styles);
        }
      }
      console.log('STYLES 2222',styles);
    }
  }
  // host.overwrite('angular.json', JSON.stringify(workspace, null, 2));
  return updateWorkspace(workspace);
}

function addBootstrapToStylesFile(styleFilePath: string, styleFilePatch: string): Rule {
  console.log('there there there 11111111')
  return (host: Tree) => {
    console.log('there there there')
    const styleContent = host.read(styleFilePath) !.toString('utf-8');

    const recorder = host.beginUpdate(styleFilePath);
    recorder.insertRight(styleContent.length, styleFilePatch);
    console.log('RECORDER', recorder);
    host.commitUpdate(recorder);
  };
}

export function getProjectTargetOptions(project: WorkspaceProject, buildTarget: string): BrowserBuilderOptions | TestBuilderOptions{
  if (project?.targets?.get(buildTarget)?.options) {
    return project.targets.get(buildTarget).options;
  }

  if (project?.architect && project.architect[buildTarget]?.options) {
    return project.architect[buildTarget].options
  }

  throw new Error(`Cannot determine project target configuration for: ${buildTarget}.`);
}

function sortObjectByKeys(obj: { [key: string]: string }) {
  return Object
    .keys(obj)
    .sort()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .reduce((result: any, key: any) => (
      result[key] = obj[key]
    ) && result, {});
}

export function addPackageToPackageJson(host: Tree, pkg: string, version: string): Tree {
  if (host.exists('package.json')) {
    const sourceText = host.read('package.json')?.toString('utf-8');
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

export function getProjectFromWorkSpace(workspace: WorkspaceSchema, projectName?: string): WorkspaceProject {
  const finalProjectName = projectName || workspace.defaultProject;
  if (!finalProjectName) {
    throw new Error(`Could not find project in workspace: ${projectName}`);
  }

  const project = workspace.projects[finalProjectName];
  if (!project) {
    throw new Error(`Could not find project in workspace: ${projectName}`);
  }

  return project;
}

export function getWorkspace (host: Tree) {
  const path = getWorkspacePath(host);
  const configBuffer = host.read(path);
  if (configBuffer === null) {
    throw new SchematicsException(`Could not find (${path})`);
  }

  const content = configBuffer.toString();
  return parse(content);
}

