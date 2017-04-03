
import moment from 'moment';

moment.locale('de');

export function generateEventTitle(event) {
  if (!event || !event.name) {
    return '';
  }

  let title = event.name;

  // This removes our standard event-name-prefix. TODO: Generalize this..
  while (title.indexOf('mobile.cologne') !== -1) {
    title =
        title.substring(0, title.indexOf('mobile.cologne')) +
        title.substring(title.indexOf('mobile.cologne') + 14);
  }

  return title.trim();
}

export function generateEventStart(event, referenceTime) {
  if (!event || !event.time) {
    return '';
  }

  const calendar = moment.utc(event.time + event.utc_offset);
  if (!calendar.isValid()) {
    return '';
  }

  let start = calendar.calendar(referenceTime);
  if (start.length <= 10) {
    start = `am ${start}`;
  }
  return start;
}
