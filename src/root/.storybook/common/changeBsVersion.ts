export function changeBsVersion(value: 4 | 3 | 5) {
  const node = document.createElement('link');
  node.rel = 'stylesheet';
  node.classList.add('style-manager-theme');
  const bsVersion = value === 3 ? '3.3.7' : '4.5.3';
  node.href = `./assets/css/bootstrap-${bsVersion}/css/bootstrap.min.css`;
  const head = document.head;
  const extraElem = head.getElementsByTagName('link')[0];
  head.removeChild(extraElem);
  document.head.appendChild(node);
}
