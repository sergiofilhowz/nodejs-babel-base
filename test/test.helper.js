import TestHelper from 'server-commons-tester';
import config from 'server-commons/config';
import server from '../src/node';

export default new TestHelper(server, config);
