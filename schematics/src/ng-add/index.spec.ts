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

import * as path from 'path';


describe('ng-add schematic', () => {
  let runner: SchematicTestRunner;
  let appTree: Tree;

  beforeEach(async() => {
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

        expect(Object.keys(dependencies)).toEqual(Object.keys(dependencies).sort(),
          'Expected the modified "dependencies" to be sorted alphabetically.');

    });

  it('should add bootstrap style', async () => {
    const tree = await runner
      .runSchematicAsync('ng-add', {}, appTree)
      .toPromise();

        const workspace = getWorkspace(tree);
        const project = getProjectFromWorkspace(workspace);

        expectProjectStyleFile(project, './node_modules/bootstrap/dist/css/bootstrap.min.css');
  });
});
