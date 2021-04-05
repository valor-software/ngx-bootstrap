import { TypeaheadMatch } from '../index';

describe('TypeaheadMatch tests', () => {
  let typeaheadMatch: TypeaheadMatch;

  beforeEach(() => {
    typeaheadMatch = new TypeaheadMatch('test', 'testing text', false);
  });

  it('should have a valid constructor', () => {
    expect(typeaheadMatch).not.toBeNull();
  });

  it('should set values correctly through constructor', () => {
    typeaheadMatch = new TypeaheadMatch('Alabama', 'test', true);
    expect(typeaheadMatch.item).toEqual('Alabama');
    expect(typeaheadMatch.value).toEqual('test');
  });

  it('should call isHeader and return header', () => {
    const valueHeader = typeaheadMatch.isHeader();
    expect(valueHeader).toEqual(false);
  });

  it('should call toString and return value', () => {
    const value = typeaheadMatch.toString();
    expect(value).toEqual('testing text');
  });

  /*afterEach(() => {
    typeaheadMatch = void 0;
  });*/
});
