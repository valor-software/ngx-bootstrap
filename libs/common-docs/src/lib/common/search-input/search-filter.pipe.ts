import { Pipe, PipeTransform } from '@angular/core';
import { Route, Routes } from '@angular/router';

@Pipe({
  name: 'SearchFilter',
  standalone: false
})
export class SearchFilterPipe implements PipeTransform {
  transform(value: Routes, text?: string): Routes {
    if (!text) {
      return value;
    }

    const items = value;
    const newItems: Routes = [];

    items.forEach(function (item: Route): void {
      if (!item.children?.length && item.data?.[0]?.toLowerCase().indexOf(text.toLowerCase()) !== -1) {
        newItems.push(item);
      }

      if (item.children?.length) {
        item.children.forEach((childItem: Route) => {
          if (childItem.data?.[0]?.toLowerCase().indexOf(text.toLowerCase()) !== -1) {
            newItems.push(childItem);
          }
        });
      }
    });
    return newItems;
  }
}
