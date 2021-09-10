/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { getFileContent } from '@schematics/angular/utility/test';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import { Tree } from '@angular-devkit/schematics';

import { createTestApp, getProjectTargetOptions, removePackageJsonDependency } from '../utils';

import * as path from 'path';
import { getProjectMainFile } from '../utils/project-main-file';
import { getAppModulePath } from '@schematics/angular/utility/ng-ast-utils';
import { checkComponentName } from './index';
import { getWorkspace } from '@schematics/angular/utility/workspace';
import { workspaces } from '@angular-devkit/core';

const defaultOptions = {
  component: 'carousel'
};

export function expectProjectStyleFile(project: workspaces.ProjectDefinition, filePath: string) {
  expect(getProjectTargetOptions(project, 'build').styles).toContain(filePath);
}


describe('ng-add schematic', () => {
  let runner: SchematicTestRunner;
  let appTree: Tree;

  beforeEach(async () => {
    runner = new SchematicTestRunner('schematics', path.join(__dirname, '../collection.json'));
    appTree = await createTestApp(runner);
  });

  it('should update package.json', async () => {
    removePackageJsonDependency(appTree, 'bootstrap');

    const tree = await runner
      .runSchematicAsync('ng-add', {}, appTree)
      .toPromise();


    const packageJson = JSON.parse(getFileContent(tree, '/package.json'));
    const dependencies = packageJson.dependencies;

    expect(dependencies.bootstrap).toBeDefined();
    expect(dependencies['ngx-bootstrap']).toBeDefined();

    expect(Object.keys(dependencies)).toEqual(Object.keys(dependencies).sort());

  });

  xit('should add bootstrap style', async () => {
    const tree = await runner
      .runSchematicAsync('ng-add', {}, appTree)
      .toPromise();

    const workspace = await getWorkspace(tree);
    const projectName = workspace.extensions.defaultProject !.toString();
    const project = workspace.projects.get(projectName);

    expectProjectStyleFile(project, './node_modules/bootstrap/dist/css/bootstrap.min.css');
  });

  it('should import a specific module', async() => {
    const options = {...defaultOptions};
    const tree = await runner
      .runSchematicAsync('ng-add', options, appTree)
      .toPromise();
    const workspace = await getWorkspace(tree);
    const projectName = workspace.extensions.defaultProject !.toString();
    const project = workspace.projects.get(projectName);
    const content = tree.readContent(getAppModulePath(tree, getProjectMainFile(project)));
    expect(checkComponentName(options.component)).toBeTruthy();
    expect(content).toBeTruthy();
    expect(content.includes(`import { CarouselModule } from 'ngx-bootstrap/carousel'`)).toBeTruthy();
  });
});
