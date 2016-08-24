import { latinMap } from './latin-map';

export class TypeaheadUtils {
  public static latinMap:any = latinMap;

  public static latinize(str:string):string {
    if (!str) {
      return '';
    }
    return str.replace(/[^A-Za-z0-9\[\] ]/g, function (a:string):string {
      return TypeaheadUtils.latinMap[a] || a;
    });
  }

  public static escapeRegexp(queryToEscape:string):string {
    // Regex: capture the whole query string and replace it with the string
    // that will be used to match the results, for example if the capture is
    // 'a' the result will be \a
    return queryToEscape.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1');
  }

  /* tslint:disable */
  public static tokenize(str:string, wordRegexDelimiters = ' ', phraseRegexDelimiters = ''):Array<string> {
    /* tslint:enable */
    let regexStr:string = '(?:[' + phraseRegexDelimiters + '])([^' + phraseRegexDelimiters + ']+)(?:[' + phraseRegexDelimiters + '])|([^' + wordRegexDelimiters + ']+)';
    let preTokenized:Array<string> = str.split(new RegExp(regexStr, 'g'));
    let result:Array<string> = [];
    let preTokenizedLength:number = preTokenized.length;
    let token:string;
    let replacePhraseDelimiters = new RegExp('[' + phraseRegexDelimiters + ']+', 'g');

    for (let i = 0; i < preTokenizedLength; i += 1) {
      token = preTokenized[i];
      if (token && token.length && token !== wordRegexDelimiters) {
        result.push(token.replace(replacePhraseDelimiters, ''));
      }
    }

    return result;
  }

  public static getValueFromObject(object:any, option:string):string {
    if (!option || typeof object !== 'object') {
      return object.toString();
    }

    if (option.endsWith('()')) {
      let functionName = option.slice(0, option.length - 2);
      return object[functionName]().toString();
    }

    let properties:string = option.replace(/\[(\w+)\]/g, '.$1')
      .replace(/^\./, '');
    let propertiesArray:Array<string> = properties.split('.');

    for (let property of propertiesArray) {
      if (property in object) {
        object = object[property];
      }
    }
    return object.toString();
  }
}
