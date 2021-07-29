import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'SearchFilter' })
export class SearchFilterPipe implements PipeTransform {
  transform(value: any, text: any): any {
    if (!text) {
      return value;
    }

    const items: any = value;
    const newItems: any = [];

    items.forEach(function(item: any): void {
      if (item.data[0].toLowerCase().indexOf(text.toLowerCase()) !== -1) {
        newItems.push(item);
      }
    });

    return newItems;
  }
}
