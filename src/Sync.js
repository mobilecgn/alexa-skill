
import Meetup from './Meetup';
import Persistance from './Persistance';

const EVENT_TABLE_ATTRIBUTE_DEFINITIONS = [{
  AttributeName: 'id',
  AttributeType: 'S',
}, {
  AttributeName: 'start',
  AttributeType: 'S',
/*
}, {
  AttributeName: 'duration',
  AttributeType: 'N',
}, {
  AttributeName: 'status',
  AttributeType: 'S',
}, {
  AttributeName: 'title',
  AttributeType: 'S',
}, {
  AttributeName: 'description',
  AttributeType: 'S',
}, {
  AttributeName: 'group',
  AttributeType: 'S',
}, {
  AttributeName: 'venue',
  AttributeType: 'S',
}, {
  AttributeName: 'url',
  AttributeType: 'S',
}, {
  AttributeName: 'visibility',
  AttributeType: 'S',
}, {
  AttributeName: 'announced',
  AttributeType: 'S',
*/
}];

const EVENT_TABLE_KEY_SCHEMA = [{
  AttributeName: 'id',
  KeyType: 'HASH',
}, {
  AttributeName: 'start',
  KeyType: 'RANGE',
}];


export default class Sync {
  constructor(options) {
    this.meetup = new Meetup(options);
    this.persistance = new Persistance(options);
    this.eventTable = 'event';
  }

  createTablesIfNotExist() {
    const createTableParams = {
      TableName: this.eventTable,
      AttributeDefinitions: EVENT_TABLE_ATTRIBUTE_DEFINITIONS,
      KeySchema: EVENT_TABLE_KEY_SCHEMA,
      ProvisionedThroughput: {
        ReadCapacityUnits: 1,
        WriteCapacityUnits: 1,
      },
    };

    return this.persistance.createTable(createTableParams).then(() =>
      this.persistance.waitForTable(this.eventTable, 'tableExists')
    , (err) => {
      if (err.code !== 'ResourceInUseException') {
        throw err;
      }
    });
  }

  deleteTables() {
    const deleteTableParams = {
      TableName: this.eventTable,
    };

    return this.persistance.deleteTable(deleteTableParams).catch((err) => {
      if (err.code !== 'ResourceNotFoundException') {
        throw err;
      }
    });
  }

  async syncEvents(group) {
    const pastEvents = await this.meetup.getPastEvents(group);
    const upcomingEvents = await this.meetup.getUpcomingEvent(group);

    const events = pastEvents.concat(upcomingEvents);

    await Promise.all(events.map(event => this.persistance.putItem({
      TableName: this.eventTable,
      Item: this.convertMeetupEventToItem(event),
    })));
  }

  convertObjectToItem(object) {
    if (object === null || object === undefined) {
      return { NULL: true };
    } else if (typeof object === 'string') {
      return { S: object };
    } else if (typeof object === 'number') {
      return { N: object.toString() };
    } else if (typeof object === 'boolean') {
      return { BOOL: object };
    } else if (typeof object === 'object') {
      const convertedObject = {};
      Object.keys(object).forEach((key) => {
        const convertedValue = this.convertObjectToItem(object[key]);
        if (convertedValue) {
          convertedObject[key] = convertedValue;
        }
      });
      return convertedObject;
    }

    throw new Error(`Unexpected object type ${object}`);
  }

  convertMeetupEventToItem(event) {
    const start = new Date(event.time + event.utc_offset).toJSON();
    const end = new Date(event.time + event.utc_offset + event.duration).toJSON();

    const group = event.group ?
        { M: this.convertMeetupGroupToItem(event.group) } :
        { NULL: true };

    const venue = event.venue ?
        { M: this.convertMeetupVenueToItem(event.venue) } :
        { NULL: true };

    return {
      id: this.convertObjectToItem(event.id.toString()),
      start: this.convertObjectToItem(start),
      end: this.convertObjectToItem(end),
      duration: this.convertObjectToItem(event.duration ? event.duration / 1000 : null),
      status: this.convertObjectToItem(event.status),
      title: this.convertObjectToItem(event.name),
      description: this.convertObjectToItem(event.description),
      url: this.convertObjectToItem(event.link),
      visibility: this.convertObjectToItem(event.visibility),
      announced: this.convertObjectToItem(event.announced),
      group,
      venue,
    };
  }

  convertMeetupGroupToItem(group) {
    return {
      id: this.convertObjectToItem(group.id.toString()),
      name: this.convertObjectToItem(group.name),
      urlname: this.convertObjectToItem(group.urlname),
      latitude: this.convertObjectToItem(group.lat),
      longitude: this.convertObjectToItem(group.lon),
    };
  }

  convertMeetupVenueToItem(venue) {
    return {
      id: this.convertObjectToItem(venue.id.toString()),
      name: this.convertObjectToItem(venue.name),
      address_1: this.convertObjectToItem(venue.address_1),
      address_2: this.convertObjectToItem(venue.address_2),
      address_3: this.convertObjectToItem(venue.address_3),
      zip: this.convertObjectToItem(venue.zip),
      city: this.convertObjectToItem(venue.city),
      state: this.convertObjectToItem(venue.state),
      country: this.convertObjectToItem(venue.localized_country_name),
      latitude: this.convertObjectToItem(venue.lat),
      longitude: this.convertObjectToItem(venue.lon),
    };
  }
}
