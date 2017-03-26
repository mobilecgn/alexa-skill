
import AWS from 'aws-sdk';

const promisify = [
  'createTable',
  'updateTable',
  'deleteTable',
  'getItem',
  'putItem',
  'query',
  'scan',
];

export default class Persistance {
  constructor(options) {
    this.dynamodb = new AWS.DynamoDB({
      apiVersion: '2012-08-10',
      region: options.region,
    });

    promisify.forEach((method) => {
      this[method] = params => new Promise((resolve, reject) => {
        this.dynamodb[method](params, (err, response) => {
          if (err) {
            reject(err);
          } else {
            resolve(response);
          }
        });
      });
    });
  }

  waitForTable(table, state) {
    return this.waitFor(state, { TableName: table });
  }

  waitFor(state, params) {
    return new Promise((resolve, reject) => {
      this.dynamodb.waitFor(state, params, (err, response) => {
        if (err) {
          reject(err);
        } else {
          resolve(response);
        }
      });
    });
  }
}
