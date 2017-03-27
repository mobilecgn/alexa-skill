
import app from '../../src/app';

describe('Launch request', () => {
  test('response', async () => {
    const request = {
      version: '1.0',
      session: {
        new: true,
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
        type: 'LaunchRequest',
        requestId: 'amzn1.echo-api.request.1234',
      },
    };

    const expectedResponse = {
      version: '1.0',
      sessionAttributes: {},
      response: {
        outputSpeech: {
          type: 'SSML',
          ssml: '<speak>Das nächste Meetup ist - Stammtisch am 06.04.2017</speak>',
        },
        card: {
          type: 'Simple',
          title: 'Nächstes Meetup',
          content: 'Das nächste Meetup ist - Stammtisch am 06.04.2017',
        },
        directives: [],
        shouldEndSession: true,
      },
    };

    expect(await app.request(request)).toEqual(expectedResponse);
  });
});
