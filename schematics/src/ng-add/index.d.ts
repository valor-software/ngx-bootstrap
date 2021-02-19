/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Rule, Tree } from '@angular-devkit/schematics';
import { Schema } from './schema';
export default function (options: Schema): Rule;
export declare function addStyles(options: Schema, insertStyle: Function): (host: Tree) => Tree;
