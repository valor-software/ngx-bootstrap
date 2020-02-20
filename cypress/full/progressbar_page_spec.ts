import { ProgressbarPo } from '../support/progressbar.po';

export function checkDynamicProgressbar() {
  const progressbar = new ProgressbarPo();
  const dynamic = progressbar.exampleDemosArr.dynamic;


  progressbar.getBar(dynamic, 0).then($barValue => {
    const barValueNumber = Number($barValue.text().split(' /')[0]);
    const barType = progressbar.getBarType(barValueNumber);

    progressbar.isBarHaveAttrs(dynamic, [{ attr: 'aria-valuenow', value: `${barValueNumber}` }], 0);
    progressbar.isProgressbarHaveAttrs(dynamic, [{ attr: 'max', value: '200' }], 0);

    progressbar.isBarHaveAttrs(dynamic, [{ attr: 'aria-valuenow', value: `${barValueNumber}` }], 1);
    progressbar.isProgressbarHaveAttrs(dynamic, [{ attr: 'max', value: '100' }, { attr: 'type', value: 'success' }], 1);

    progressbar.isBarHaveAttrs(dynamic, [{ attr: 'aria-valuenow', value: `${barValueNumber}` }], 2);
    progressbar.isBarTxtContain(dynamic, barType, 2);
  });

  progressbar.isButtonExist(dynamic, 'Randomize');
  progressbar.isBarHaveAnimation(dynamic, false, 0);
  progressbar.isBarHaveAnimation(dynamic, false, 1);
  progressbar.isBarHaveAnimation(dynamic, false, 2);
}

// TODO: Tests are broken with Angular latest on Travis, need to investigate, excluded for now
xdescribe('Progressbar demo page test suite', () => {
  const progressbar = new ProgressbarPo();

  beforeEach(() => progressbar.navigateTo());

  describe('Dynamic', () => {
    const dynamic = progressbar.exampleDemosArr.dynamic;

    beforeEach(() => progressbar.scrollToMenu('Dynamic'));

    it('user see 3 dynamic progressbars, "Randomize" button, 1 - default, 2 - "success", 3 - depend on value', () => {
      checkDynamicProgressbar();
    });

    it('when user click "Randomize", then value of each bar changed with type (info/warning/success/danger/)', () => {
      progressbar.clickOnBtn(dynamic, 0);
      checkDynamicProgressbar();
      progressbar.clickOnBtn(dynamic, 0);
      checkDynamicProgressbar();
    });
  });

  describe('Stacked', () => {
    const stacked = progressbar.exampleDemosArr.stacked;

    beforeEach(() => progressbar.scrollToMenu('Stacked'));

    it('user see 1 progressbar with up to 4 bars inside and "Randomize" button', () => {
      progressbar.isProgressBarsLengthEql(stacked, 1);
      progressbar.isBarsLengthGreaterThan(stacked, 0);
      progressbar.isButtonExist(stacked, 'Randomize');
    });

    it('When user click "Randomize", then value of each bar changed, bar should have appropriate percentage', () => {
      progressbar.clickOnBtn(stacked, 0);
      progressbar.getBars(stacked).each(($bar, index) => {
        const barValueNumber = Number($bar.text().split(' %')[0]);

        progressbar.isBarHaveAttrs(stacked, [{ attr: 'aria-valuenow', value: `${barValueNumber}` },
          { attr: 'style', value: `height: 100%; width: ${barValueNumber}%;` }], index);
        progressbar.isBarTypeHaveClass(stacked);
      });
    });
  });

  describe('Configuring defaults', () => {
    const configDefaults = progressbar.exampleDemosArr.config;
    const barConfig = {
      value: 136,
      type: 'danger',
      striped: 'striped',
      animate: true,
      max: 150
    };

    beforeEach(() => {
      cy.viewport(1440, 900);
      progressbar.clickOnDemoMenu('Configuring defaults');
    });

    it('user see 1 progressbar with specific value and type as in Template src', () => {
      progressbar.isProgressBarsLengthEql(configDefaults, 1);
      progressbar.isBarsLengthGreaterThan(configDefaults, 0);
      progressbar.isBarHaveAttrs(configDefaults, [{ attr: 'aria-valuenow', value: `${barConfig.value}` }]);
      progressbar.isBarTypeHaveClass(configDefaults, 0, barConfig.striped);
      progressbar.isBarTypeHaveClass(configDefaults, 0, barConfig.type);
      progressbar.isBarHaveAnimationCSS(configDefaults, barConfig.animate);
      progressbar.isBarTxtContain(configDefaults, `${barConfig.value} / ${barConfig.max}`);
    });
  });
});
