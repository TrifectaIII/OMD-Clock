//import scss
import './style.scss';

//import date/time library luxon
import {DateTime, DurationObject} from 'luxon';


//access html elements
var reverseTimeH1: HTMLElement | null = document.getElementById('reverseTimeH1');
var reverseSpan: HTMLElement | null = document.getElementById('reverseSpan');
var omdTimeH1: HTMLElement | null = document.getElementById('omdTimeH1');
var omdSpan: HTMLElement | null = document.getElementById('omdSpan');
var reverseSpan2: HTMLElement | null = document.getElementById('reverseSpan2');
// var marriedH3: HTMLElement | null = document.getElementById('marriedH3');
// var matchedSpan: HTMLElement | null = document.getElementById('matchedSpan');

//generate DateTime object for reversal of OMD
const reverse: DateTime = DateTime.utc(2021, 9, 29, 5);

//generate DateTime object for release of OMD
const oneMoreDay: DateTime = DateTime.utc(2007, 12, 28, 5);

//insert date of reversal
reverseSpan && (reverseSpan.innerHTML = reverse.toFormat('DDD'));
reverseSpan2 && (reverseSpan2.innerHTML = reverse.toFormat('DDD'));

//insert date of omd
omdSpan && (omdSpan.innerHTML = oneMoreDay.toFormat('DDD'));

// insert total time OMD was in effect
if (omdTimeH1) {
    //calculate difference between the DateTimes
    const durationObj: DurationObject = dateTimeDiff(oneMoreDay, reverse);
    //convert to one string for HTML insertion
    omdTimeH1.innerHTML = durationObjToString(durationObj, true);
}

// // insert time information re: their marriage into HTML
// if (marriedH3 && matchedSpan) {
    
//     //calculate time between marriage and OMD
//     const marriage: DateTime = DateTime.utc(1987, 6, 9, 5);
//     const diff: DurationObject = dateTimeDiff(marriage, oneMoreDay);
//     marriedH3.innerHTML = durationObjToString(diff, true);

//     //calculate when OMD clock will match that duration
//     const matched: DateTime = oneMoreDay
//         .plus(diff)
//         .minus({day:1} as DurationObject) //subtract last days duration
//         .toLocal(); //convert to local timezone
//     matchedSpan.innerHTML = matched.toFormat('DDD');
// }

//execute update function 10 times a second, and immediately
setInterval(update, 100);
update();

//function to calculate time since OMD and display
function update () {

    //do nothing if no element exists to change
    if (!reverseTimeH1) return;

    //get DateTime for now
    const now: DateTime = DateTime.utc();

    //calculate difference between the DateTimes
    const durationObj: DurationObject = dateTimeDiff(reverse, now);

    //convert to one string for HTML insertion
    reverseTimeH1.innerHTML = durationObjToString(durationObj);
}

//function to calculate diff between two DateTimes as a DurationObject
function dateTimeDiff(before: DateTime, after: DateTime): DurationObject {

    //calculate raw differences
    var yearDiff = after.year - before.year;
    var monthDiff = after.month - before.month;
    var dayDiff = after.day - before.day;
    var hourDiff = after.hour - before.hour;
    var minuteDiff = after.minute - before.minute;
    var secondDiff = after.second - before.second;

    //adjust for negative values
    if (secondDiff < 0) {
        minuteDiff--;
        secondDiff += 60;
    }
    if (minuteDiff < 0) {
        hourDiff--;
        minuteDiff += 60;
    }
    if (hourDiff < 0) {
        dayDiff--;
        hourDiff += 24;
    }
    if (dayDiff < 0) {
        monthDiff--;
        dayDiff += before.daysInMonth;
    }
    if (monthDiff < 0) {
        yearDiff--;
        monthDiff += 12;
    }

    //return as a DurationObject
    return {
        year: yearDiff,
        month: monthDiff,
        day: dayDiff,
        hour: hourDiff,
        minute: minuteDiff,
        second: secondDiff,
    } as DurationObject;
}

//function to convert DurationObject into string with line breaks
function durationObjToString(durationObj: DurationObject, trim?: boolean): string {
    
    //convert to array of strings which represent the lines
    const durationLines: string[] = Object.entries(durationObj).map(([key, value]):string => {
        
        //remove 0-lines if trim active
        if (trim && value === 0) return '';

        //add an s to key if none is there
        if (key.slice(-1) !== 's') key = key+'s';

        //remove s from key if value is 1
        if (parseInt(value) === 1) key = key.slice(0,-1);

        //combine key and value into line
        return parseInt(value.toString()).toString() + ' ' + key.toString();
    });

    //remove empty lines and join with line breaks
    return durationLines.filter((e: string): boolean => e != '').join('<br>');
}