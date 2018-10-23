"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
const schematics_1 = require("@angular-devkit/schematics");
const config_1 = require("@schematics/angular/utility/config");
const utils_1 = require("../utils");
const ng_ast_utils_1 = require("@schematics/angular/utility/ng-ast-utils");
const project_main_file_1 = require("../utils/project-main-file");
const ng_module_imports_1 = require("../utils/ng-module-imports");
const bootstrapStylePath = `./node_modules/bootstrap/dist/css/bootstrap.css`;
const datePickerStylePath = `./node_modules/ngx-bootstrap/datepicker/bs-datepicker.css`;
/* tslint:disable-next-line: no-default-export */
function default_1(options) {
    return schematics_1.chain([
        addStyles(options),
        addPackageJsonDependencies(),
        utils_1.installPackageJsonDependencies(),
        options.component ? addModuleOfComponent(options.project, options.component) : schematics_1.noop()
    ]);
}
exports.default = default_1;
function addModuleOfComponent(projectName, componentName) {
    const components = {
        accordion: { moduleName: 'AccordionModule', link: 'ngx-bootstrap/accordion' },
        alerts: { moduleName: 'AlertModule', link: 'ngx-bootstrap/alert' },
        buttons: { moduleName: 'ButtonsModule', link: 'ngx-bootstrap/buttons' },
        carousel: { moduleName: 'CarouselModule', link: 'ngx-bootstrap/carousel' },
        collapse: { moduleName: 'CollapseModule', link: 'ngx-bootstrap/collapse' },
        datepicker: { moduleName: 'BsDatepickerModule', link: 'ngx-bootstrap/datepicker' },
        dropdowns: { moduleName: 'BsDropdownModule', link: 'ngx-bootstrap/dropdown' },
        modals: { moduleName: 'ModalModule', link: 'ngx-bootstrap/modal' },
        pagination: { moduleName: 'PaginationModule', link: 'ngx-bootstrap/pagination' },
        popover: { moduleName: 'PopoverModule', link: 'ngx-bootstrap/popover' },
        progressbar: { moduleName: 'ProgressbarModule', link: 'ngx-bootstrap/progressbar' },
        rating: { moduleName: 'RatingModule', link: 'ngx-bootstrap/rating' },
        sortable: { moduleName: 'SortableModule', link: 'ngx-bootstrap/sortable' },
        tabs: { moduleName: 'TabsModule', link: 'ngx-bootstrap/tabs' },
        timepicker: { moduleName: 'TimepickerModule', link: 'ngx-bootstrap/timepicker' },
        tooltip: { moduleName: 'TooltipModule', link: 'ngx-bootstrap/tooltip' },
        typeahead: { moduleName: 'TypeaheadModule', link: 'ngx-bootstrap/typeahead' }
    };
    return (host) => {
        const workspace = config_1.getWorkspace(host);
        const project = utils_1.getProjectFromWorkspace(workspace, projectName);
        const appModulePath = ng_ast_utils_1.getAppModulePath(host, project_main_file_1.getProjectMainFile(project));
        if (componentName && components[componentName]) {
            if (ng_module_imports_1.hasNgModuleImport(host, appModulePath, components[componentName].moduleName)) {
                /* tslint:disable-next-line: no-console */
                return console.warn(`Could not set up ${components[componentName].moduleName} because it already imported.`);
            }
            utils_1.addModuleImportToRootModule(host, `${components[componentName].moduleName}.forRoot()`, components[componentName].link, project);
        }
        return host;
    };
}
function addPackageJsonDependencies() {
    return (host, context) => {
        const dependencies = [
            { name: 'bootstrap', version: '4.1.1' },
            { name: 'ngx-bootstrap', version: '3.0.1' }
        ];
        dependencies.forEach(dependency => {
            utils_1.addPackageToPackageJson(host, dependency.name, `^${dependency.version}`);
            context.logger.log('info', `✅️ Added "${dependency.name}`);
        });
        return host;
    };
}
function addStyles(options) {
    return function (host) {
        const workspace = config_1.getWorkspace(host);
        const project = utils_1.getProjectFromWorkspace(workspace, options.project);
        insertStyle(project, host, workspace);
        return host;
    };
}
exports.addStyles = addStyles;
function insertStyle(project, host, workspace) {
    utils_1.addStyleToTarget(project, 'build', host, datePickerStylePath, workspace);
    utils_1.addStyleToTarget(project, 'test', host, datePickerStylePath, workspace);
    utils_1.addStyleToTarget(project, 'build', host, bootstrapStylePath, workspace);
    utils_1.addStyleToTarget(project, 'test', host, bootstrapStylePath, workspace);
}
//# sourceMappingURL=index.js.map