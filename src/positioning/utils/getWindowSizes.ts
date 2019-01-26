import { isIE } from './isIE';

function getSize(axis: string, body: HTMLElement, html: HTMLElement, computedStyle: CSSStyleDeclaration) {
  return Math.max(
    body[`offset${axis}`],
    body[`scroll${axis}`],
    html[`client${axis}`],
    html[`offset${axis}`],
    html[`scroll${axis}`],
    isIE(10)
      ? (parseInt(html[`offset${axis}`], 10) +
      parseInt(computedStyle[`margin${axis === 'Height' ? 'Top' : 'Left'}`], 10) +
      parseInt(computedStyle[`margin${axis === 'Height' ? 'Bottom' : 'Right'}`], 10))
    : 0
  );
}

export function getWindowSizes(document: Document) {
  const body = document.body;
  const html = document.documentElement;
  const computedStyle = isIE(10) && getComputedStyle(html);

  return {
    height: getSize('Height', body, html, computedStyle),
    width: getSize('Width', body, html, computedStyle)
  };
}
