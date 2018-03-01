import { Pipe, PipeTransform } from '@angular/core';
import { NumberUtil } from './../helpers/NumberUtil';

@Pipe({
    name: 'formatAsUKDate',
    pure: true
})

export class FormatAsUKDatePipe implements PipeTransform {

    transform(value: number) {

        if (isNaN(value)) {
            return value;
            //throw new Error("Wtf... you cannot apply a 'FormatDate' pipe to a non numeric value");
        } 

        let date = new Date(value),
            stroke = "/",
            day = date.getDate(),
            month = date.getMonth(),
            year = date.getFullYear();

        return NumberUtil.LeadingZero(day, 2) + "/" + NumberUtil.LeadingZero(month, 2) + "/" + year;
    }
}


@Pipe({
    name: 'formatAs24HourTime',
    pure: true
})

export class FormatAs24HourTimePipe implements PipeTransform {

    transform(value: number) {

        if (isNaN(value)) {
            return value;
            //throw new Error("Wtf... you cannot appply a 'FormatDate' pipe to a non numeric value");
        }

        let date = new Date(value),
            hour = date.getHours(),
            minutes = date.getMinutes();

        return NumberUtil.LeadingZero(hour, 2) + ":" + NumberUtil.LeadingZero(minutes, 2);
    }
}