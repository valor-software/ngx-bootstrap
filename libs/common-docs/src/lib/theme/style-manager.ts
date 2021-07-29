import { Injectable } from '@angular/core';

/**
 * Class for managing stylesheets. Stylesheets are loaded into named slots so
 * that they can be removed or changed later.
 */
@Injectable()
export class StyleManager {
  /**
   * Set the stylesheet with the specified key.
   */
  setStyle(key: string, href: string) {
    const linkElement = getLinkElementForKey(key);

    if (!linkElement) {
      return;
    }

    linkElement.setAttribute('href', href);
  }

  /**
   * Remove the stylesheet with the specified key.
   */
  removeStyle(key: string) {
    const existingLinkElement = getExistingLinkElementByKey(key);

    if (!existingLinkElement || !document.head) {
      return;
    }

    document.head.removeChild(existingLinkElement);
  }
}

function getLinkElementForKey(key: string) {
  return getExistingLinkElementByKey(key) || createLinkElementWithKey(key);
}

function getExistingLinkElementByKey(key: string): Element | void{
  if (!document.head) {
    return;
  }

  return document.head.querySelector(`link[rel="stylesheet"].${getClassNameForKey(key)}`);
}

function createLinkElementWithKey(key: string): HTMLLinkElement | void {
  const linkEl = document.createElement('link');
  linkEl.setAttribute('rel', 'stylesheet');
  linkEl.classList.add(getClassNameForKey(key));

  if (!document.head) {
    return;
  }

  document.head.appendChild(linkEl);

  return linkEl;
}

function getClassNameForKey(key: string) {
  return `style-manager-${key}`;
}
