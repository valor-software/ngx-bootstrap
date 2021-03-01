import { SortablePo } from '../support/sortable.po';

describe('Sortable demo page testing suite', () => {
  const sortable = new SortablePo();

  beforeEach(() => sortable.navigateTo());

  describe('Complex data model', () => {
    const complexData = sortable.exampleDemosArr.complexData;

    beforeEach(() => sortable.scrollToMenu('Complex data model'));

    it(`example contains 2 bs-sortable components (each of them contains of 3 items) by default
    each component user see code-preview block with appropriate models (each object in model have id and name)`, () => {
      sortable.isSortableVisible(complexData, 0);
      sortable.isSortableVisible(complexData, 1);
      sortable.isSortableLengthEqual(complexData, 0, 3);
      sortable.isSortableLengthEqual(complexData, 1, 3);
      sortable.isCodePreviewExist(complexData, `"Windstorm"`, true, 0);
      sortable.isCodePreviewExist(complexData, `"id": 1,`, true, 0);
      sortable.isCodePreviewExist(complexData, `"Tomato"`, true, 1);
      sortable.isCodePreviewExist(complexData, `"id": 6,`, true, 1);
    });

    it(`when user moves item from the first sortable component to another,
    then this item appeared in the second component and model changed appropriate`, () => {
      sortable.moveSortableItem(complexData, 0, 1, 1, 1);
      sortable.isSortableLengthEqual(complexData, 0, 2);
      sortable.isSortableLengthEqual(complexData, 1, 4);
      sortable.isCodePreviewExist(complexData, `"Bombasto"`, true, 1);
      sortable.isCodePreviewExist(complexData, `"id": 2,`, true, 1);
    });

    it(`when user moved all items from the first sortable component,
    then text "Drag here" shown and model is empty`, () => {
      sortable.moveSortableItem(complexData, 0, 2, 1, 1);
      sortable.moveSortableItem(complexData, 0, 1, 1, 1);
      sortable.moveSortableItem(complexData, 0, 0, 1, 1);
      sortable.isSortableLengthEqual(complexData, 0, 0);
      sortable.isSortableLengthEqual(complexData, 1, 6);
      sortable.isCodePreviewExist(complexData, `[]`, true, 0);
      sortable.isCodePreviewExist(complexData, `"id": 1,`, true, 1);
      sortable.isCodePreviewExist(complexData, `"id": 2,`, true, 1);
      sortable.isCodePreviewExist(complexData, `"id": 3,`, true, 1);
      sortable.isCodePreviewExist(complexData, `"id": 4,`, true, 1);
      sortable.isCodePreviewExist(complexData, `"id": 5,`, true, 1);
      sortable.isCodePreviewExist(complexData, `"id": 6,`, true, 1);
    });

    it(`when user moved all items from the second sortable component to the first,
    then text "Drag here" shown and second model is empty and first contains all 6 items`, () => {
      sortable.moveSortableItem(complexData, 1, 2, 0, 1);
      sortable.moveSortableItem(complexData, 1, 1, 0, 1);
      sortable.moveSortableItem(complexData, 1, 0, 0, 1);
      sortable.isSortableLengthEqual(complexData, 0, 6);
      sortable.isSortableLengthEqual(complexData, 1, 0);
      sortable.isCodePreviewExist(complexData, `[]`, true, 1);
      sortable.isCodePreviewExist(complexData, `"id": 1,`, true, 0);
      sortable.isCodePreviewExist(complexData, `"id": 2,`, true, 0);
      sortable.isCodePreviewExist(complexData, `"id": 3,`, true, 0);
      sortable.isCodePreviewExist(complexData, `"id": 4,`, true, 0);
      sortable.isCodePreviewExist(complexData, `"id": 5,`, true, 0);
      sortable.isCodePreviewExist(complexData, `"id": 6,`, true, 0);
    });
  });

  describe('Custom item template', () => {
    const customItem = sortable.exampleDemosArr.customItem;

    beforeEach(() => sortable.scrollToMenu('Custom item template'));

    it(`example contains 2 bs-sortable (the 1st contain 4 items, 2d - 2) by default, each item in the first bs-sortable
     have index (starting from 0), under each component user see code-preview with appropriate models`, () => {
      sortable.isSortableVisible(customItem, 0);
      sortable.isSortableVisible(customItem, 1);
      sortable.isSortableLengthEqual(customItem, 0, 4);
      sortable.isSortableLengthEqual(customItem, 1, 2);
      sortable.isSortableItemsWithIndexes(customItem, 0, true);
      sortable.isSortableItemsWithIndexes(customItem, 1, false);
      sortable.isCodePreviewExist(customItem, `"Windstorm"`, true, 0);
      sortable.isCodePreviewExist(customItem, `"Bombasto"`, true, 0);
      sortable.isCodePreviewExist(customItem, `"Magneta"`, true, 0);
      sortable.isCodePreviewExist(customItem, `"Tornado"`, true, 0);
      sortable.isCodePreviewExist(customItem, `"Tomato"`, true, 1);
      sortable.isCodePreviewExist(customItem, `"Mr. O",`, true, 1);
    });

    it(`when user moves item from the first sortable to another, then this item appeared in the second without index,
    model changed appropriate, items inside first sortable should be recounted and with appropriate indexes`, () => {
      sortable.moveSortableItem(customItem, 0, 2, 1, 1);
      sortable.isSortableLengthEqual(customItem, 0, 3);
      sortable.isSortableLengthEqual(customItem, 1, 3);
      sortable.isSortableItemsWithIndexes(customItem, 0, true);
      sortable.isSortableItemsWithIndexes(customItem, 1, false);
      sortable.isCodePreviewExist(customItem, `"Windstorm"`, true, 0);
      sortable.isCodePreviewExist(customItem, `"Bombasto"`, true, 0);
      sortable.isCodePreviewExist(customItem, `"Magneta"`, true, 1);
      sortable.isCodePreviewExist(customItem, `"Tomato"`, true, 1);
      sortable.isCodePreviewExist(customItem, `"Mr. O",`, true, 1);
    });

    it(`when user moved items from the second sortable to the first, then this item appeared in the 1st with index,
    model changed appropriate, items inside second sortable component should stay without indexes`, () => {
      sortable.moveSortableItem(customItem, 1, 1, 0, 1);
      sortable.isSortableLengthEqual(customItem, 0, 5);
      sortable.isSortableLengthEqual(customItem, 1, 1);
      sortable.isSortableItemsWithIndexes(customItem, 0, true);
      sortable.isSortableItemsWithIndexes(customItem, 1, false);
      sortable.isCodePreviewExist(customItem, `"Windstorm"`, true, 0);
      sortable.isCodePreviewExist(customItem, `"Bombasto"`, true, 0);
      sortable.isCodePreviewExist(customItem, `"Magneta"`, true, 0);
      sortable.isCodePreviewExist(customItem, `"Tomato"`, true, 0);
      sortable.isCodePreviewExist(customItem, `"Mr. O"`, true, 1);
    });
  });

  describe('Accessibility', () => {
    it('example contains info about aria-dropeffect and aria-grabbed parameters', () => {
      const accessibilityInfo = sortable.exampleDemosArr.accessibility;
      cy.viewport(1440, 900);
      sortable.clickOnDemoMenu('Accessibility');
      sortable.isDemoContainsTxt(accessibilityInfo, 'aria-dropeffect', 'aria-grabbed');
    });
  });
});
