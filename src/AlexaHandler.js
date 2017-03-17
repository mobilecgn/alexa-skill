
import Meetup from './Meetup';

const MEETUP_ACCESS_KEY = process.env.MEETUP_ACCESS_KEY;
const MEETUP_GROUP_ID = process.env.MEETUP_GROUP_ID;

const meetup = new Meetup({
  key: MEETUP_ACCESS_KEY,
});

export function handleLaunchRequest() {
  this.emit('NextMeetup');
}

export function handleLastMeetup() {
  try {
    const eventPromise = meetup.getRecentEvent(MEETUP_GROUP_ID);

    eventPromise.then((event) => {
      console.log('Event:', event);
      if (event) {
        this.emit(':tell', 'Das letzte Event war ' + event.title);
      } else {
        this.emit(':tell', 'Mir ist leider kein vorheriges Event bekannt.');
      }
    }, (err) => {
      console.log('Error:', err);
      this.emit(':tell', 'Leider ist etwas schief gelaufen.');
    });
  } catch (e) {
    console.log('Exception:', e);
    this.emit(':tell', 'Leider ist etwas schief gelaufen.');
  }
}

export function handleNextMeetup() {
  try {
    const eventPromise = meetup.getUpcomingEvent(MEETUP_GROUP_ID);

    eventPromise.then((event) => {
      console.log('Event:', event);
      if (event) {
        this.emit(':tell', 'Das nächste Meetup ist ' + event.title);
      } else {
        this.emit(':tell', 'Mir ist leider noch kein neues Event bekannt.');
      }
    }, (err) => {
      console.log('Error:', err);
      this.emit(':tell', 'Leider ist etwas schief gelaufen.');
    });
  } catch (e) {
    console.log('Exception:', e);
    this.emit(':tell', 'Leider ist etwas schief gelaufen.');
  }
}

function handleHelp() {
  this.emit(':ask', 'Frag mich wann das nächste Event stattfindet.', 'try again');
}

function handleCancel() {
  this.emit(':tell', 'Goodbye!');
}

function handleStop() {
  this.emit(':tell', 'Goodbye!');
}

export default {
  LaunchRequest: handleLaunchRequest,
  LastMeetup: handleLastMeetup,
  NextMeetup: handleNextMeetup,
  'AMAZON.HelpIntent': handleHelp,
  'AMAZON.CancelIntent': handleCancel,
  'AMAZON.StopIntent': handleStop,
};
