
import Meetup from '../utils/Meetup';
import { generateEventTitle, generateEventStart } from '../utils/Speech';

const MEETUP_ACCESS_KEY = process.env.MEETUP_ACCESS_KEY;
const MEETUP_GROUP_ID = process.env.MEETUP_GROUP_ID;

const meetup = new Meetup({
  key: MEETUP_ACCESS_KEY,
});

export default async function NextMeetup(request, response) {
  try {
    const events = await meetup.getUpcomingEvents(MEETUP_GROUP_ID);

    if (events && events.length > 0) {
      const title = generateEventTitle(events[0]);
      const start = generateEventStart(events[0]);

      response
        .say(`Das nächste <phoneme alphabet="ipa" ph="miːt ʌp">Meetup</phoneme> ist ${title} ${start}`)
        .card({
          type: 'Simple',
          title: 'Nächstes Meetup',
          content: `Das nächste Meetup ist ${title} ${start}`,
        })
        .send();
    } else {
      response.say('Mir ist leider kein nächstes <phoneme alphabet="ipa" ph="miːt ʌp">Meetup</phoneme> bekannt.');
    }
  } catch (e) {
    console.log('Exception:', e);
    response.say('Leider ist etwas schief gelaufen.');
  }

  return false;
}
