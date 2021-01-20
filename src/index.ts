import './index.html';
import './style.scss';
import './static/android-chrome-192x192.png';
import './static/android-chrome-512x512.png';
import './static/apple-touch-icon.png';
import './static/favicon-16x16.png';
import './static/favicon-32x32.png';
import './static/favicon.ico';
import './static/site.webmanifest';

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
        if (parseInt(value) === 1) key = key.slice(0,-1);
        return parseInt(value.toString()).toString() + ' ' + key.toString();
    }).join('<br>');
    timeH1.innerHTML = durationString;
}

setInterval(update, 100);

update();


