import { SortablePo } from '../support/sortable.po';

describe('Sortable demo page testing suite', () => {
  const sortable = new SortablePo();

  beforeEach(() => sortable.navigateTo());

  describe('Basic', () => {
    const basic = sortable.exampleDemosArr.basic;

    it(`example contains 2 bs-sortable components (the first contain 4 items and the second - 2) by default,
    under each component user see code-preview block with appropriate models`, () => {
      sortable.isSortableVisible(basic, 0);
      sortable.isSortableVisible(basic, 1);
      sortable.isSortableLengthEqual(basic, 0, 4);
      sortable.isSortableLengthEqual(basic, 1, 2);
      sortable.isCodePreviewExist(basic, `"Windstorm"`, true, 0);
      sortable.isCodePreviewExist(basic, `"Tomato"`, true, 1);
    });

    it(`when user moves item from the first sortable component to another
    then this item appeared in the second component and model changed appropriate`, () => {
      sortable.moveSortableItem(basic, 0, 1, 1, 1);
      sortable.isSortableLengthEqual(basic, 0, 3);
      sortable.isSortableLengthEqual(basic, 1, 3);
      sortable.isCodePreviewExist(basic, `"Bombasto"`, true, 1);
    });

    it(`when user moves all items from the first sortable, then text "Drag here" shown , model is empty`, () => {
      sortable.moveSortableItem(basic, 0, 3, 1, 1);
      sortable.moveSortableItem(basic, 0, 2, 1, 1);
      sortable.moveSortableItem(basic, 0, 1, 1, 1);
      sortable.moveSortableItem(basic, 0, 0, 1, 1);
      sortable.isSortableLengthEqual(basic, 0, 0);
      sortable.isSortableLengthEqual(basic, 1, 6);
      sortable.isCodePreviewExist(basic, `model: []`, true, 0);
    });

    it(`when user moved all items from the second sortable component to the first,
    then text "Drag here" shown and second model is empty and first contains all 6 items`, () => {
      sortable.moveSortableItem(basic, 1, 1, 0, 1);
      sortable.moveSortableItem(basic, 1, 0, 0, 1);
      sortable.isSortableLengthEqual(basic, 0, 6);
      sortable.isSortableLengthEqual(basic, 1, 0);
      sortable.isCodePreviewExist(basic, `model: []`, true, 1);
    });
  });
});
