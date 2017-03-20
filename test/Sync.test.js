
import Sync from '../src/Sync';

describe('Sync', () => {
  test('convertObjectToItem result', () => {
    const sync = new Sync({});

    expect(sync.convertObjectToItem(null)).toEqual({ NULL: true });
    expect(sync.convertObjectToItem(undefined)).toEqual({ NULL: true });
    expect(sync.convertObjectToItem()).toEqual({ NULL: true });

    expect(sync.convertObjectToItem('')).toEqual({ S: '' });
    expect(sync.convertObjectToItem('Test')).toEqual({ S: 'Test' });

    expect(sync.convertObjectToItem(-1)).toEqual({ N: '-1' });
    expect(sync.convertObjectToItem(0)).toEqual({ N: '0' });
    expect(sync.convertObjectToItem(1)).toEqual({ N: '1' });
    expect(sync.convertObjectToItem(0.123)).toEqual({ N: '0.123' });

    expect(sync.convertObjectToItem(true)).toEqual({ BOOL: true });
    expect(sync.convertObjectToItem(false)).toEqual({ BOOL: false });

    expect(sync.convertObjectToItem({
      A: '123',
    })).toEqual({
      A: { S: '123' },
    });
  });

  test('convertMeetupEventToItem result', () => {
    const sync = new Sync({});

    expect(sync.convertMeetupEventToItem({
      id: '238380476',
    })).toEqual({
      id: { S: '238380476' },
      start: { NULL: true },
      end: { NULL: true },
      duration: { NULL: true },
      status: { NULL: true },
      title: { NULL: true },
      description: { NULL: true },
      url: { NULL: true },
      visibility: { NULL: true },
      announced: { NULL: true },
      group: { NULL: true },
      venue: { NULL: true },
    });

    expect(sync.convertMeetupEventToItem({
      created: 1489402303000,
      duration: 10800000,
      id: '238380476',
      name: 'mobile.cologne - Stammtisch',
      rsvp_limit: 20,
      status: 'upcoming',
      time: 1491498000000,
      updated: 1489402303000,
      utc_offset: 7200000,
      waitlist_count: 0,
      yes_rsvp_count: 11,
      venue: {
        id: 25105270,
        name: 'Peters Brauhaus',
        lat: 50.93918991088867,
        lon: 6.9601898193359375,
        repinned: false,
        address_1: 'Mühlengasse 1',
        city: 'Köln',
        country: 'de',
        localized_country_name: 'Germany',
      },
      group: {
        created: 1396995640000,
        name: 'mobile.cologne',
        id: 13809402,
        join_mode: 'open',
        lat: 50.95000076293945,
        lon: 6.96999979019165,
        urlname: 'mobilecgn',
        who: 'Members',
      },
      link: 'https://www.meetup.com/mobilecgn/events/238380476/',
      description: 'Long description',
      visibility: 'public',
    })).toEqual({
      id: { S: '238380476' },
      start: { S: '2017-04-06T19:00:00.000Z' },
      end: { S: '2017-04-06T22:00:00.000Z' },
      duration: { N: '10800' },
      status: { S: 'upcoming' },
      title: { S: 'mobile.cologne - Stammtisch' },
      description: { S: 'Long description' },
      url: { S: 'https://www.meetup.com/mobilecgn/events/238380476/' },
      visibility: { S: 'public' },
      announced: { NULL: true },
      group: { M: {
        id: { S: '13809402' },
        name: { S: 'mobile.cologne' },
        urlname: { S: 'mobilecgn' },
        latitude: { N: '50.95000076293945' },
        longitude: { N: '6.96999979019165' },
      } },
      venue: { M: {
        id: { S: '25105270' },
        name: { S: 'Peters Brauhaus' },
        address_1: { S: 'Mühlengasse 1' },
        address_2: { NULL: true },
        address_3: { NULL: true },
        zip: { NULL: true },
        city: { S: 'Köln' },
        state: { NULL: true },
        country: { S: 'Germany' },
        latitude: { N: '50.93918991088867' },
        longitude: { N: '6.9601898193359375' },
      } },
    });
  });

  test('convertMeetupGroupToItem result', () => {
    const sync = new Sync({});

    expect(sync.convertMeetupGroupToItem({
      id: 13809402,
    })).toEqual({
      id: { S: '13809402' },
      name: { NULL: true },
      urlname: { NULL: true },
      latitude: { NULL: true },
      longitude: { NULL: true },
    });

    expect(sync.convertMeetupGroupToItem({
      created: 1396995640000,
      name: 'mobile.cologne',
      id: 13809402,
      join_mode: 'open',
      lat: 50.95000076293945,
      lon: 6.96999979019165,
      urlname: 'mobilecgn',
      who: 'Members',
    })).toEqual({
      id: { S: '13809402' },
      name: { S: 'mobile.cologne' },
      urlname: { S: 'mobilecgn' },
      latitude: { N: '50.95000076293945' },
      longitude: { N: '6.96999979019165' },
    });
  });

  test('convertMeetupVenueToItem result', () => {
    const sync = new Sync({});

    expect(sync.convertMeetupVenueToItem({
      id: 25105270,
    })).toEqual({
      id: { S: '25105270' },
      name: { NULL: true },
      address_1: { NULL: true },
      address_2: { NULL: true },
      address_3: { NULL: true },
      zip: { NULL: true },
      city: { NULL: true },
      state: { NULL: true },
      country: { NULL: true },
      latitude: { NULL: true },
      longitude: { NULL: true },
    });

    expect(sync.convertMeetupVenueToItem({
      id: 25105270,
      name: 'Peters Brauhaus',
      lat: 50.93918991088867,
      lon: 6.9601898193359375,
      repinned: false,
      address_1: 'Mühlengasse 1',
      city: 'Köln',
      country: 'de',
      localized_country_name: 'Germany',
    })).toEqual({
      id: { S: '25105270' },
      name: { S: 'Peters Brauhaus' },
      address_1: { S: 'Mühlengasse 1' },
      address_2: { NULL: true },
      address_3: { NULL: true },
      zip: { NULL: true },
      city: { S: 'Köln' },
      state: { NULL: true },
      country: { S: 'Germany' },
      latitude: { N: '50.93918991088867' },
      longitude: { N: '6.9601898193359375' },
    });
  });
});
