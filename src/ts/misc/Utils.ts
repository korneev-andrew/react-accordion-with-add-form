import {PersonDTO} from "../Person"
import moment from 'moment';

export class Utils {

    // PEOPLE EXTRACTION
    public static tryExtractPerson(line: string[]): PersonDTO|null {
        if (!line || line.length === 0) {
            return null;
        }

        let riskPersantage = this.tryExtractRiskPersantage(line.pop());
        if (riskPersantage == null) {
            console.log('Risk persantage is not valid');
            return null;
        }
        riskPersantage = riskPersantage as number;

        let age = this.tryExtractAge(line.pop());
        if (age == null || age < 0) {
            console.log('Age format is not valid');
            return null;
        }
        age = age as number;

        let countryCode = line.pop();
        if (!this.isValidCountryCode(countryCode)) {
            console.log('Country code is not valid');
            return null;
        }
        countryCode = countryCode as string;
        
        let lastName = line.pop();
        if (!lastName) {
            console.log('Last Name is absent');
            return null;
        } else if (this.hasNonLiteralChars(lastName)) {
            console.log('Last name contains non literal chars');
            return null;
        } else if (this.startsInLowerCase(lastName)) {
            console.log('Last name starts in lower case');
            return null;
        }
        lastName = lastName as string;

        const firstNameReducer = (accumulator: string, currentValue: string) => accumulator + ' ' +  currentValue;
        let firstName = line.reduce(firstNameReducer);
        if (!firstName) {
            console.log('First Name is absent');
            return null;
        } else if (this.hasNonLiteralChars(line)) {
            console.log('First name contains non literal chars');
            return null;
        } else if (this.startsInLowerCase(lastName)) {
            console.log('First name starts in lower case');
            return null;
        }
        firstName = firstName as string;

        // All fields should be valid at this point
        return {first_name: firstName,
                last_name: lastName,
                age: age,
                city_or_cc: countryCode,
                risk_percentage: riskPersantage,};
    }

    private static tryExtractRiskPersantage(s: string|undefined): number|null {
        let riskP = this.tryExtractNumber(s);
        if (riskP == null) {
            return null;
        }

        riskP = riskP as number;

        if (riskP < 0 || riskP > 1) {
            return null;
        }

        return Math.round(riskP * 100);
    }

    private static tryExtractNumber(s: string|undefined): number|null {
        if (!s) {
            return null;
        }

        const num = new Number(s).valueOf();
        if (isNaN(num) || num == null) {
            return null;
        }

        return num;
    }

    private static tryExtractAge(s: string|undefined): number|null {
        let age = this.tryExtractNumber(s);
        if (age) {
            return age;
        }

        return tryExtractAgeFromDate(s as string);

        function tryExtractAgeFromDate(s: string): number|null {
            if (!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(s)) {
                return null;
            }

            const date = moment(s, "DD/MM/YYYY");
            if (!date.isValid()) {
                return null;
            }

            const now = moment();
            if (date.isAfter(now)) {
                return null;
            }

            return now.diff(date, 'years');
        };
    }

    private static isValidCountryCode(s: string|undefined): boolean {
        return !!s && s.length === 2 && s === s.toUpperCase() && !this.hasNonLiteralChars(s);
    }

    private static hasNonLiteralChars(s: string|string[]): boolean {
        if (s instanceof Array) {
            for (let str of s) {
                if (hasNonLiteralChars(str)) {
                    return true;
                }
            }
            return false;
        }

        return hasNonLiteralChars(s as string);

        function hasNonLiteralChars(s: string): boolean {
            return !/^[a-zA-Z]+$/.test(s);
        }
    }

    private static startsInLowerCase(s: string): boolean {
        return s.charAt(0) !== s.charAt(0).toUpperCase();
    }

    // !PEOPLE EXTRACTION
}