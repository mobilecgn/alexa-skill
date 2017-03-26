
import app from '../../src/app';

describe('MissingIntent request', () => {
  test('response', async () => {
    const request = {
      version: '1.0',
      session: {
        new: false,
        sessionId: 'amzn1.echo-api.session.1234',
        attributes: {},
        application: {
          applicationId: 'amzn1.echo-sdk-ams.app.1234',
        },
        user: {
          userId: 'amzn1.account.1234',
        },
      },
      request: {
        type: 'IntentRequest',
        requestId: 'amzn1.echo-api.request.1234',
        intent: {
          name: 'missingIntent',
          slots: {},
        },
      },
    };

    const expectedResponse = {
      version: '1.0',
      sessionAttributes: {},
      response: {
        outputSpeech: {
          type: 'SSML',
          ssml: '<speak>Leider haben wir gerade technische Probleme. Probier es bitte später nochmal.</speak>',
        },
        directives: [],
        shouldEndSession: true,
      },
    };

    expect(await app.request(request)).toEqual(expectedResponse);
  });
});
