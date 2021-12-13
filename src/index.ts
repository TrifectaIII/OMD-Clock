//import scss
import './style.scss';

//import date/time library luxon
import {DateTime, DateTimeOptions, DurationObject} from 'luxon';


//access html elements
var timeH1: HTMLElement | null = document.getElementById('timeH1');
var endSpan: HTMLElement | null = document.getElementById('endSpan');
var marriedH3: HTMLElement | null = document.getElementById('marriedH3');
var marriageStartSpan: HTMLElement | null = document.getElementById('marriageStartSpan');
var marriageEndSpan: HTMLElement | null = document.getElementById('marriageEndSpan');
var omdH3: HTMLElement | null = document.getElementById('omdH3');

//DateTime object for release of OMD
const marriage: DateTime = DateTime.utc(1987, 6, 9, 5);
//DateTime object for release of OMD
const oneMoreDay: DateTime = DateTime.utc(2007, 12, 28, 5);
// DateTime object for reversal of OMD TODO: add actual date
const reversal: DateTime = DateTime.utc(2021, 1, 1, 1);

//insert date of reversal
endSpan && (endSpan.innerHTML = reversal.toFormat('DDD'));

// insert time information re: their marriage into HTML
if (marriedH3 && marriageStartSpan && marriageEndSpan && omdH3) {

    marriedH3.innerHTML = durationObjToString(dateTimeDiff(marriage, oneMoreDay), true);
    marriageStartSpan.innerHTML = marriage.toFormat('DDD');
    marriageEndSpan.innerHTML = oneMoreDay.toFormat('DDD');
    omdH3.innerHTML = durationObjToString(dateTimeDiff(oneMoreDay, reversal), true);

}

//execute update function 10 times a second, and immediately
setInterval(update, 100);
update();

//function to calculate time since OMD and display
function update () {

    //do nothing if no element exists to change
    if (!timeH1) return;

    //get DateTime for now
    const now: DateTime = DateTime.utc();

    //calculate difference between the DateTimes
    const durationObj: DurationObject = dateTimeDiff(reversal, now);

    //convert to one string for HTML insertion
    timeH1.innerHTML = durationObjToString(durationObj);
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