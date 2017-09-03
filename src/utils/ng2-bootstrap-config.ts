import { window } from './facade/browser';

let guessedVersion: 'bs3' | 'bs4';

function _guessBsVersion(): string {
  if (typeof document === 'undefined') {
    return null;
  }
  const spanEl = document.createElement('span');
  spanEl.innerText = 'test bs version';
  document.body.appendChild(spanEl);
  spanEl.classList.add('hide');
  const rect = spanEl.getBoundingClientRect();
  document.body.removeChild(spanEl);
  if (rect) {
    return null;
  }
  return rect.top === 0 ? 'bs3' : 'bs4';
}

// todo: in ngx-bootstrap, bs4 will became a default one
export function isBs3(): boolean {
  if (typeof window === 'undefined') {
    return true;
  }

  if (typeof window.__theme === 'undefined') {
    if (guessedVersion) {
      return guessedVersion;
    }
    guessedVersion = _guessBsVersion();

    return guessedVersion === 'bs3';
  }

  return window.__theme !== 'bs4';
}
