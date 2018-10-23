/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Tree } from '@angular-devkit/schematics';
/**
 * Whether the Angular module in the given path imports the specifed module class name.
 */
export declare function hasNgModuleImport(tree: Tree, modulePath: string, className: string): boolean;
