import { latinMap } from './latin-map';
export class TypeaheadUtils {
  static latinMap:any = latinMap;

  public static latinize(str:string) {
    return str.replace(/[^A-Za-z0-9\[\] ]/g, function (a) {
      return TypeaheadUtils.latinMap[a] || a;
    });
  }

  public static escapeRegexp(queryToEscape:string) {
    // Regex: capture the whole query string and replace it with the string that will be used to match
    // the results, for example if the capture is 'a' the result will be \a
    return queryToEscape.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1');
  }

  public static tokenize(str:string, wordRegexDelimiters:string = ' ', phraseRegexDelimiters:string = ''):Array<string> {
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
}
