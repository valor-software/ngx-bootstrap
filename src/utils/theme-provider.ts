import { window } from './facade/browser';

export type AvailableBsVersions = 'bs4' | 'bs5';

interface IObjectKeys {
  [key: string]: boolean;
}

export interface IBsVersion extends IObjectKeys{
  isBs4: boolean;
  isBs5: boolean;
}

export enum BsVerions {
  isBs4 = 'bs4',
  isBs5 = 'bs5'
}

let guessedVersion: AvailableBsVersions;

function _guessBsVersion(): AvailableBsVersions {
  const spanEl = window.document.createElement('span');
  spanEl.innerText = 'testing bs version';
  spanEl.classList.add('d-none');
  spanEl.classList.add('pl-1');
  window.document.head.appendChild(spanEl);
  const checkPadding = window.getComputedStyle(spanEl).paddingLeft;

  if (checkPadding && parseFloat(checkPadding)) {
    window.document.head.removeChild(spanEl);
    return 'bs4';
  }

  window.document.head.removeChild(spanEl);
  return 'bs5';
}

export function setTheme(theme: AvailableBsVersions): void {
  guessedVersion = theme;
}

export function isBs4(): boolean {
  if (guessedVersion) return guessedVersion === 'bs4';

  guessedVersion = _guessBsVersion();
  return guessedVersion === 'bs4';
}

export function isBs5(): boolean {
  if (guessedVersion) return guessedVersion === 'bs5';

  guessedVersion = _guessBsVersion();
  return guessedVersion === 'bs5';
}

export function getBsVer(): IBsVersion {
  return {
    isBs4: isBs4(),
    isBs5: isBs5()
  };
}

export function currentBsVersion(): AvailableBsVersions {
  const bsVer = getBsVer();
  const resVersion = Object.keys(bsVer).find(key => bsVer[key]);
  return BsVerions[resVersion as keyof typeof BsVerions];
}


