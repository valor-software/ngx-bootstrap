export class SliderHelpers {
  public static pauseEvent(event: Event): void {
    if (event.stopPropagation) {
      event.stopPropagation();
    }
    if (event.preventDefault) {
      event.preventDefault();
    }
    event.cancelBubble = true;
    event.returnValue = false;
  }

  public static getNumDigitsAfterDecimalPlace(num: number): number {
    const match = ('' + num).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
    if (!match) {
      return 0;
    }
    return Math.max(0, (match[1] ? match[1].length : 0) - (match[2] ? +match[2] : 0));
  }

  public static applyToFixedAndParseFloat(num: number, toFixedInput: number): number {
    const truncatedNum = num.toFixed(toFixedInput);
    return parseFloat(truncatedNum);
  }

  public static formatter(val: any): any {
    if (Array.isArray(val)) {
      return val[0] + ' : ' + val[1];
    } else {
      return ''+val;
    }
  }

  public static validateInputValue(val: any): Array<number> {
    if (typeof val === 'number') {
      return [val];
    } else if (Array.isArray(val)) {
      SliderHelpers.validateArray(val);
      return val;
    } else {
      throw new Error('wrong format : ' + val);
    }
  }

  public static validateArray(val: Array<any>): any {
    for (let i = 0; i < val.length; i++) {
      const input = val[i];
      if (typeof input !== 'number') {
        throw new Error('wrong format : ' + input);
      }
    }
  }
}
