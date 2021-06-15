import {
  BrowserBuilderOptions,
  TestBuilderOptions,
  WorkspaceProject
} from '@schematics/angular/utility/workspace-models';
import { Rule, Tree } from '@angular-devkit/schematics';
import { WorkspaceDefinition } from '@angular-devkit/core/src/workspace';
import { JsonArray } from '@angular-devkit/core';
import { getProjectStyleFile } from './getVersions';
import { updateWorkspace } from '@schematics/angular/utility/workspace';
import { getProjectTargetOptions } from './index';
import path = require("path");

interface availablePaths {
  '.css': string[];
  '.scss': string[];
}

export function addStyles(project: WorkspaceProject, targetName: string, host: Tree, availableAssetPaths: availablePaths, workspace: WorkspaceDefinition, extension?: string): Rule {
    const targetOptions = getProjectTargetOptions(project, targetName);
    const styles = (targetOptions.styles as JsonArray | undefined);
    if (!styles) {
      addEmptyStyles(targetOptions, extension, availableAssetPaths);
      return updateWorkspace(workspace);
    }

    const existingStyles = styles.map((s) => typeof s === 'string' ? s : s['input']);
    if (!existingStyles) {
      return updateWorkspace(workspace);
    }

    const styleFilePath = getProjectStyleFile(existingStyles, extension) || '';
    const styleFileExtension = path.extname(styleFilePath);
    const styleFilePatch = availableAssetPaths[styleFileExtension][0];

    if (!styleFilePath && styleFileExtension !== '.css' && styleFileExtension !== '.scss') {
      console.log('Error');
      return updateWorkspace(workspace);
    }

    if (styleFileExtension === '.scss') {
      return addImportToStylesFile(host, styleFilePath, styleFilePatch, workspace);
    }
    addStylesPaths(styles, existingStyles, styleFilePatch);
    return updateWorkspace(workspace);
}

function addStylesPaths(styles: JsonArray, existingStyles: string[], stylePatch: string): JsonArray {
  for (const[, stylePath] of existingStyles.entries()) {
    if (stylePath === stylePath) {
      return styles;
    }
  };
  return styles;
}

function addEmptyStyles(targetOptions: BrowserBuilderOptions | TestBuilderOptions, extension: string, availableAssetPaths: availablePaths) {
  if (!extension) {
    targetOptions.styles = availableAssetPaths[extension];
  } else {
    targetOptions.styles = availableAssetPaths['.css'];
  }

  return targetOptions;
}

function addImportToStylesFile(host: Tree, styleFilePath: string, styleFilePatch: string, workspace: WorkspaceDefinition) {
      const styleContent = host.read(styleFilePath) !.toString('utf-8');
      const recorder = host.beginUpdate(styleFilePath);
      recorder.insertRight(styleContent.length, styleFilePatch);
      host.commitUpdate(recorder);
      return updateWorkspace(workspace);
}
