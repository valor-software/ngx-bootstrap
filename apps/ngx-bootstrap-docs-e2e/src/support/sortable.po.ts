import { BaseComponent } from './base.component';

export class SortablePo extends BaseComponent {
  pageUrl = '#/sortable';
  pageTitle = 'Sortable';
  ghLinkToComponent = 'https://github.com/valor-software/ngx-bootstrap/blob/development/src/sortable';

  exampleDemosArr = {
    basic: 'basic-demo',
    complexData: 'complex-datamodel-demo',
    customItem: 'custom-item-template-demo',
    accessibility: 'demo-accessibility'
  };

  isSortableLengthEqual(baseSelector: string, sortableIndex: number, expectedLength: number) {
    cy.get(`${baseSelector} bs-sortable`)
      .eq(sortableIndex)
      .find(`.sortable-item`)
      .should('have.length', expectedLength);
  }

  isSortableVisible(baseSelector: string, sortableIndex: number) {
    cy.get(`${baseSelector} bs-sortable div`)
      .eq(sortableIndex)
      .should('be.visible');
  }

  moveSortableItem(
    baseSelector: string,
    sortableIndexFrom: number,
    itemIndexFrom: number,
    sortableIndexTo: number,
    itemIndexTo: number) {

    const dragEvent = {
      dataTransfer: {
        setData: Function.prototype
      }
    };

    cy.get(`${baseSelector} bs-sortable`)
      .eq(sortableIndexFrom)
      .find('.sortable-item')
      .eq(itemIndexFrom).as('ItemFrom');

    cy.get(`${baseSelector} bs-sortable`)
      .eq(sortableIndexTo)
      .find('.sortable-item')
      .eq(itemIndexTo).as('ItemTo');

    cy.get(`${baseSelector} bs-sortable`)
      .eq(sortableIndexTo)
      .find('.sortable-wrapper').as('SortableTo');

    cy.get('@ItemFrom')
      .trigger('dragstart', dragEvent);

    cy.get('@ItemTo')
      .trigger('dragover');

    cy.get('@SortableTo')
      .trigger('drop');
  }

  isSortableItemsWithIndexes(baseSelector: string, sortableIndex: number, existIndexes: boolean) {
    cy.get(`${baseSelector} bs-sortable`)
      .eq(sortableIndex)
      .find('.sortable-item')
      .each((sortableItem, itemIndex) => {
        if (existIndexes) {
          expect(sortableItem.text()).to.contains(`${itemIndex}: `);
        } else {
          expect(sortableItem.text()).not.to.contains(`${itemIndex}: `);
        }
      });
  }
}
