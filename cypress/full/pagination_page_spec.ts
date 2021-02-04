import { PaginationPo } from '../support/pagination.po';

describe('Pagination demo page testing suite', () => {
  const pagination = new PaginationPo();

  beforeEach(() => pagination.navigateTo());

  describe('Manual switching page', () => {
    const manualSwitchingPage = pagination.exampleDemosArr.manualSwitchingPage;

    beforeEach(() => pagination.scrollToMenu('Manual switching page'));

    it('example contains: 4 page is active, previous/next is enabled, exist "Set current page to: 3" btn', () => {
      pagination.isActivePositionEqual(manualSwitchingPage, '4');
      pagination.isPagerDisabled(manualSwitchingPage, 'Previous', false);
      pagination.isPagerDisabled(manualSwitchingPage, 'Next', false);
      pagination.isButtonExist(manualSwitchingPage, 'Set current page to: 3');
    });

    it('when user click on "Set current page to: 3", 3rd is active, previous page is inactive', () => {
      pagination.clickOnPaginationBtn(manualSwitchingPage, 'Set current page to: 3');
      pagination.isActivePositionEqual(manualSwitchingPage, '3');
      pagination.isPageActive(manualSwitchingPage, '4', false);
      pagination.isPagerDisabled(manualSwitchingPage, 'Previous', false);
      pagination.isPagerDisabled(manualSwitchingPage, 'Next', false);
    });
  });

  describe('Page changed event', () => {
    const pageChangedEvent = pagination.exampleDemosArr.pageChangedEvent;

    beforeEach(() => pagination.scrollToMenu('Page changed event'));

    it('example contains: 4 page is active, previous/next is enabled, exist "Page changed to:" preview', () => {
      pagination.isActivePositionEqual(pageChangedEvent, '4');
      pagination.isPagerDisabled(pageChangedEvent, 'Previous', false);
      pagination.isPagerDisabled(pageChangedEvent, 'Next', false);
      pagination.isPreviewExist(pageChangedEvent, 'Page changed to: 4\n');
    });

    it('when user click on 1st page, "Page changed to: 1" shown', () => {
      pagination.clickOnPage(pageChangedEvent, '1');
      pagination.isActivePositionEqual(pageChangedEvent, '1');
      pagination.isPagerDisabled(pageChangedEvent, 'Previous', true);
      pagination.isPagerDisabled(pageChangedEvent, 'Next', false);
      pagination.isPreviewExist(pageChangedEvent, 'Page changed to: 1\n');
    });

    it('when user click on "Next" button, "Page changed to: 2" shown', () => {
      pagination.clickOnPage(pageChangedEvent, '1');
      pagination.clickOnPager(pageChangedEvent, 'Next');
      pagination.isPagerDisabled(pageChangedEvent, 'Previous', false);
      pagination.isPagerDisabled(pageChangedEvent, 'Next', false);
      pagination.isPreviewExist(pageChangedEvent, 'Page changed to: 2\n');
      pagination.isActivePositionEqual(pageChangedEvent, '2');
    });

    it('when user click on "Previous" button, "Page changed to: 1" shown', () => {
      pagination.clickOnPage(pageChangedEvent, '1');
      pagination.clickOnPager(pageChangedEvent, 'Next');
      pagination.clickOnPager(pageChangedEvent, 'Previous');
      pagination.isPagerDisabled(pageChangedEvent, 'Previous', true);
      pagination.isPagerDisabled(pageChangedEvent, 'Next', false);
      pagination.isPreviewExist(pageChangedEvent, 'Page changed to: 1\n');
      pagination.isActivePositionEqual(pageChangedEvent, '1');
    });
  });

  describe('Pages count changed event', () => {
    const pagesCountChangedEvent = pagination.exampleDemosArr.pagesCountChangedEvent;

    beforeEach(() => pagination.scrollToMenu('Pages count changed event'));

    it('example contains: 4 is active, previous/next is enabled, exist "The selected page no: 4/9" preview', () => {
      pagination.isActivePositionEqual(pagesCountChangedEvent, '4');
      pagination.isPagerDisabled(pagesCountChangedEvent, 'Previous', false);
      pagination.isPagerDisabled(pagesCountChangedEvent, 'Next', false);
      pagination.isPreviewExist(pagesCountChangedEvent, 'The selected page no: 4/9');
    });

    it('when user click on 1st page, should shown event message "The selected page no: 1/9"', () => {
      pagination.clickOnPage(pagesCountChangedEvent, '1');
      pagination.isPagerDisabled(pagesCountChangedEvent, 'Previous', true);
      pagination.isPagerDisabled(pagesCountChangedEvent, 'Next', false);
      pagination.isPreviewExist(pagesCountChangedEvent, 'The selected page no: 1/9');
      pagination.isActivePositionEqual(pagesCountChangedEvent, '1');
    });

    it('when user click on "Next" button, "The selected page no: 2/9" shown', () => {
      pagination.clickOnPage(pagesCountChangedEvent, '1');
      pagination.clickOnPager(pagesCountChangedEvent, 'Next');
      pagination.isPagerDisabled(pagesCountChangedEvent, 'Previous', false);
      pagination.isPagerDisabled(pagesCountChangedEvent, 'Next', false);
      pagination.isPreviewExist(pagesCountChangedEvent, 'The selected page no: 2/9');
      pagination.isActivePositionEqual(pagesCountChangedEvent, '2');
    });

    it('when user click on "Previous" button, "The selected page no: 1/9" shown', () => {
      pagination.clickOnPage(pagesCountChangedEvent, '1');
      pagination.clickOnPager(pagesCountChangedEvent, 'Next');
      pagination.clickOnPager(pagesCountChangedEvent, 'Previous');
      pagination.isPagerDisabled(pagesCountChangedEvent, 'Previous', true);
      pagination.isPagerDisabled(pagesCountChangedEvent, 'Next', false);
      pagination.isPreviewExist(pagesCountChangedEvent, 'The selected page no: 1/9');
      pagination.isActivePositionEqual(pagesCountChangedEvent, '1');
    });
  });

  describe('Boundary links', () => {
    const boundaryLinks = pagination.exampleDemosArr.boundaryLinks;

    beforeEach(() => pagination.scrollToMenu('Boundary links'));

    it('example contains: "First" and "Previous" - disabled, 1 is active, "Hide/show boundary links" shown', () => {
      pagination.isActivePositionEqual(boundaryLinks, '1');
      pagination.isPagerDisabled(boundaryLinks, 'Previous', true);
      pagination.isPagerDisabled(boundaryLinks, 'First', true);
      pagination.isPagerDisabled(boundaryLinks, 'Next', false);
      pagination.isPagerDisabled(boundaryLinks, 'Last', false);
      pagination.isButtonExist(boundaryLinks, 'Hide/show boundary links');
    });

    it('when user click on "Last", 6 - active, 1 - inactive, "Next/Last"-disabled, "First/Previous"-enabled', () => {
      pagination.clickOnPager(boundaryLinks, 'Last');
      pagination.isActivePositionEqual(boundaryLinks, '6');
      pagination.isPageActive(boundaryLinks, '1', false);
      pagination.isPagerDisabled(boundaryLinks, 'Previous', false);
      pagination.isPagerDisabled(boundaryLinks, 'First', false);
      pagination.isPagerDisabled(boundaryLinks, 'Next', true);
      pagination.isPagerDisabled(boundaryLinks, 'Last', true);
    });

    it('when user click on First, 1 - active, 6 - inactive, "Next/Last"- enabled, First/Previous - disabled', () => {
      pagination.clickOnPager(boundaryLinks, 'Last');
      pagination.clickOnPager(boundaryLinks, 'First');
      pagination.isActivePositionEqual(boundaryLinks, '1');
      pagination.isPageActive(boundaryLinks, '6', false);
      pagination.isPagerDisabled(boundaryLinks, 'Previous', true);
      pagination.isPagerDisabled(boundaryLinks, 'First', true);
      pagination.isPagerDisabled(boundaryLinks, 'Next', false);
      pagination.isPagerDisabled(boundaryLinks, 'Last', false);
    });

    it('when user click on "Hide/show boundary links", "First" and "Last" buttons are disappeared', () => {
      pagination.clickOnPaginationBtn(boundaryLinks, 'Hide/show boundary links');
      pagination.isPagerExist(boundaryLinks, 'First', false);
      pagination.isPagerExist(boundaryLinks, 'Last', false);
      pagination.isPagerExist(boundaryLinks, 'Previous', true);
      pagination.isPagerExist(boundaryLinks, 'Next', true);
    });

    it('when user click on "Hide/show boundary links" again, "First" and "Last" buttons are appeared', () => {
      pagination.clickOnPaginationBtn(boundaryLinks, 'Hide/show boundary links');
      pagination.clickOnPaginationBtn(boundaryLinks, 'Hide/show boundary links');
      pagination.isPagerExist(boundaryLinks, 'First', true);
      pagination.isPagerExist(boundaryLinks, 'Last', true);
      pagination.isPagerExist(boundaryLinks, 'Previous', true);
      pagination.isPagerExist(boundaryLinks, 'Next', true);
    });
  });


  describe('Direction links', () => {
    const directionLinks = pagination.exampleDemosArr.directionLinks;

    beforeEach(() => pagination.scrollToMenu('Direction links'));

    it('example contains: 1 is active, previous/next is enabled, exist "Hide/show direction links" btn', () => {
      pagination.isActivePositionEqual(directionLinks, '1');
      pagination.isPagerDisabled(directionLinks, 'Previous', true);
      pagination.isPagerDisabled(directionLinks, 'Next', false);
      pagination.isButtonExist(directionLinks, 'Hide/show direction links');
    });

    it('when user clicks on "Hide/show direction links", then "Previous/Next" are disappeared', () => {
      pagination.isActivePositionEqual(directionLinks, '1');
      pagination.clickOnPaginationBtn(directionLinks, 'Hide/show direction links');
      pagination.isPagerExist(directionLinks, 'Previous', false);
      pagination.isPagerExist(directionLinks, 'Next', false);
    });

    it('when user clicks on "Hide/show direction links" again, then "Previous/Next" buttons are appeared', () => {
      pagination.clickOnPaginationBtn(directionLinks, 'Hide/show direction links');
      pagination.clickOnPaginationBtn(directionLinks, 'Hide/show direction links');
      pagination.isPagerExist(directionLinks, 'Previous', true);
      pagination.isPagerExist(directionLinks, 'Next', true);
    });
  });

  describe('Custom links content', () => {
    const customLinksContent = pagination.exampleDemosArr.customLinksContent;

    beforeEach(() => pagination.scrollToMenu('Custom links content'));

    it('example contains: 1 is active, pagination should be with arrow links "«" and "‹", "›", "»"', () => {
      pagination.isActivePositionEqual(customLinksContent, '1');
      pagination.isPagerTxtEqual(customLinksContent, 'Previous', '‹');
      pagination.isPagerTxtEqual(customLinksContent, 'Next', '›');
      pagination.isPagerTxtEqual(customLinksContent, 'First', '«');
      pagination.isPagerTxtEqual(customLinksContent, 'Last', '»');
    });

    it('when user click on "Last", "Next/Last" - disabled, 8th page is active, "First/Previous" - enabled', () => {
      pagination.clickOnPager(customLinksContent, 'Last');
      pagination.isPagerDisabled(customLinksContent, 'Next', true);
      pagination.isPagerDisabled(customLinksContent, 'Last', true);
      pagination.isPagerDisabled(customLinksContent, 'First', false);
      pagination.isPagerDisabled(customLinksContent, 'Previous', false);
      pagination.isActivePositionEqual(customLinksContent, '8');
    });

    it('when user click on "First", "Next/Last" - enabled, 1st is active, "First/Previous" - disabled', () => {
      pagination.clickOnPager(customLinksContent, 'Last');
      pagination.clickOnPager(customLinksContent, 'First');
      pagination.isPagerDisabled(customLinksContent, 'Next', false);
      pagination.isPagerDisabled(customLinksContent, 'Last', false);
      pagination.isPagerDisabled(customLinksContent, 'First', true);
      pagination.isPagerDisabled(customLinksContent, 'Previous', true);
      pagination.isActivePositionEqual(customLinksContent, '1');
    });

    it('when user click on "Next", next page is active', () => {
      pagination.isActivePositionEqual(customLinksContent, '1');
      pagination.clickOnPager(customLinksContent, 'Next');
      pagination.isActivePositionEqual(customLinksContent, '2');
    });

    it('when user click on "Previous", previous page is active', () => {
      pagination.isActivePositionEqual(customLinksContent, '1');
      pagination.clickOnPage(customLinksContent, '5');
      pagination.clickOnPager(customLinksContent, 'Previous');
      pagination.isActivePositionEqual(customLinksContent, '4');
    });
  });

  describe('Disabled', () => {
    const disabled = pagination.exampleDemosArr.disabled;

    beforeEach(() => pagination.scrollToMenu('Disabled'));

    it('example contains: pagination panel is enabled, exist "Toggle state" btn', () => {
      pagination.isActivePositionEqual(disabled, '1');
      pagination.isButtonExist(disabled, 'Toggle state');
      pagination.isPagerDisabled(disabled, 'Previous', true);
      pagination.isPagerDisabled(disabled, 'Next', false);
      pagination.isPageDisabled(disabled, '2', false);
      pagination.isPageDisabled(disabled, '3', false);
      pagination.isPageDisabled(disabled, '4', false);
      pagination.isPageDisabled(disabled, '7', false);
    });

    it('when user clicks on "Toggle state" button, then pagination panel is disabled', () => {
      pagination.clickOnPaginationBtn(disabled, 'Toggle state');
      pagination.isPagerDisabled(disabled, 'Previous', true);
      pagination.isPagerDisabled(disabled, 'Next', true);
      pagination.isPageDisabled(disabled, '2', true);
      pagination.isPageDisabled(disabled, '3', true);
      pagination.isPageDisabled(disabled, '4', true);
      pagination.isPageDisabled(disabled, '7', true);
    });

    it('when user clicks on "Toggle state" button again, then pagination panel is enabled', () => {
      pagination.clickOnPaginationBtn(disabled, 'Toggle state');
      pagination.clickOnPaginationBtn(disabled, 'Toggle state');
      pagination.isPagerDisabled(disabled, 'Previous', true);
      pagination.isPagerDisabled(disabled, 'Next', false);
      pagination.isPageDisabled(disabled, '2', false);
      pagination.isPageDisabled(disabled, '3', false);
      pagination.isPageDisabled(disabled, '4', false);
      pagination.isPageDisabled(disabled, '7', false);
    });
  });
  describe('Limits', () => {
    const limits = pagination.exampleDemosArr.limits;

    beforeEach(() => pagination.scrollToMenu('Limits'));

    it('example contains: maximum page numbers equal to 5 and active page: "1"', () => {
      pagination.isActivePositionEqual(limits, '1');
      pagination.isPagerDisabled(limits, 'Previous', true);
      pagination.isPagerDisabled(limits, 'Next', false);
      pagination.isPaginationLengthEqual(limits, 5);
    });

    it('when user clicks on 5th page, then active page - 5 and it centered, maximum count of pages - 5', () => {
      pagination.clickOnPage(limits, '5');
      pagination.isActivePositionEqual(limits, '5');
      pagination.isPagerDisabled(limits, 'Previous', false);
      pagination.isPagerDisabled(limits, 'Next', false);
      pagination.isPaginationLengthEqual(limits, 5);
      pagination.isActivePageCentered(limits, true);
    });

    it('when user clicks on 5th and "Next" button, then active page - 6 and it centered, maximum count - 5', () => {
      pagination.clickOnPage(limits, '5');
      pagination.clickOnPager(limits, 'Next');
      pagination.isActivePositionEqual(limits, '6');
      pagination.isPagerDisabled(limits, 'Previous', false);
      pagination.isPagerDisabled(limits, 'Next', false);
      pagination.isPaginationLengthEqual(limits, 5);
      pagination.isActivePageCentered(limits, true);
    });

    it('when user clicks on 5th and "Previous", then active page - 4 and it centered, maximum count - 5', () => {
      pagination.clickOnPage(limits, '5');
      pagination.clickOnPager(limits, 'Previous');
      pagination.isActivePositionEqual(limits, '4');
      pagination.isPagerDisabled(limits, 'Previous', false);
      pagination.isPagerDisabled(limits, 'Next', false);
      pagination.isPaginationLengthEqual(limits, 5);
      pagination.isActivePageCentered(limits, true);
    });
  });

  describe('Centering the active page link', () => {
    const centeringPageLink = pagination.exampleDemosArr.centeringPageLink;

    beforeEach(() => pagination.scrollToMenu('Centering the active page link'));

    it('example contains: maximum page numbers - 5, active - 1, "Toggle centering current page link" btn exist', () => {
      pagination.isPaginationLengthEqual(centeringPageLink, 5);
      pagination.isActivePositionEqual(centeringPageLink, '1');
      pagination.isPagerDisabled(centeringPageLink, 'Previous', true);
      pagination.isPagerDisabled(centeringPageLink, 'Next', false);
      pagination.isButtonExist(centeringPageLink, 'Current page link center is ON');
    });

    it('when user clicks on 5th, then active page - 5 and it centered, maximum count of pages - 5', () => {
      pagination.clickOnPage(centeringPageLink, '5');
      pagination.isPaginationLengthEqual(centeringPageLink, 5);
      pagination.isActivePositionEqual(centeringPageLink, '5');
      pagination.isPagerDisabled(centeringPageLink, 'Previous', false);
      pagination.isPagerDisabled(centeringPageLink, 'Next', false);
      pagination.isActivePageCentered(centeringPageLink, true);
    });

    it('when user clicks on 5th and "Next", then active page - 6 and it centered, maximum count of pages - 5', () => {
      pagination.clickOnPage(centeringPageLink, '5');
      pagination.clickOnPager(centeringPageLink, 'Next');
      pagination.isPaginationLengthEqual(centeringPageLink, 5);
      pagination.isActivePositionEqual(centeringPageLink, '6');
      pagination.isPagerDisabled(centeringPageLink, 'Previous', false);
      pagination.isPagerDisabled(centeringPageLink, 'Next', false);
      pagination.isActivePageCentered(centeringPageLink, true);

    });

    it('when user clicks on 5th and "Previous", then active page - 4 and it centered, maximum count - 5', () => {
      pagination.clickOnPage(centeringPageLink, '5');
      pagination.clickOnPager(centeringPageLink, 'Previous');
      pagination.isPaginationLengthEqual(centeringPageLink, 5);
      pagination.isActivePositionEqual(centeringPageLink, '4');
      pagination.isPagerDisabled(centeringPageLink, 'Previous', false);
      pagination.isPagerDisabled(centeringPageLink, 'Next', false);
      pagination.isActivePageCentered(centeringPageLink, true);
    });

    it('when user clicks on 6, "Toggle centering" and "Next", then "last/first" - appeared, like "..."', () => {
      pagination.clickOnPage(centeringPageLink, '5');
      pagination.clickOnPage(centeringPageLink, '6');
      pagination.clickOnPaginationBtn(centeringPageLink, 'Current page link center is ON');
      pagination.clickOnPager(centeringPageLink, 'Next');
      pagination.isPaginationLengthEqual(centeringPageLink, 7);
      pagination.isActivePositionEqual(centeringPageLink, '7');
      pagination.isPageTxtEqual(centeringPageLink, 7, '...');
      pagination.isPageTxtEqual(centeringPageLink, 1, '...');
      pagination.isActivePageCentered(centeringPageLink, false);
    });
  });

  describe('Content switching', () => {
    const contentSwitching = pagination.exampleDemosArr.contentSwitching;

    beforeEach(() => pagination.scrollToMenu('Content switching'));

    it('example contains: 9 pages, Next - active, Previous - no, 1st page active with appropriate content', () => {
      pagination.isPaginationLengthEqual(contentSwitching, 9);
      pagination.isActivePositionEqual(contentSwitching, '1');
      pagination.isPagerDisabled(contentSwitching, 'Previous', true);
      pagination.isPagerDisabled(contentSwitching, 'Next', false);
      pagination.isPaginationContentUpdated(contentSwitching);
    });

    it('when user click on "Next" button, pagination content changed', () => {
      pagination.clickOnPager(contentSwitching, 'Next');
      pagination.isPaginationLengthEqual(contentSwitching, 9);
      pagination.isActivePositionEqual(contentSwitching, '2');
      pagination.isPagerDisabled(contentSwitching, 'Previous', false);
      pagination.isPagerDisabled(contentSwitching, 'Next', false);
      pagination.isPaginationContentUpdated(contentSwitching);
    });

    it('when user click on "Previous" button, pagination content changed', () => {
      pagination.clickOnPager(contentSwitching, 'Next');
      pagination.clickOnPager(contentSwitching, 'Previous');
      pagination.isPaginationLengthEqual(contentSwitching, 9);
      pagination.isActivePositionEqual(contentSwitching, '1');
      pagination.isPagerDisabled(contentSwitching, 'Previous', true);
      pagination.isPagerDisabled(contentSwitching, 'Next', false);
      pagination.isPaginationContentUpdated(contentSwitching);
    });

    it('when user click on any page, pagination content changed', () => {
      pagination.clickOnPage(contentSwitching, '5');
      pagination.isPaginationLengthEqual(contentSwitching, 9);
      pagination.isActivePositionEqual(contentSwitching, '5');
      pagination.isPagerDisabled(contentSwitching, 'Previous', false);
      pagination.isPagerDisabled(contentSwitching, 'Next', false);
      pagination.isPaginationContentUpdated(contentSwitching);
    });
  });

  describe('Pager', () => {
    const pager = pagination.exampleDemosArr.pager;

    it('example contains: 7 pages, Next - active, Previous - active, 4th page active', () => {
      cy.viewport(1440, 900);
      pagination.clickOnDemoMenu('Pager');
      pagination.isPaginationLengthEqual(pager, 7);
      pagination.isActivePositionEqual(pager, '4');
      pagination.isPagerDisabled(pager, 'Previous', false);
      pagination.isPagerDisabled(pager, 'Next', false);
    });

    it('when user clicks on latest, then "Next" - disabled, "Previous"- enabled, 1st - inactive, last - active', () => {
      cy.viewport(1440, 900);
      pagination.clickOnDemoMenu('Pager');
      pagination.clickOnPage(pager, '7');
      pagination.isSeparatePagerDisabled(pager, 'Previous', false);
      pagination.isSeparatePagerDisabled(pager, 'Next', true);
      pagination.isActivePositionEqual(pager, '7');
      pagination.isPageActive(pager, '1', false);
    });

    it('when user clicks on first, then "Next" - enabled, "Previous"- disabled, 1st - active, last - inactive', () => {
      cy.viewport(1440, 900);
      pagination.clickOnDemoMenu('Pager');
      pagination.clickOnPage(pager, '1');
      pagination.isSeparatePagerDisabled(pager, 'Previous', true);
      pagination.isSeparatePagerDisabled(pager, 'Next', false);
      pagination.isActivePositionEqual(pager, '1');
      pagination.isPageActive(pager, '7', false);
    });

    it('when user clicks on 2, then "Next/Previous"- enabled, 2d - active', () => {
      cy.viewport(1440, 900);
      pagination.clickOnDemoMenu('Pager');
      pagination.clickOnPage(pager, '2');
      pagination.isSeparatePagerDisabled(pager, 'Previous', false);
      pagination.isSeparatePagerDisabled(pager, 'Next', false);
      pagination.isActivePositionEqual(pager, '2');
    });
  });
});
