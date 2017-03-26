
import HelpIntent from './handler/HelpIntent';
import StopIntent from './handler/StopIntent';
import CancelIntent from './handler/CancelIntent';

import LastMeetup from './handler/LastMeetup';
import NextMeetup from './handler/NextMeetup';

export default {
  '/': {
    'AMAZON.HelpIntent': HelpIntent,
    'AMAZON.CancelIntent': CancelIntent,
    'AMAZON.StopIntent': StopIntent,
    LastMeetup,
    NextMeetup,
  },
};
