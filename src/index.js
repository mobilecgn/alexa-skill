
import 'babel-polyfill';

import app from './app';

exports.handler = app.lambda();
