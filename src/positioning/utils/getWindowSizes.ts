function getSize(axis: string, body: HTMLElement, html: HTMLElement, computedStyle?: CSSStyleDeclaration) {
  const _body = body as unknown as Record<string, number>;
  const _html = html as never;
  const _computedStyle = computedStyle as unknown as Record<string, string>;

  return Math.max(
    _body[`offset${axis}`],
    _body[`scroll${axis}`],
    _html[`client${axis}`],
    _html[`offset${axis}`],
    _html[`scroll${axis}`],
    0
  );
}

export function getWindowSizes(document: Document) {
  const body = document.body;
  const html = document.documentElement;
  const computedStyle = void 0;

  return {
    height: getSize('Height', body, html, computedStyle),
    width: getSize('Width', body, html, computedStyle)
  };
}
