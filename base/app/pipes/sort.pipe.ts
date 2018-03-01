import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'sortBy'
})
export class SortByPipe implements PipeTransform {
    transform(items: any[], sortedBy: string): any {
        
        let result = items.sort(function (a, b) {
            var nameA = a[sortedBy].toLowerCase(), nameB = b[sortedBy].toLowerCase();
            if (nameA < nameB)
                return -1;
            if (nameA > nameB)
                return 1;
            return 0; 
        })

        return result;
    }
} 
