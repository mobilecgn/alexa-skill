/* eslint no-console: 0 */

import fs from 'fs';
import intentUtteranceGenerator from 'intent-utterance-generator';

if (process.argv.length !== 4) {
  console.error(`Usage: ${process.argv[0]} ${process.argv[1]} intentTemplateFile intentUtteranceFile`);
  process.exit(-1);
}

const intentTemplateFile = process.argv[2];
const intentUtteranceFile = process.argv[3];

const intentTemplate = fs.readFileSync(intentTemplateFile).toString();

const intents = {};

intentTemplate.split('\n').forEach((line) => {
  if (line.indexOf('#') !== 0 && line.indexOf(' ') !== -1) {
    const intent = line.substring(0, line.indexOf(' '));
    const utterance = line.substring(line.indexOf(' ') + 1);

    if (!intents[intent]) {
      intents[intent] = [utterance];
    } else {
      intents[intent].push(utterance);
    }
  }
});

const utterances = intentUtteranceGenerator(intents);

fs.writeFileSync(intentUtteranceFile, `#\n# Generated from ${intentTemplateFile}\n#\n\n`);
fs.appendFileSync(intentUtteranceFile, utterances);
