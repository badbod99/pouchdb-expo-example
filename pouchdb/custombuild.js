// This is our custom build of PouchDB as per https://pouchdb.com/custom.html
import PouchDB from 'pouchdb-core';
import HttpPouch from 'pouchdb-adapter-http';
import replication from 'pouchdb-replication';
import find from 'pouchdb-find';
import { SQLite } from 'expo';

// SQLite adapter (basically just a shim) between WebSQL and SQLite
import sqliteadapter from './sqliteadapter';
const adapter = sqliteadapter(SQLite);

export default PouchDB
  .plugin(HttpPouch)
  .plugin(adapter)
  .plugin(replication)
  .plugin(find);
