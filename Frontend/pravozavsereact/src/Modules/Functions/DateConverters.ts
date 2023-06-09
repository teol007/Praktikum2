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


const utcToSloveniaDiffHours = 2;
const toSlovenianTimePlusTimezoneDifference = (date: Date): string => {
    date.setMinutes(date.getMinutes() + utcToSloveniaDiffHours*60);
    const slovenianTime = `${to2Digits(date.getHours())}:${to2Digits(date.getMinutes())}`;
    return slovenianTime;
}

const toSlovenianDateTime = (date: Date): string => {
    const slovenianDateTime = `${toSlovenianDate(date)} ${toSlovenianTime(date)}`;
    return slovenianDateTime;
}

const toSlovenianDateTimePlusTimezoneDifference = (date: Date): string => {
    const slovenianDateTime = `${toSlovenianDate(date)} ${toSlovenianTimePlusTimezoneDifference(date)}`;
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

const timeBetweenDatesDaysNumber = (date1: Date, date2: Date): number => {
    const differenceSeconds = Math.abs(timeBetweenDatesSeconds(date1, date2));
    //const seconds = differenceSeconds%60;
    const days: number = Math.floor(differenceSeconds/60/60/24);

    return days//+' dni ';//+hours+'h '+minutes+'min '+seconds+'s';
}

const getAnswerDeadlineDate = (assignedDate: Date): Date => {
    const incomingMidnight = new Date(assignedDate.getFullYear(), assignedDate.getMonth(), assignedDate.getDate() + 1);
    incomingMidnight.setDate(incomingMidnight.getDate()+7);
    return incomingMidnight;
}

const getAnswerResonsesDeadlineDate = (assignedDate: Date): Date => {
    const incomingMidnight = new Date(assignedDate.getFullYear(), assignedDate.getMonth(), assignedDate.getDate() + 1);
    incomingMidnight.setDate(incomingMidnight.getDate()+14);
    return incomingMidnight;
}

function isBefore(date1: Date, date2: Date) {
    return date1 < date2;
}

export { toSlovenianDate, toSlovenianTime, toSlovenianTimePlusTimezoneDifference, toSlovenianDateTime, toSlovenianDateTimePlusTimezoneDifference, timeBetweenDatesSeconds, timeBetweenDates, getAnswerDeadlineDate, getAnswerResonsesDeadlineDate, timeBetweenDatesDaysNumber, isBefore};
