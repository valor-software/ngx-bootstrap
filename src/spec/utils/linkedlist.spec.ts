import { LinkedList } from '../../utils/linked-list.class';

let list: LinkedList<any>;

describe('Linked List. Base functions.', () => {
  beforeEach(() => {
    list = new LinkedList<string>();
    list.add('1');
    list.add('2');
    list.add('3');
    list.add('4');
    list.add('5');
  });

  it('List length must available', () => {
    expect(list.length).toEqual(5);
  });

  it('Check get()', () => {
    expect(list.length).toEqual(5);
    expect(list.get(2)).toEqual('3');
  });

  it('Check toArray function', () => {
    expect(list.toArray().join()).toEqual('1,2,3,4,5');
  });

  it('Check remove(0)', () => {
    list.remove(0);
    expect(list.toArray().join()).toEqual('2,3,4,5');
  });

  it('Check remove()', () => {
    list.remove(0);
    expect(list.toArray().join()).toEqual('2,3,4,5');
  });

  it('Check remove(2)', () => {
    list.remove(2);
    expect(list.toArray().join()).toEqual('1,2,4,5');
  });

  it('Check remove(4)', () => {
    list.remove(4);
    expect(list.toArray().join()).toEqual('1,2,3,4');
  });

  it('Check add(4, 2)', () => {
    list.add(4, 2);
    expect(list.toArray().join()).toEqual('1,2,4,3,4,5');
  });

  it('Check set(4, 2)', () => {
    list.set(4, 2);
    expect(list.toArray().join()).toEqual('1,2,3,4,2');
  });
});

describe('Linked List. Overridden (from Array) methods.', () => {
  beforeEach(() => {
    list = new LinkedList<string>();
    list.add('1');
    list.add('2');
    list.add('3');
    list.add('4');
    list.add('5');
  });

  it('Check instance of indexOf', () => {
    expect(list.indexOf('3')).toEqual(2);
  });

  it('Check push(6, 7, 8)', () => {
    expect(list.push(6, 7, 8)).toEqual(8);
    expect(list.toArray().join()).toEqual('1,2,3,4,5,6,7,8');
  });

  it('Check pop()', () => {
    expect(list.pop()).toEqual('5');
    expect(list.toArray().join()).toEqual('1,2,3,4');
  });

  it('Check unshift(a, b, c)', () => {
    expect(list.unshift('a', 'b', 'c')).toEqual(8);
    expect(list.toArray().join()).toEqual('a,b,c,1,2,3,4,5');
  });

  it('Check shift()', () => {
    expect(list.shift()).toEqual('1');
    expect(list.toArray().join()).toEqual('2,3,4,5');
  });

  it('Check forEach', () => {
    list.forEach((item: string, index: number) => {
      list.set(index, 'new_' + item);
    });
    expect(list.toArray().join()).toEqual('new_1,new_2,new_3,new_4,new_5');
  });

  it('Check toString', () => {
    expect(list.toString()).toEqual('[Linked List]');
  });

  it('Positive check some()', () => {
    expect(list.some((item: string) => item === '2'));
  });

  it('Negative check some()', () => {
    expect(list.some((item: string) => item === '6')).toBeFalsy();
  });

  it('Negative check every()', () => {
    expect(list.every((item: string) => item === '2')).toBeFalsy();
  });

  it('Positive check every()', () => {
    expect(list.every((item: string) => item !== '0')).toBeTruthy();
  });
});

describe('Linked List. Working with objects.', () => {
  beforeEach(() => {
    list = new LinkedList<any>();
    list.add({ stringProperty: 'String1', numberProperty: 10 });
    list.add({ stringProperty: 'String2', numberProperty: 20 });
    list.add({ stringProperty: 'String3', numberProperty: 30 });
    list.add({ stringProperty: 'String4', numberProperty: 40 });
    list.add({ stringProperty: 'String5', numberProperty: 50 });
  });

  it('Check find', () => {
    let result: any = list.find((item: any) => item.numberProperty === 20);
    expect(result.stringProperty).toEqual('String2');

    result = list.find((item: any, index: number) => index === 2);
    expect(result.stringProperty).toEqual('String3');
  });

  it('Check findIndex', () => {
    let result: number = list.findIndex(
      (item: any) => item.numberProperty === 20
    );
    expect(result).toEqual(1);

    result = list.findIndex((item: any, index: number) => index === 2);
    expect(result).toEqual(2);
  });

  it('Check findAll', () => {
    const result: any = list.findAll((item: any) => item.numberProperty > 20);
    expect(result.length).toEqual(3);
  });
});
