/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import * as ts from 'typescript';
import { Rule, Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner, UnitTestTree } from '@angular-devkit/schematics/testing';
import { WorkspaceProject, WorkspaceSchema } from '@schematics/angular/utility/workspace-models';
export declare function installPackageJsonDependencies(): Rule;
export declare function addStyleToTarget(project: WorkspaceProject, targetName: string, host: Tree, assetPath: string, workspace: WorkspaceSchema): void;
export declare function getProjectFromWorkspace(workspace: WorkspaceSchema, projectName?: string): WorkspaceProject;
export declare function expectProjectStyleFile(project: WorkspaceProject, filePath: string): void;
export declare function getProjectTargetOptions(project: WorkspaceProject, buildTarget: string): any;
export declare function addPackageToPackageJson(host: Tree, pkg: string, version: string): Tree;
export declare function createTestApp(runner: SchematicTestRunner, appOptions?: {}): Promise<UnitTestTree>;
export declare function removePackageJsonDependency(tree: Tree, dependencyName: string): void;
export declare function addModuleImportToRootModule(host: Tree, moduleName: string, src: string, project: WorkspaceProject): void;
export declare function addModuleImportToModule(host: Tree, modulePath: string, moduleName: string, src: string): void;
export declare function getSourceFile(host: Tree, path: string): ts.SourceFile;
