/**
Simple test to check header text on all pages
 */
'use strict';

const leftPanelTests = require('../e2e/LeftPanelTests.ts');
const headerText = $('.content-header>h2');
let leftPanel = new leftPanelTests();
browser.executeScript('window.name = "NG_ENABLE_DEBUG_INFO!"');

describe('MainPage Test', () => {
  beforeAll(() => {
    browser.get('/');
    browser.manage().window().maximize();
  });
  afterAll(() => {
    leftPanel.checkLeftPanelMaxi();
    leftPanel.checkLeftPanelMini();
  });
  it('Header text test', () => {
    let expectedHeaderText = 'NATIVE ANGULAR 2 DIRECTIVES FOR BOOTSTRAP';
    expect(headerText.getText()).toBe(expectedHeaderText);
  });
  it('Ninja icon link test', () => {
    let ninjaIcon = $('.logo>a');
    let expectedURL = 'https://github.com/valor-software?utf8=%E2%9C%93&query=ng2';
    expect(ninjaIcon.getAttribute('href')).toBe(expectedURL);
  });
});

describe('Accordion Test', () => {
  beforeAll(() => {
    browser.get('/#/accordion');
    browser.manage().window().maximize();
  });
  afterAll(() => {
    leftPanel.checkLeftPanelMaxi();
    leftPanel.checkLeftPanelMini();
  });
  it('Header text test', () => {
    let expectedHeaderText = 'ACCORDION';
    expect(headerText.getText()).toBe(expectedHeaderText);
  });
});

describe('Alerts Test', () => {
  beforeAll(() => {
    browser.get('/#/alerts');
    browser.manage().window().maximize();
  });
  afterAll(() => {
    leftPanel.checkLeftPanelMaxi();
    leftPanel.checkLeftPanelMini();
  });
  it('Header text test', () => {
    let expectedHeaderText = 'ALERTS';
    expect(headerText.getText()).toBe(expectedHeaderText);
  });
});

describe('Buttons Test', () => {
  beforeAll(() => {
    browser.get('/#/buttons');
    browser.manage().window().maximize();
  });
  afterAll(() => {
    leftPanel.checkLeftPanelMaxi();
    leftPanel.checkLeftPanelMini();
  });
  it('Header text test', () => {
    let expectedHeaderText = 'BUTTONS';
    expect(headerText.getText()).toBe(expectedHeaderText);
  });
});

describe('Carousel Test', () => {
  beforeAll(() => {
    browser.get('#/carousel');
    //browser.ignoreSynchronization = true; //without this option current test is failed with tag "Timed out waiting..."
    browser.manage().window().maximize();
  });
  afterAll(() => {
    leftPanel.checkLeftPanelMaxi();
    leftPanel.checkLeftPanelMini();
  });
  it('Header text test', () => {
    let expectedHeaderText = 'CAROUSEL';
    expect(headerText.getText()).toBe(expectedHeaderText);
  });
});

describe('Collapse Test', () => {
  beforeAll(() => {
    browser.get('/#/collapse');
    browser.manage().window().maximize();
  });
  afterAll(() => {
    leftPanel.checkLeftPanelMaxi();
    leftPanel.checkLeftPanelMini();
  });
  it('Header text test', () => {
    let expectedHeaderText = 'COLLAPSE';
    expect(headerText.getText()).toBe(expectedHeaderText);
  });
});

describe('Datepicker Test', () => {
  beforeAll(() => {
    browser.get('/#/datepicker');
    browser.manage().window().maximize();
  });
  afterAll(() => {
    leftPanel.checkLeftPanelMaxi();
    leftPanel.checkLeftPanelMini();
  });
  it('Header text test', () => {
    let expectedHeaderText = 'DATEPICKER';
    expect(headerText.getText()).toBe(expectedHeaderText);
  });
});

describe('Dropdowns Test', () => {
  beforeAll(() => {
    browser.get('/#/dropdowns');
    browser.manage().window().maximize();
  });
  afterAll(() => {
    leftPanel.checkLeftPanelMaxi();
    leftPanel.checkLeftPanelMini();
  });
  it('Header text test', () => {
    let expectedHeaderText = 'DROPDOWNS';
    expect(headerText.getText()).toBe(expectedHeaderText);
  });
});

describe('Modals Test', () => {
  beforeAll(() => {
    browser.get('/#/modals');
    browser.manage().window().maximize();
  });
  afterAll(() => {
    leftPanel.checkLeftPanelMaxi();
    leftPanel.checkLeftPanelMini();
  });
  it('Header text test', () => {
    let expectedHeaderText = 'MODALS';
    expect(headerText.getText()).toBe(expectedHeaderText);
  });
});

describe('Pagination Test', () => {
  beforeAll(() => {
    browser.get('/#/pagination');
    browser.manage().window().maximize();
  });
  afterAll(() => {
    leftPanel.checkLeftPanelMaxi();
    leftPanel.checkLeftPanelMini();
  });
  it('Header text test', () => {
    let expectedHeaderText = 'PAGINATION';
    expect(headerText.getText()).toBe(expectedHeaderText);
  });
});

describe('Progressbar Test', () => {
  beforeAll(() => {
    browser.get('/#/progressbar');
    browser.manage().window().maximize();
  });
  afterAll(() => {
    leftPanel.checkLeftPanelMaxi();
    leftPanel.checkLeftPanelMini();
  });
  it('Header text test', () => {
    let expectedHeaderText = 'PROGRESSBAR';
    expect(headerText.getText()).toBe(expectedHeaderText);
  });
});

describe('Rating Test', () => {
  beforeAll(() => {
    browser.get('/#/rating');
    browser.manage().window().maximize();
  });
  afterAll(() => {
    leftPanel.checkLeftPanelMaxi();
    leftPanel.checkLeftPanelMini();
  });
  it('Header text test', () => {
    let expectedHeaderText = 'RATING';
    expect(headerText.getText()).toBe(expectedHeaderText);
  });
});

describe('Tabs Test', () => {
  beforeAll(() => {
    browser.get('/#/tabs');
    browser.manage().window().maximize();
  });
  afterAll(() => {
    leftPanel.checkLeftPanelMaxi();
    leftPanel.checkLeftPanelMini();
  });
  it('Header text test', () => {
    let expectedHeaderText = 'TABS';
    expect(headerText.getText()).toBe(expectedHeaderText);
  });
});

describe('Timepicker Test', () => {
  beforeAll(() => {
    browser.get('/#/timepicker');
    browser.manage().window().maximize();
  });
  afterAll(() => {
    leftPanel.checkLeftPanelMaxi();
    leftPanel.checkLeftPanelMini();
  });
  it('Header text test', () => {
    let expectedHeaderText = 'TIMEPICKER';
    expect(headerText.getText()).toBe(expectedHeaderText);
  });
});

describe('Tooltip Test', () => {
  beforeAll(() => {
    browser.get('/#/tooltip');
    browser.manage().window().maximize();
  });
  afterAll(() => {
    leftPanel.checkLeftPanelMaxi();
    leftPanel.checkLeftPanelMini();
  });
  it('Header text test', () => {
    let expectedHeaderText = 'TOOLTIP';
    expect(headerText.getText()).toBe(expectedHeaderText);
  });
});

describe('Typeahead Test', () => {
  beforeAll(() => {
    browser.get('/#/typeahead');
    browser.manage().window().maximize();
  });
  afterAll(() => {
    leftPanel.checkLeftPanelMaxi();
    leftPanel.checkLeftPanelMini();
  });
  it('Header text test', () => {
    let expectedHeaderText = 'TYPEAHEAD';
    expect(headerText.getText()).toBe(expectedHeaderText);
  });
});

