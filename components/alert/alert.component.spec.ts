import {it, inject, beforeEachProviders} from 'angular2/testing';
import {Alert} from './alert.component';

describe('Alert', () => {
  beforeEachProviders(() => [
    Alert
  ]);

  it('should have default type', inject([Alert], (alert:Alert) => {
    expect(alert.type)
      .toEqual('warning');
  }));
});
