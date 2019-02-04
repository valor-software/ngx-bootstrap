import { PopoverPo } from '../support/popover.po';

describe('Popover demo Positions', () => {
  const popover = new PopoverPo();
  const applitoolsParams = {
    appName: 'NGX-bootstrap Position',
    concurrency: 1,
    matchLevel: 'Strict',
    browser: [{
      name: 'chrome',
      width: 360,
      height: 640
    }, {
      name: 'chrome',
      width: 1366,
      height: 768
    }, {
      name: 'chrome',
      width: 768,
      height: 1024
    }, {
      name: 'firefox',
      width: 360,
      height: 640
    }, {
      name: 'firefox',
      width: 1366,
      height: 768
    }, {
      name: 'firefox',
      width: 768,
      height: 1024
    }]
  };
  function eyesCheck(componentName, demoClass, itemName){
    cy.wrap(demoClass)
      .eyesOpen(applitoolsParams)
      .eyesCheckWindow({
        sizeMode: 'selector',
        selector: `${demoClass}-${itemName}`,
        tag: `${componentName}-${demoClass}`,
        sendDom: false
      })
      .eyesClose();
  }

  beforeEach(() => popover.navigateTo());
  const placementDemo = popover.exampleDemosArr.placement;

  it('when user click on trigger btn in the Placement exmpl - container appears on the setted placement', () => {
    popover.clickOnBtn(placementDemo, 0);
    eyesCheck('Popover', placementDemo, 'top');
    popover.clickOnBtn(placementDemo, 0);
    popover.clickOnBtn(placementDemo, 1);
    eyesCheck('Popover', placementDemo, 'right');
    popover.clickOnBtn(placementDemo, 1);
    popover.clickOnBtn(placementDemo, 2);
    eyesCheck('Popover', placementDemo, 'auto');
    popover.clickOnBtn(placementDemo, 2);
    popover.clickOnBtn(placementDemo, 3);
    eyesCheck('Popover', placementDemo, 'left');
    popover.clickOnBtn(placementDemo, 3);
    popover.clickOnBtn(placementDemo, 4);
    eyesCheck('Popover', placementDemo, 'bottom');
    popover.clickOnBtn(placementDemo, 4);
  });
});
