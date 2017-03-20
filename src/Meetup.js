
import MeetupAPI from 'meetup-api';

const promisify = [
  'getEvents',
];

export default class Meetup {
  constructor(options) {
    this.api = MeetupAPI(options);

    promisify.forEach((method) => {
      this[method] = params => new Promise((resolve, reject) => {
        this.api[method](params, (err, response) => {
          if (err) {
            reject(err);
          } else {
            resolve(response);
          }
        });
      });
    });
  }

  getNearbyEvents() {
    return this.findEvents({
      text_format: 'plain',
    }).then(response => response.results);
  }

  getPastEvents(group) {
    return this.getEvents({
      group_urlname: group,
      status: 'past',
      desc: true,
      text_format: 'plain',
    }).then(response => response.results);
  }

  getUpcomingEvent(group) {
    return this.getEvents({
      group_urlname: group,
      status: 'upcoming',
      text_format: 'plain',
    }).then(response => response.results);
  }
}
