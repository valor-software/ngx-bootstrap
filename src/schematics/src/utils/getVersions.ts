import { normalize } from '@angular-devkit/core';
import { Tree } from '@angular-devkit/schematics';
import * as currentVersions from './current_dependency_versions.json';

const NGX_BOOTSTRAP_VERSION = currentVersions.NGX_BOOTSTRAP_VERSION;
const BOOTSTRAP_VERSION = currentVersions.BOOTSTRAP_VERSION;

// Regular expression that matches all possible Angular CLI default style files
const defaultStyleFileRegex = /styles\.(c|le|sc|sa)ss/;
// Regular expression that matches all files that have a proper stylesheet extension
const validStyleFileRegex = /\.(c|le|sc|sa)ss/;

export function getDependencies(host: Tree): { name: string, version: string }[] {
  return [
    { name: 'bootstrap', version: BOOTSTRAP_VERSION},
    { name: 'ngx-bootstrap', version: NGX_BOOTSTRAP_VERSION}
  ];
}

export function getProjectStyleFile(existingStyles: string[], extension?: string): string | null {
  const defaultExtension = existingStyles.find((file) => extension ? file === `styles.${extension}` : defaultStyleFileRegex.test(file));
  if (defaultExtension) {
    return defaultExtension;
  };

  const fallbackStylePath = existingStyles.find((file) => extension ? file?.endsWith(`.${extension}`) : validStyleFileRegex.test(file));
  if (fallbackStylePath) {
    return normalize(fallbackStylePath);
  };
}
