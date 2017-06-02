
/** The event sent for (onReorder), when the user has moved a tab */
export class TabReorderEvent {

  /** the original position of the moved tab (zero based: 0 is the first tab was moved) */
  fromIndex: number;

  /** the index of the tab, where the dragged tab has been dropped */
  toIndex: number;
}

