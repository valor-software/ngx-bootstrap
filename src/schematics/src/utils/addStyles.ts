import { Tree } from '@angular-devkit/schematics';
import { JsonArray, JsonObject, workspaces } from '@angular-devkit/core';
import { getProjectStyleFile } from './getVersions';
import { getProjectTargetOptions } from './index';
import path = require('path');

const DEFAULT_STYLE_EXTENSION = 'css';

interface availablePaths {
  'css': string[];
  'scss': string[];
}
export function addStyles(project: workspaces.ProjectDefinition, targetName: string, host: Tree, availableAssetPaths: availablePaths, projectName: string, extension?: string): Tree {
    let targetOptions = getProjectTargetOptions(project, targetName);
    const styles = (targetOptions.styles as JsonArray | undefined);
    if (!styles || (styles instanceof Array && !styles.length)) {
      targetOptions = addEmptyStyles(targetOptions, extension, availableAssetPaths);
      return setUpdatedTargetOptions(host, project, targetOptions, targetName, projectName);
    }

    const existingStyles = styles.map((s) => typeof s === 'string' ? s : s['input']);
    const styleFilePath = getProjectStyleFile(existingStyles, extension) || '';
    const styleFileExtension = normalizeExtension(path.extname(styleFilePath), extension, DEFAULT_STYLE_EXTENSION);
    const styleFilePatch = availableAssetPaths[styleFileExtension]?.[0];

    if (!styleFilePath && styleFileExtension !== 'css' && styleFileExtension !== 'scss') {
      return host;
    }

    if (styleFileExtension === 'scss') {
      return addImportToStylesFile(host, styleFilePath, styleFilePatch);
    }

    if (styleFileExtension === 'css') {
      targetOptions = addStylesPathsToTargetOptions(targetOptions, existingStyles, styleFilePatch);
      return setUpdatedTargetOptions(host, project, targetOptions, targetName, projectName);
    }
    return host;
}

function addStylesPathsToTargetOptions(targetOptions: any, existingStyles: string[], stylePatch: string): Record<string, string | number | boolean | JsonArray | JsonObject> {
  if (!existingStyles.some(path => path === stylePatch)) {
    targetOptions.styles?.unshift?.(stylePatch);
  }
  return targetOptions;
}

function addEmptyStyles(targetOptions: Record<string, string | number | boolean | JsonArray | JsonObject>, extension: string, availableAssetPaths: availablePaths) {
  targetOptions.styles = availableAssetPaths[DEFAULT_STYLE_EXTENSION];
  return targetOptions;
}

function addImportToStylesFile(host: Tree, styleFilePath: string, styleFilePatch: string): Tree {
  const styleContent = host.read(styleFilePath) !.toString('utf-8');
  if (!styleContent.includes(styleFilePatch)) {
    const recorder = host.beginUpdate(styleFilePath);
    recorder.insertRight(styleContent.length, styleFilePatch);
    host.commitUpdate(recorder);
  }

  return host;
}

function setUpdatedTargetOptions(host: Tree, project: workspaces.ProjectDefinition, targetOptions: Record<string, string | number | boolean | JsonArray | JsonObject>, targetName: string, projectName: string): Tree {
  if (host.exists('angular.json')) {
    const currentAngular = JSON.parse(host.read('angular.json')!.toString('utf-8'));
    if (currentAngular['projects'][projectName].targets) {
      currentAngular['projects'][projectName].targets[targetName]['options'] = targetOptions;
    }

    if (currentAngular['projects'][projectName].architect) {
      currentAngular['projects'][projectName].architect[targetName]['options'] = targetOptions;
    }
    host.overwrite('angular.json', JSON.stringify(currentAngular, null, 2));
  }
  return host;
}

// extension in path could be with .
function normalizeExtension(pathExtension: string, extension: string, defaultValue: string): string {
  if (!pathExtension) {
    return defaultValue;
  }

  if (extension) {
    return extension;
  }

  const res = pathExtension.split('.');
  if (res?.length > 1) {
    pathExtension = pathExtension.replace('.', '');
  }
  return pathExtension;
}
