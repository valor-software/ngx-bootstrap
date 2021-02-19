/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
export interface Schema {
    project?: string;
    component?: string;
    ModuleOptions?: string;
    module?: string;
    name: string;
    flat?: boolean;
    path?: string;
    skipImport?: boolean;
}
