export abstract class BaseComponent {
  titleSel = 'h1';
  titleLinkSel = '.content-header a';
  usageExSel = 'demo-top-section h2';
  usageExCodeSel = 'demo-top-section .prettyprint';
  abstract pageUrl: string;
  titleDefaultExample = 'Usage';

  navigateTo() {
    cy.visit(this.pageUrl);
  }

  clickByText(parent: string, text: string) {
    cy.get(parent).contains(text).click();
  }
}
