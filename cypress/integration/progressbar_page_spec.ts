import { ProgressbarPo } from '../support/progressbar.po';

describe('Progressbar demo page test suite', () => {
  const progressbar = new ProgressbarPo();

  beforeEach(() => progressbar.navigateTo());

  describe('Configuring defaults', () => {
    const configured = progressbar.exampleDemosArr.config;

    it('preconfigured progressbar contains styles and value from config', () => {
      const configInTempl = {
        type: 'danger',
        valueNow: '136'
      };
      const configInComp = {
        animated: 'progress-bar-animated',
        striped: 'progress-bar-striped',
        maxVal: '150'
      };

      cy.get(`${ configured } ${ progressbar.tagProgressbar }`).as('progressbarConf')
        .should('to.have.attr', 'type', configInTempl.type)
        .and('to.have.attr', 'max', configInComp.maxVal);

      cy.get('@progressbarConf').find(progressbar.tagBar)
        .should('to.have.class', configInComp.animated)
        .and('to.have.class', configInComp.striped)
        .and('to.have.attr', 'aria-valuenow', configInTempl.valueNow);
    });
  });
});
