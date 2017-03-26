
import Meetup from '../utils/Meetup';

const MEETUP_ACCESS_KEY = process.env.MEETUP_ACCESS_KEY;
const MEETUP_GROUP_ID = process.env.MEETUP_GROUP_ID;

const meetup = new Meetup({
  key: MEETUP_ACCESS_KEY,
});

export default async function LastMeetup(request, response) {
  try {
    const events = await meetup.getPastEvents(MEETUP_GROUP_ID);

    if (events && events.length > 0) {
      response
        .say(`Das letzte Meetup war ${events[0].name}`)
        .card({
          type: 'Simple',
          title: 'Letzte Meetup',
          content: `Das letzte Meetup war ${events[0].name}`,
        })
        .send();
    } else {
      response.say('Mir ist leider kein vergangenes Meetup bekannt.');
    }
  } catch (e) {
    console.log('Exception:', e);
    response.say('Leider ist etwas schief gelaufen.');
  }

  return false;
}
