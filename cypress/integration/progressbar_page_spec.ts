import { ProgressbarPo } from '../support/progressbar.po';

describe('Progressbar demo page test suite', () => {
  const progressbar = new ProgressbarPo();

  beforeEach(() => progressbar.navigateTo());

  describe('Static', () => {
    const staticBars = progressbar.exampleDemosArr.static;

    xit('User see 3 progressbars, 1 value matches config, 2 - "warning", 3 - "danger", animation', () => {
      progressbar.scrollToMenu('Static');
      progressbar.isProgressbarHaveAttrs(staticBars, [{ attr: 'max', value: '100' }], 0);
      progressbar.isProgressbarHaveAttrs(staticBars, [{ attr: 'type', value: 'warning' },
        { attr: 'max', value: '100' }], 1);
      progressbar.isProgressbarHaveAttrs(staticBars, [{ attr: 'type', value: 'danger' },
        { attr: 'max', value: '200' }], 2);

      progressbar.isBarHaveAttrs(staticBars, [{ attr: 'aria-valuetext', value: '55%' }], 0);
      progressbar.isBarHaveAttrs(staticBars, [{ attr: 'aria-valuetext', value: '22%' }], 1);
      progressbar.isBarHaveAttrs(staticBars, [{ attr: 'aria-valuetext', value: '83%' },
        { attr: 'aria-valuenow', value: '166' }], 2);
      progressbar.isBarHaveAnimationCSS(staticBars, true, 2);
    });
  });
});
