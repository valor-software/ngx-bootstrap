import { isIE } from './isIE';

function getSize(axis: string, body: HTMLElement, html: HTMLElement, computedStyle: CSSStyleDeclaration) {
  return Math.max(
    (body as any)[`offset${axis}`],
    (body as any)[`scroll${axis}`],
    (html as any)[`client${axis}`],
    (html as any)[`offset${axis}`],
    (html as any)[`scroll${axis}`],
    isIE(10)
      ? (parseInt((html as any)[`offset${axis}`], 10) +
      parseInt(computedStyle[`margin${axis === 'Height' ? 'Top' : 'Left'}` as any], 10) +
      parseInt(computedStyle[`margin${axis === 'Height' ? 'Bottom' : 'Right'}` as any], 10))
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
