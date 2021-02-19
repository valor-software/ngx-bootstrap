"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.addStyles = void 0;
const schematics_1 = require("@angular-devkit/schematics");
const config_1 = require("@schematics/angular/utility/config");
const utils_1 = require("../utils");
const ng_ast_utils_1 = require("@schematics/angular/utility/ng-ast-utils");
const project_main_file_1 = require("../utils/project-main-file");
const ng_module_imports_1 = require("../utils/ng-module-imports");
const bootstrapStylePath = `./node_modules/bootstrap/dist/css/bootstrap.min.css`;
const datePickerStylePath = `./node_modules/ngx-bootstrap/datepicker/bs-datepicker.css`;
const datepickerComponentName = 'datepicker';
const bsName = 'ngx-bootstrap';
const components = {
    accordion: { moduleName: 'AccordionModule', link: `${bsName}/accordion`, animated: true },
    alerts: { moduleName: 'AlertModule', link: `${bsName}/alert` },
    buttons: { moduleName: 'ButtonsModule', link: `${bsName}/buttons` },
    carousel: { moduleName: 'CarouselModule', link: `${bsName}/carousel` },
    collapse: { moduleName: 'CollapseModule', link: `${bsName}/collapse`, animated: true },
    datepicker: { moduleName: 'BsDatepickerModule', link: `${bsName}/datepicker`, animated: true },
    dropdowns: { moduleName: 'BsDropdownModule', link: `${bsName}/dropdown`, animated: true },
    modals: { moduleName: 'ModalModule', link: `${bsName}/modal` },
    pagination: { moduleName: 'PaginationModule', link: `${bsName}/pagination` },
    popover: { moduleName: 'PopoverModule', link: `${bsName}/popover` },
    progressbar: { moduleName: 'ProgressbarModule', link: `${bsName}/progressbar` },
    rating: { moduleName: 'RatingModule', link: `${bsName}/rating` },
    sortable: { moduleName: 'SortableModule', link: `${bsName}/sortable` },
    tabs: { moduleName: 'TabsModule', link: `${bsName}/tabs` },
    timepicker: { moduleName: 'TimepickerModule', link: `${bsName}/timepicker` },
    tooltip: { moduleName: 'TooltipModule', link: `${bsName}/tooltip` },
    typeahead: { moduleName: 'TypeaheadModule', link: `${bsName}/typeahead`, animated: true }
};
/* tslint:disable-next-line: no-default-export */
function default_1(options) {
    const componentName = options.component
        ? options.component
        : options['--'] && options['--'][1];
    return schematics_1.chain([
        addPackageJsonDependencies(),
        utils_1.installPackageJsonDependencies(),
        !componentName || componentName === datepickerComponentName
            ? addStyles(options, insertCommonStyles)
            : addStyles(options, insertBootstrapStyles),
        componentName
            ? addModuleOfComponent(options.project, componentName)
            : schematics_1.noop(),
        addAnimationModule(options.project, componentName)
    ]);
}
exports.default = default_1;
function addModuleOfComponent(projectName, componentName) {
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
            { name: 'ngx-bootstrap', version: '^4.1.1' }
        ];
        dependencies.forEach(dependency => {
            utils_1.addPackageToPackageJson(host, dependency.name, `${dependency.version}`);
            context.logger.log('info', `✅️ Added "${dependency.name}`);
        });
        return host;
    };
}
function addStyles(options, insertStyle) {
    return function (host) {
        const workspace = config_1.getWorkspace(host);
        const project = utils_1.getProjectFromWorkspace(workspace, options.project);
        insertStyle(project, host, workspace);
        return host;
    };
}
exports.addStyles = addStyles;
function insertBootstrapStyles(project, host, workspace) {
    utils_1.addStyleToTarget(project, 'build', host, bootstrapStylePath, workspace);
    utils_1.addStyleToTarget(project, 'test', host, bootstrapStylePath, workspace);
}
function insertCommonStyles(project, host, workspace) {
    utils_1.addStyleToTarget(project, 'build', host, datePickerStylePath, workspace);
    utils_1.addStyleToTarget(project, 'test', host, datePickerStylePath, workspace);
    insertBootstrapStyles(project, host, workspace);
}
function addAnimationModule(projectName, componentName) {
    return (host) => {
        if (!(!componentName || components[componentName].animated)) {
            return host;
        }
        const workspace = config_1.getWorkspace(host);
        const project = utils_1.getProjectFromWorkspace(workspace, projectName);
        utils_1.addModuleImportToRootModule(host, 'BrowserAnimationsModule', '@angular/platform-browser/animations', project);
        return host;
    };
}
//# sourceMappingURL=index.js.map