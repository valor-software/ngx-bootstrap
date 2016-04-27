import {it, inject, beforeEachProviders} from 'angular2/testing';
import {AlertComponent} from './alert.component';

describe('Alert', () => {
  beforeEachProviders(() => [
    AlertComponent
  ]);

  it('should have default type', inject([AlertComponent], (alert:AlertComponent) => {
    expect(alert.type)
      .toEqual('warning');
  }));
});
