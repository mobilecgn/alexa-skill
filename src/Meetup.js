
import MeetupAPI from 'meetup-api';

export default class Meetup {
  constructor(options) {
    this.api = MeetupAPI(options);
  }

  getRecentEvent(group) {
    return new Promise((resolve, reject) => {
      this.api.getEvents({
        group_urlname: group,
        scroll: 'recent_past',
        status: 'past',
        desc: true,
        text_format: 'plain',
      }, (err, response) => {
        if (err) {
          reject(err);
          return;
        }

        if (!response.results || !response.results.length) {
          resolve(null);
          return;
        }

        resolve(this.wrapEvent(response.results[0]));
      });
    });
  }

  getUpcomingEvent(group) {
    return new Promise((resolve, reject) => {
      this.api.getEvents({
        group_urlname: group,
        scroll: 'next_upcoming',
        status: 'upcoming',
        text_format: 'plain',
      }, (err, response) => {
        if (err) {
          reject(err);
          return;
        }

        if (!response.results || !response.results.length) {
          resolve(null);
          return;
        }

        resolve(this.wrapEvent(response.results[0]));
      });
    });
  }

  wrapEvent(event) {
    return {
      id: event.id,
      status: event.status,
      title: event.name,
      date: new Date(event.time + event.utc_offset),
      group: event.group,
      venue: event.venue,
      visibility: event.visibility,
      announced: event.announced,
    };
  }
}
