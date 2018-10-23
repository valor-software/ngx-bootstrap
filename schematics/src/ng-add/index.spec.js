"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@schematics/angular/utility/test");
const testing_1 = require("@angular-devkit/schematics/testing");
const config_1 = require("@schematics/angular/utility/config");
const utils_1 = require("../utils");
describe('ng-add schematic', () => {
    let runner;
    let appTree;
    beforeEach(() => {
        runner = new testing_1.SchematicTestRunner('schematics', require.resolve('../collection.json'));
        appTree = utils_1.createTestApp(runner);
    });
    it('should update package.json', () => {
        utils_1.removePackageJsonDependency(appTree, 'bootstrap');
        const tree = runner.runSchematic('ng-add', {}, appTree);
        const packageJson = JSON.parse(test_1.getFileContent(tree, '/package.json'));
        const dependencies = packageJson.dependencies;
        /* tslint:disable-next-line: no-string-literal */
        expect(dependencies['bootstrap']).toBeDefined();
        expect(dependencies['ngx-bootstrap']).toBeDefined();
        expect(Object.keys(dependencies)).toEqual(Object.keys(dependencies).sort(), 'Expected the modified "dependencies" to be sorted alphabetically.');
    });
    it('should add bootstrap style', () => {
        const tree = runner.runSchematic('ng-add', {}, appTree);
        const workspace = config_1.getWorkspace(tree);
        const project = utils_1.getProjectFromWorkspace(workspace);
        utils_1.expectProjectStyleFile(project, './node_modules/bootstrap/dist/css/bootstrap.css');
    });
});
//# sourceMappingURL=index.spec.js.map