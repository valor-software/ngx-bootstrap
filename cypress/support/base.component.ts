export abstract class BaseComponent {
  abstract pageUrl: string;

  navigateTo() {
    cy.visit(this.pageUrl);
  }

  clickByText(parent: string, text: string) {
    cy.get(parent).contains(text).click();
  }
}
