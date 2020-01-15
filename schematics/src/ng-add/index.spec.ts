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

  beforeEach(done => {
    runner = new SchematicTestRunner('schematics', path.join(__dirname, '../collection.json'));
    createTestApp(runner)
      .subscribe((tree: Tree) => {
        appTree = tree;
        done();
      });
  });

  it('should update package.json', done => {
    removePackageJsonDependency(appTree, 'bootstrap');

    runner.runSchematicAsync('ng-add', {}, appTree)
      .subscribe(tree => {
        const packageJson = JSON.parse(getFileContent(tree, '/package.json'));
        const dependencies = packageJson.dependencies;

        expect(dependencies.bootstrap).toBeDefined();
        expect(dependencies['ngx-bootstrap']).toBeDefined();

        expect(Object.keys(dependencies)).toEqual(Object.keys(dependencies).sort(),
          'Expected the modified "dependencies" to be sorted alphabetically.');

        done();
      }, done.fail);
    });

  it('should add bootstrap style', done => {
    runner.runSchematicAsync('ng-add', {}, appTree)
      .subscribe(tree => {
        const workspace = getWorkspace(tree);
        const project = getProjectFromWorkspace(workspace);

        expectProjectStyleFile(project, './node_modules/bootstrap/dist/css/bootstrap.min.css');

        done();
      }, done.fail);
  });
});
