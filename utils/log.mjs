/* eslint-disable no-console */
import debug from 'debug';

const prefix = `cbot:[${process.env.GAE_VERSION || process.pid}]`;
const logE = debug(`${prefix}:error`);
const log = debug(`${prefix}:log`);

log.log = console.info.bind(console);
logE.log = console.error.bind(console);
debug.log = console.debug.bind(console);

export { log, debug, logE };
