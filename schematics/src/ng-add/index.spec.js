"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@schematics/angular/utility/test");
const testing_1 = require("@angular-devkit/schematics/testing");
const config_1 = require("@schematics/angular/utility/config");
const utils_1 = require("../utils");
const path = require("path");
describe('ng-add schematic', () => {
    let runner;
    let appTree;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        runner = new testing_1.SchematicTestRunner('schematics', path.join(__dirname, '../collection.json'));
        appTree = yield utils_1.createTestApp(runner);
    }));
    it('should update package.json', () => __awaiter(void 0, void 0, void 0, function* () {
        utils_1.removePackageJsonDependency(appTree, 'bootstrap');
        const tree = yield runner
            .runSchematicAsync('ng-add', {}, appTree)
            .toPromise();
        const packageJson = JSON.parse(test_1.getFileContent(tree, '/package.json'));
        const dependencies = packageJson.dependencies;
        expect(dependencies.bootstrap).toBeDefined();
        expect(dependencies['ngx-bootstrap']).toBeDefined();
        expect(Object.keys(dependencies)).toEqual(Object.keys(dependencies).sort(), 'Expected the modified "dependencies" to be sorted alphabetically.');
    }));
    it('should add bootstrap style', () => __awaiter(void 0, void 0, void 0, function* () {
        const tree = yield runner
            .runSchematicAsync('ng-add', {}, appTree)
            .toPromise();
        const workspace = config_1.getWorkspace(tree);
        const project = utils_1.getProjectFromWorkspace(workspace);
        utils_1.expectProjectStyleFile(project, './node_modules/bootstrap/dist/css/bootstrap.min.css');
    }));
});
//# sourceMappingURL=index.spec.js.map