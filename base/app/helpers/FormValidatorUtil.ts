import { Validators } from '@angular/forms';

export class FormValidator {
    
    /** general validators */
    static telephoneRegex = new RegExp("^(0[12357])[0-9]{9}$");
    static postcodeRegex = new RegExp("^(GIR ?0AA|[A-PR-UWYZ]([0-9]{1,2}|([A-HK-Y][0-9]([0-9ABEHMNPRV-Y])?)|[0-9][A-HJKPS-UW]) ?[0-9][ABD-HJLNP-UW-Z]{2})$");
    static emailRegex = new RegExp("^([a-zA-Z0-9_.-]+)@([a-zA-Z0-9_.-]+)\\.([a-zA-Z]{2,5})$");
    static numberRegex = new RegExp("^([0-9]+)$");
    static nameRegex = new RegExp("^[a-z,A-Z ,.'-]+$");
    static atLeastOneNumberSpecialLetter = new RegExp("^(?=.*?[0-9])(?=.*?[.,£]).{8,}$");
    static creditCardRegex = new RegExp("^(?:4[0-9]{12}(?:[0-9]{3})? | (?:5[1-5][0-9]{2} | 222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12} | 3[47][0-9]{13} | 3(?:0[0-5]|[68][0-9])[0-9]{11} | 6(?:011|5[0-9]{2})[0-9]{12} | (?:2131|1800|35\d{3})\d{11})$");
    static ipAddress = new RegExp("^(\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b)$");
    static pwPattern = new RegExp("^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$");

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
    
    static isEmailStrict(control) {
        if (control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
            return true;
        } else {
            return false;
        }
    }
}