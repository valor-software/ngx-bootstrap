import { window } from './facade/browser';

let guessedVersion: 'bs3' | 'bs4' | 'bs5';

function _guessBsVersion(): 'bs3' | 'bs4' {
  if (typeof document === 'undefined') {
    return 'bs4';
  }
  const spanEl = document.createElement('span');
  spanEl.innerText = 'testing bs version';
  document.body.appendChild(spanEl);
  spanEl.classList.add('d-none');
  const rect = spanEl.getBoundingClientRect();
  document.body.removeChild(spanEl);
  if (!rect) {
    return 'bs3';
  }

  return rect.top === 0 ? 'bs4' : 'bs3';
}

export function setTheme(theme: 'bs3' | 'bs4' | 'bs5'): void {
  guessedVersion = theme;
}

// todo: in ngx-bootstrap, bs4 will became a default one
export function isBs3(): boolean {
  if (typeof window === 'undefined') {
    return true;
  }

  if (typeof window.__theme === 'undefined') {
    if (guessedVersion) {
      return guessedVersion === 'bs3';
    }
    guessedVersion = _guessBsVersion();

    return guessedVersion === 'bs3';
  }

  return window.__theme !== 'bs4';
}

export function isBs4(): boolean {
  if (isBs3()) return false;

  if (guessedVersion) return guessedVersion === 'bs4';

  guessedVersion = _guessBsVersion();

  return guessedVersion === 'bs4';
}

export function isBs5(): boolean {
  if (isBs3() || isBs4()) return false;

  if (guessedVersion) return guessedVersion === 'bs5';

  return false;
}

export function getBsVer(): {isBs3: boolean; isBs4: boolean; isBs5: boolean} {
  return {
    isBs3: isBs3(),
    isBs4: isBs4(),
    isBs5: isBs5()
  }
}


