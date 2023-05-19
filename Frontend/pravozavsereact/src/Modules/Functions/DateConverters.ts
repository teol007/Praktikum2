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

export { toSlovenianDate, toSlovenianTime, toSlovenianDateTime };