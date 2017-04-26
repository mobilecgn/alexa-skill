
import { improveSpeechOutput } from '../utils/Speech';

export default function HelpIntent(request, response) {
  response.reprompt(improveSpeechOutput('Frag\' mich zum Beispiel, wann das nächste Meetup stattfindet.'));
}
