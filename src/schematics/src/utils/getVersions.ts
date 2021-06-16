import { normalize } from '@angular-devkit/core';
import { Tree } from '@angular-devkit/schematics';

let NGX_BOOTSTRAP_VERSION = '7.0.0-rc.1';
const BOOTSTRAP_VERSION = '^4.5.0';
const dependencies = [
  { name: 'bootstrap', version: BOOTSTRAP_VERSION},
  { name: 'ngx-bootstrap', version: NGX_BOOTSTRAP_VERSION}
];
// Regular expression that matches all possible Angular CLI default style files
const defaultStyleFileRegex = /styles\.(c|le|sc|sa)ss/;
// Regular expression that matches all files that have a proper stylesheet extension
const validStyleFileRegex = /\.(c|le|sc|sa)ss/;

export function getDependencies(host: Tree): { name: string, version: string }[] {
  if (host.exists('node_modules/ngx-bootstrap/schematics/package.json')) {
    const sourceText = host.read('node_modules/ngx-bootstrap/schematics/package.json')?.toString('utf-8');
    const json = JSON.parse(sourceText);
    if (json.version) {
      NGX_BOOTSTRAP_VERSION = json.version;
      return updateVersionDependencies(json.version, 'ngx-bootstrap');
    }
  }
  return dependencies;
}

function updateVersionDependencies(version: string, name: string): { name: string, version: string }[] {
  dependencies.find(dep => {
    if (dep.name === name) {
      dep.version = version;
    }
  });
  return  dependencies;
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
