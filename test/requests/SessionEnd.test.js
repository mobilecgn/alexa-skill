
import app from '../../src/app';

describe('SessionEnd', () => {
  test('test', async () => {
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
        type: 'SessionEndedRequest',
        requestId: 'amzn1.echo-api.request.1234',
        reason: 'USER_INITIATED',
      },
    };

    const expectedResponse = {
      version: '1.0',
      sessionAttributes: {},
      response: {
        directives: [],
        shouldEndSession: true,
      },
    };

    expect(await app.request(request)).toEqual(expectedResponse);
  });
});
