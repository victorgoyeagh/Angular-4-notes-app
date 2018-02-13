import { ReactiveFormsModule, FormsModule, FormControl, FormBuilder, FormGroup, FormArray, Validators, NgForm, ValidatorFn, AbstractControl } from '@angular/forms';

export class MiscUtil {


    FormatDate(d: number) {

        let date = new Date(d),
            stroke = "/",
            day = date.getDate(),
            month = date.getMonth(),
            year = date.getFullYear(),
            hour = date.getHours(),
            minutes = date.getMinutes();

        return this.LeadingZero(day, 2) + "/" + this.LeadingZero(month, 2) + "/" + year + " at " + this.LeadingZero(hour, 2) + ":" + this.LeadingZero(minutes, 2);
    }

    LeadingZero(num, len) {
        return (Array(len).join("0") + num).slice(-len);
    }

    /* statics */
    static GetRandomNumber(){
        return (Math.floor(Math.random() * 10000) + 1);
    }

    static GetRandomNumberBetween(start, end) {
        let rand = (Math.floor(Math.random() * end) + start);
        return rand;
    }
    static emailValidator(control) {
        if (control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
            return null;
        } else {
            return { 'invalidEmailAddress': true };
        }
    }

    //url search
    static GetParameterByNameAlt(name) {
        let url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }

    static GetParameterByName(name) {
        var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
        return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
    }

    static GetParameterByNameAsJson(a) {
        if (!a) return {};
        a = a.split('#')[0].split('&');
        var b = a.length, c = {}, d, k, v;
        while (b--) {
            d = a[b].split('=');
            k = d[0].replace('[]', ''), v = decodeURIComponent(d[1] || '');
            c[k] ? typeof c[k] === 'string' ? (c[k] = [v, c[k]]) : (c[k].unshift(v)) : c[k] = v;
        }
        return c
    }

    static GetParameterByNameAsJsonAlt() {
        var assoc = {};
        var decode = function (s) { return decodeURIComponent(s.replace(/\+/g, " ")); };
        var queryString = location.search.substring(1);
        var keyValues = queryString.split('&');

        for (var i in keyValues) {
            var key = keyValues[i].split('=');
            if (key.length > 1) {
                assoc[decode(key[0])] = decode(key[1]);
            }
        }

        return assoc;
    }

    /** validators */
    static telephoneRegex = new RegExp("^(0[12357])[0-9]{9}$");
    static postcodeRegex = new RegExp("^(GIR ?0AA|[A-PR-UWYZ]([0-9]{1,2}|([A-HK-Y][0-9]([0-9ABEHMNPRV-Y])?)|[0-9][A-HJKPS-UW]) ?[0-9][ABD-HJLNP-UW-Z]{2})$");
    static emailRegex = new RegExp("^([a-zA-Z0-9_.-]+)@([a-zA-Z0-9_.-]+)\\.([a-zA-Z]{2,5})$");
    static numberRegex = new RegExp("^([0-9]+)$");
    static nameRegex = new RegExp("^[a-z,A-Z ,.'-]+$");
    static atLeastOneNumberSpecialLetter = new RegExp("^(?=.*?[0-9])(?=.*?[.,£]).{8,}$");
    static creditCardRegex = new RegExp("^(?:4[0-9]{12}(?:[0-9]{3})? | (?:5[1-5][0-9]{2} | 222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12} | 3[47][0-9]{13} | 3(?:0[0-5]|[68][0-9])[0-9]{11} | 6(?:011|5[0-9]{2})[0-9]{12} | (?:2131|1800|35\d{3})\d{11})$");
    static ipAddress = new RegExp("^(\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b)$");

    static validator_Required = [
        Validators.required
    ];

    static Validator_Required_MinLength_Pattern(length: number, pattern: RegExp) {
        return [
            Validators.required,
            Validators.minLength(length),
            Validators.pattern(pattern)
        ]
    };

    static Validator_Required_Pattern(pattern: RegExp) {
        return [
            Validators.required,
            Validators.pattern(pattern)
        ]
    };

    static Validator_Pattern(pattern: RegExp) {
        return [
            Validators.required,
            Validators.pattern(pattern)
        ]
    };

    static Validator_MinLength_Pattern(length: number, pattern: RegExp) {
        return [
            Validators.minLength(length),
            Validators.pattern(pattern)
        ]
    };

    static Validator_Required_MinLength(length: number) {
        return [
            Validators.required,
            Validators.minLength(length)
        ]
    };
} 