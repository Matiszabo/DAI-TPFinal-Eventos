export default class ValidationHelper{
    intMoreThan = (num, min) => {
        return num > min
    }
    intMoreOrEqualThan = (num, min) => {
        return num >= min
    }
    stringLongerThan = (str, min) => {
        return str.length > min
    }
    stringLongerOrEqualThan = (str, min) => {
        return str.length >= min
    }

    validateEmail = (email) => {
        const regex = /^[a-zA-Z0-9.]+@[a-zA-Z0-9.]+$/;
        return regex.test(email);
    }

    isNull = (item) => {
        return item === null;
    }
}   