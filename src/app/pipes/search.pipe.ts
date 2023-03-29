import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(list: any[], item: string): any[] {
    if (!item) return list;
    return list.filter(name => name.name.toUpperCase().includes(item.toUpperCase()));
  }

}
