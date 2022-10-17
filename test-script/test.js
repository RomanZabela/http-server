module.exports = {
    isLeapYear(Year) {
        if (Year % 4 == 0) {
            return("Yes")
        } else if (Year % 4 != 0) {
            return("no");
        }
    }
}