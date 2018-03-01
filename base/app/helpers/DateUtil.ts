import { NumberUtil } from './NumberUtil';

export class DateUtil {

    static FormatDate(d: number) {

        let date = new Date(d),
            stroke = "/",
            day = date.getDate(),
            month = date.getMonth(),
            year = date.getFullYear(),
            hour = date.getHours(),
            minutes = date.getMinutes();

        return NumberUtil.LeadingZero(day, 2) + "/" + NumberUtil.LeadingZero(month, 2) + "/" + year + " at " + NumberUtil.LeadingZero(hour, 2) + ":" + NumberUtil.LeadingZero(minutes, 2);
    }
}