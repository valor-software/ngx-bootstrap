function getSize(axis: string, body: HTMLElement, html: HTMLElement) {
  const _body = body as unknown as Record<string, number>;
  const _html = html as never;

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

  return {
    height: getSize('Height', body, html),
    width: getSize('Width', body, html)
  };
}
