import Server from 'server-commons/server';
import { join } from 'path';

const server = new Server({
  migration: {
    name: 'example-server', // change this value
    dir: join(__dirname, '..', 'db'),
  }
});

require('./routers/TestRouter');

export default server;
