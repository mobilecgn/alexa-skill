
import { generateEventTitle, generateEventStart } from './Speech';

describe('Speech', () => {
  test('generateEventTitle', () => {
    expect(generateEventTitle(null)).toEqual('');
    expect(generateEventTitle({})).toEqual('');

    expect(generateEventTitle({ name: 'Name' })).toEqual('Name');
    expect(generateEventTitle({ name: 'mobile.cologne - Name' })).toEqual('- Name');
    expect(generateEventTitle({ name: 'Vortragsabend: Name' })).toEqual('Vortragsabend: Name');
  });

  test('generateEventStart', () => {
    expect(generateEventStart(null)).toEqual('');
    expect(generateEventStart({})).toEqual('');

    expect(generateEventStart({
      time: 1491498000000, // 06.04.2017 - 19 Uhr
      utc_offset: 7200000,
    }, new Date(2017, 1 /* Februar */, 1, 12, 0, 0))).toEqual('am 06.04.2017');

    expect(generateEventStart({
      time: 1491498000000, // 06.04.2017 - 19 Uhr
      utc_offset: 7200000,
    }, new Date(2017, 3 /* April */, 1, 12, 0, 0))).toEqual('Donnerstag um 19:00 Uhr');

    expect(generateEventStart({
      time: 1491498000000, // 06.04.2017 - 19 Uhr
      utc_offset: 7200000,
    }, new Date(2017, 3 /* April */, 4, 12, 0, 0))).toEqual('Donnerstag um 19:00 Uhr');

    expect(generateEventStart({
      time: 1491498000000, // 06.04.2017 - 19 Uhr
      utc_offset: 7200000,
    }, new Date(2017, 3 /* April */, 5, 12, 0, 0))).toEqual('morgen um 19:00 Uhr');

    expect(generateEventStart({
      time: 1491498000000, // 06.04.2017 - 19 Uhr
      utc_offset: 7200000,
    }, new Date(2017, 3 /* April */, 6, 12, 0, 0))).toEqual('heute um 19:00 Uhr');

    expect(generateEventStart({
      time: 1491498000000, // 06.04.2017 - 19 Uhr
      utc_offset: 7200000,
    }, new Date(2017, 3 /* April */, 7, 12, 0, 0))).toEqual('gestern um 19:00 Uhr');

    expect(generateEventStart({
      time: 1491498000000, // 06.04.2017 - 19 Uhr
      utc_offset: 7200000,
    }, new Date(2017, 3 /* April */, 8, 12, 0, 0))).toEqual('letzten Donnerstag um 19:00 Uhr');

    expect(generateEventStart({
      time: 1491498000000, // 06.04.2017 - 19 Uhr
      utc_offset: 7200000,
    }, new Date(2017, 3 /* April */, 9, 12, 0, 0))).toEqual('letzten Donnerstag um 19:00 Uhr');

    expect(generateEventStart({
      time: 1491498000000, // 06.04.2017 - 19 Uhr
      utc_offset: 7200000,
    }, new Date(2017, 4 /* May */, 1, 12, 0, 0))).toEqual('am 06.04.2017');
  });
});
