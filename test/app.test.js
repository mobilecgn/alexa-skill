
import fs from 'fs';
import path from 'path';

import app from '../src/app';

describe('app', () => {
  test('schema', () => {
    const filename = path.join(__dirname, '../interaction-model/schema.json');
    const expectedSchema = fs.readFileSync(filename).toString();

    expect(JSON.parse(app.schema())).toEqual(JSON.parse(expectedSchema));
  });

  test('utterances', () => {
    const filename = path.join(__dirname, '../interaction-model/utterances.txt');
    const expectedUtterances = fs.readFileSync(filename).toString();

    expect(`#\n# Generated\n#\n\n${app.utterances()}\n`).toEqual(expectedUtterances);
  });
});
