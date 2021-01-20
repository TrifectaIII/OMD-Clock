import './index.html';
import './style.scss';
import {Interval, DateTime, Duration, DurationObject} from 'luxon';

var timeH1: HTMLElement | null = document.getElementById('timeH1');

function update () {
    if (!timeH1) return;
    const released: DateTime = DateTime.utc(2007, 12, 28, 5);
    const now: DateTime = DateTime.utc();
    const duration: Duration = Interval.fromDateTimes(released, now).toDuration();
    const durationObj: DurationObject = duration.shiftTo(
        'year',
        'month',
        'day',
        'hour',
        'minute',
        'second',
    ).toObject();
    const durationString: string = Object.entries(durationObj).map(([key, value]):string => {
        if (!parseInt(value)) return ''; 
        return parseInt(value.toString()).toString() + ' ' + key.toString();
    }).filter((e: string): boolean => e!='').join('<br>');
    timeH1.innerHTML = durationString;
}

setInterval(update, 100);

update();


