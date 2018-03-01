export class NumberUtil {

    static LeadingZero(num, len) {
        return (Array(len).join("0") + num).slice(-len);
    }

    static GetRandomNumber(){
        return (Math.floor(Math.random() * 10000) + 1);
    }

    static GetRandomNumberBetween(start, end) {
        let rand = (Math.floor(Math.random() * end) + start);
        return rand;
    }
}