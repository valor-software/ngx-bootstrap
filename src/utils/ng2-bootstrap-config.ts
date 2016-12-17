import { window } from './facade/browser';

export function isBs3(): boolean {
  return window.__theme !== 'bs4';
}
