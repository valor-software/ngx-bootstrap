import { readJson} from 'fs-extra';
import path = require("path");
import { normalize } from '@angular-devkit/core';

const NGX_BOOTSTRAP_VERSION = '^6.2.0';
const BOOTSTRAP_VERSION = '^4.5.0';
const dependencies = [
  { name: 'bootstrap', version: BOOTSTRAP_VERSION},
  { name: 'ngx-bootstrap', version: NGX_BOOTSTRAP_VERSION}
];
// Regular expression that matches all possible Angular CLI default style files
const defaultStyleFileRegex = /styles\.(c|le|sc|sa)ss/;
// Regular expression that matches all files that have a proper stylesheet extension
const validStyleFileRegex = /\.(c|le|sc|sa)ss/;

export async function getVersion() {
  const directory = path.join(__dirname, '../');
  const packageFile = `${directory}/package.json`
  return await readJson(packageFile).then(json => json.version);
}

export async function getDependencies(): Promise<Array<{ name: string; version: string }>> {
  return getVersion().then(res => {
    const updatedDependencies = dependencies.map(dep => {
      if (dep.name === 'ngx-bootstrap') {
        dep.version = res;
      }
      return dep;
    });
    return updatedDependencies;
  }, error => {
    return dependencies;
  });
}

export function getProjectStyleFile(existingStyles: string[], extension?: string): string | null {
  const defaultExtension = existingStyles.find((file) => extension ? file === `styles.${extension}` : defaultStyleFileRegex.test(file));
  if (defaultExtension) {
    return defaultExtension
  }

  const fallbackStylePath = existingStyles.find((file) => extension ? file.endsWith(`.${extension}`) : validStyleFileRegex.test(file));
  if (fallbackStylePath) {
    return normalize(fallbackStylePath);
  }
}
