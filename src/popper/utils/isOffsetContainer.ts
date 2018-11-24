import { getOffsetParent } from './getOffsetParent';

export function isOffsetContainer(element) {
  const { nodeName } = element;
  if (nodeName === 'BODY') {
    return false;
  }

  return (
    nodeName === 'HTML' || getOffsetParent(element.firstElementChild) === element
  );
}
