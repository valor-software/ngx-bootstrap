import { BaseComponent } from './base.component';
import { AttrObj } from './interfaces';

export class ProgressbarPo extends BaseComponent {
  pageUrl = '#/progressbar';
  pageTitle = 'Progressbar';
  ghLinkToComponent = 'https://github.com/valor-software/ngx-bootstrap/tree/development/src/progressbar';

  tagProgressbar = 'progressbar';
  tagBar = 'bar';

  exampleDemosArr = {
    static: 'demo-progressbar-static',
    dynamic: 'demo-progressbar-dynamic',
    stacked: 'demo-progressbar-stacked',
    config: 'demo-progressbar-config'
  };

  isProgressbarHaveAttrs(baseSelector: string, attributes: AttrObj[], progressBarIndex = 0) {
    cy.get(`${ baseSelector } ${ this.tagProgressbar }`).eq(progressBarIndex)
      .then(progressbar => {
        let i = 0;
        for (; i < attributes.length; i++) {
          expect(progressbar).to.have.attr(attributes[i].attr, attributes[i].value);
        }
      });
  }

  isBarHaveAttrs(baseSelector: string, attributes: AttrObj[], barIndex = 0) {
    this.getBar(baseSelector, barIndex).then(bar => {
        let i = 0;
        for (; i < attributes.length; i++) {
          expect(bar).to.have.attr(attributes[i].attr, attributes[i].value);
        }
      });
  }

  isBarTypeHaveClass(baseSelector: string, barIndex = 0, expectedClass?: string) {
    this.getBar(baseSelector, barIndex).then($bar => {
      if (!expectedClass) {
        expect($bar.attr('class').split('bg-')[1]).to.match(/^(success|info|danger|warning) progress-bar$/);
      } else {
        expect($bar.attr('class').split('bg-')[1]).to.contain(expectedClass);
      }
    });
  }

  isBarHaveAnimation(baseSelector: string, animated: boolean, barIndex = 0) {
    this.getBar(baseSelector, barIndex).then(bar => animated ? expect(bar).to.have.class('progress-bar-animated') :
        expect(bar).not.to.have.class('progress-bar-animated'));
  }

  isBarHaveAnimationCSS(baseSelector: string, animated: boolean, barIndex = 0) {
    this.getBar(baseSelector, barIndex).then(bar => animated ? expect(bar.css('animation')).not.to.be.undefined :
        expect(bar.css('animation')).to.be.undefined);
  }

  isBarTxtContain(baseSelector: string, expectedText: string, barIndex = 0) {
    this.getBar(baseSelector, barIndex).invoke('text').should('to.contain', expectedText);
  }

  getBar(baseSelector: string, barIndex = 0) {
    return cy.get(`${baseSelector} ${this.tagProgressbar} ${this.tagBar}`).eq(barIndex);
  }

  getBarType(barValueNumber: number) {
    let barType: string;

    switch (true) {
      case (barValueNumber >= 25 && barValueNumber < 50) :
        barType = 'info';
        break;

      case (barValueNumber >= 50 && barValueNumber < 75) :
        barType = 'warning';
        break;

      case (barValueNumber < 25) :
        barType = 'success';
        break;

      case (barValueNumber >= 75) :
        barType = 'danger';
        break;

      default:
        barType = 'info';
    }

    return barType;
  }

  isProgressBarsLengthEql(baseSelector: string, expectedLength: number) {
    cy.get(`${ baseSelector } ${ this.tagProgressbar }`).its('length').should('eq', expectedLength);
  }

  isBarsLengthGreaterThan(baseSelector: string, minLength: number) {
    cy.get(`${ baseSelector } ${ this.tagProgressbar } ${ this.tagBar }`).its('length').should('be.gt', minLength);
  }

  getBars(baseSelector: string) {
    return cy.get(`${ baseSelector } ${ this.tagProgressbar } ${ this.tagBar }`);
  }
}
