
import { app as App } from 'alexa-app';
import { addRouter } from 'alexa-app-router';

import config from './config';
import intents from './intents';
import routes from './routes';

const app = new App('mobile cologne');

const error = 'Leider haben wir gerade technische Probleme. Probier es bitte später nochmal.';

app.messages.GENERIC_ERROR = error;
app.messages.NO_INTENT_FOUND = error;

app.launch((request, response) => {
  response.say('Hallo');
});

addRouter(app, config, intents, routes);

export default app;
