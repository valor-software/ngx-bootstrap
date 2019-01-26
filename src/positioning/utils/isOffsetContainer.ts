import { getOffsetParent } from './getOffsetParent';

export function isOffsetContainer(element: any) {
  const { nodeName } = element;
  if (nodeName === 'BODY') {
    return false;
  }

  return (
    nodeName === 'HTML' || getOffsetParent(element.firstElementChild) === element
  );
}
