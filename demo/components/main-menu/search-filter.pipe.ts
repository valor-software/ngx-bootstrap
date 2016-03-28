import {Pipe} from 'angular2/core';

@Pipe({
  name: 'SearchFilter'
})

export class SearchFilter {
  transform(value:any, args:any) {
    let [text] = args;

    if (!text) {
      return value;
    }

    var items:any = value;
    var newItems:any = [];

    items.forEach(function (item:any) {
      if (item.name.toLowerCase().indexOf(text.toLowerCase()) !== -1) {
        newItems.push(item);
      }
    });

    return newItems;
  }
}
