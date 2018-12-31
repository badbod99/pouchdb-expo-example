// This is our custom build of PouchDB as per https://pouchdb.com/custom.html
import PouchDB from 'pouchdb-core';
import HttpPouch from 'pouchdb-adapter-http';
import replication from 'pouchdb-replication';
import find from 'pouchdb-find';
import { SQLite } from 'expo';
import {btoa, atob} from './base64'

// SQLite adapter (basically just a shim) between WebSQL and SQLite
import sqliteadapter from './sqliteadapter';
const adapter = sqliteadapter(SQLite);

if (!global.btoa) {
    global.btoa = btoa;
}

if (!global.atob) {
    global.atob = atob;
}

export default PouchDB
  .plugin(HttpPouch)
  .plugin(adapter)
  .plugin(replication)
  .plugin(find);
