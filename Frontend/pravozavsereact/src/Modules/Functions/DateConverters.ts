const to2Digits = (num: number|string): string => {
    const stringNum = num.toString();
    if(stringNum.length<2)
        return '0'+stringNum;

    return stringNum;
}

const toSlovenianDate = (date: Date): string => {
    const slovenianDate = `${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()}`;
    return slovenianDate;
}

const toSlovenianTime = (date: Date): string => {
    const slovenianTime = `${to2Digits(date.getHours())}:${to2Digits(date.getMinutes())}`;
    return slovenianTime;
}

const toSlovenianDateTime = (date: Date): string => {
    const slovenianDateTime = `${toSlovenianDate(date)} ${toSlovenianTime(date)}`;
    return slovenianDateTime;
}

const timeBetweenDatesSeconds = (earlierDate: Date, laterDate: Date): number => {
    return Math.round((laterDate.getTime() - earlierDate.getTime()) / 1000); //+ (new Date().getTimezoneOffset() * 60)
}

const timeBetweenDates = (date1: Date, date2: Date): string => {
    const differenceSeconds = Math.abs(timeBetweenDatesSeconds(date1, date2));
    //const seconds = differenceSeconds%60;
    const minutes = Math.floor((differenceSeconds/60)%60);
    const hours = Math.floor((differenceSeconds/60/60)%24);
    const days = Math.floor(differenceSeconds/60/60/24);

    return days+' dni '+hours+'h '+minutes+'min '; //+seconds+'s';
}

export { toSlovenianDate, toSlovenianTime, toSlovenianDateTime, timeBetweenDatesSeconds, timeBetweenDates };