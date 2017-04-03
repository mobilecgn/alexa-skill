
import app from '../../src/app';

// TODO: replace real api calls with Meetup mock!!

describe('launch intent', () => {
  test('launch default response', async () => {
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
          name: 'NextMeetup',
          slots: {},
        },
      },
    };

    const expectedResponse = {
      version: '1.0',
      sessionAttributes: {
        route: null,
      },
      response: {
        outputSpeech: {
          type: 'SSML',
          ssml: '<speak>Das nächste <phoneme alphabet=\"ipa\" ph=\"miːt ʌp\">Meetup</phoneme> ist - Stammtisch Donnerstag um 19:00 Uhr</speak>',
        },
        card: {
          type: 'Simple',
          title: 'Nächstes Meetup',
          content: 'Das nächste Meetup ist - Stammtisch Donnerstag um 19:00 Uhr',
        },
        directives: [],
        shouldEndSession: true,
      },
    };

    expect(await app.request(request)).toEqual(expectedResponse);
  });
});
