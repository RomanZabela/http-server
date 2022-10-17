const isLeapYear = require('../test-script/test');

const expect = require('chai').expect;

describe ('Leap year test', () => {
    it ('1. check Year', () => {
        let yearTest = isLeapYear(1919);
        expect(yearTest).to.be.false;
    });

    it ('2. check Year', () => {
        let yearTest = isLeapYear(2004);
        expect(yearTest).to.be.true;
    });
})