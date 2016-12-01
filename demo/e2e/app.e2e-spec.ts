import { Ng2BootstrapPage } from './app.po';

describe('ng2-bootstrap demo', function():any {
  let page: Ng2BootstrapPage;

  beforeEach(() => {
    page = new Ng2BootstrapPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('ng2-bootstrap');
  });
});
