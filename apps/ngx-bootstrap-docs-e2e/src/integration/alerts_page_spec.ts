import { AlertsPo } from '../support/alerts.po';

describe('Alerts page testing suite', () => {
  const alerts = new AlertsPo();

  beforeEach(() => alerts.navigateTo());

  describe('Basic', () => {
    const basic = alerts.exampleDemosArr.basic;

    it('example contains success, info, warning and danger types of alerts', () => {
      alerts.isAlertVisible(basic, 'success');
      alerts.isAlertVisible(basic, 'info');
      alerts.isAlertVisible(basic, 'warning');
      alerts.isAlertVisible(basic, 'danger');
    });
  });
});
