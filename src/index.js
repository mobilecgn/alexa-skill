
import Alexa from 'alexa-sdk';

import AlexaHandler from './AlexaHandler';

exports.handler = function handler(event, context, callback) {
  console.log('event', event);
  console.log('context', context);
  console.log('callback', callback);

  if (event.source === 'aws.events') {
    console.log('Handle scheduled event', event);
    callback();
    return;
  }

  const alexa = Alexa.handler(event, context, callback);

  // alexa.appId = 'amzn1.echo-sdk-ams.app.1234';
  // alexa.dynamoDBTableName = 'YourTableName'; // creates new table for session.attributes

  alexa.registerHandlers(AlexaHandler);
  alexa.execute();
};
