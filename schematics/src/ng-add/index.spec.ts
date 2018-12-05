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
import { getWorkspace } from '@schematics/angular/utility/config';

import {
  createTestApp,
  expectProjectStyleFile,
  getProjectFromWorkspace,
  removePackageJsonDependency
} from '../utils';


describe('ng-add schematic', () => {
  let runner: SchematicTestRunner;
  let appTree: Tree;

  beforeEach(() => {
    runner = new SchematicTestRunner('schematics', require.resolve('../collection.json'));
    appTree = createTestApp(runner);
  });

  it('should update package.json', () => {
    removePackageJsonDependency(appTree, 'bootstrap');

    const tree = runner.runSchematic('ng-add', {}, appTree);
    const packageJson = JSON.parse(getFileContent(tree, '/package.json'));
    const dependencies = packageJson.dependencies;

    expect(dependencies.bootstrap).toBeDefined();
    expect(dependencies['ngx-bootstrap']).toBeDefined();

    expect(Object.keys(dependencies)).toEqual(Object.keys(dependencies).sort(),
      'Expected the modified "dependencies" to be sorted alphabetically.');
  });

  it('should add bootstrap style', () => {
    const tree = runner.runSchematic('ng-add', {}, appTree);

    const workspace = getWorkspace(tree);
    const project = getProjectFromWorkspace(workspace);

    expectProjectStyleFile(project, './node_modules/bootstrap/dist/css/bootstrap.min.css');
  });
});
