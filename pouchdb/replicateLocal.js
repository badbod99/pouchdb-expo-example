import PouchDB from './custombuild';

this.localDB1 = new PouchDB('db1', { adapter: 'react-native-sqlite' });
this.localDB2 = new PouchDB('db2', { adapter: 'react-native-sqlite' });

export const addDoc = async () => {
  var doc = {
    "_id": "mittens",
    "name": "Mittens",
    "occupation": "kitten",
    "age": 3,
    "hobbies": [
      "playing with balls of yarn",
      "chasing laser pointers",
      "lookin' hella cute"
    ]
  };

  try {
    await this.localDB1.put(doc);
  } catch (err) {
    console.error(err);
  }
}

export const docExists = async () => {
  try {
    await this.localDB1.get('mittens');
    return true;
  } catch (err) {
    return false;
  }
}

export const getDocs = async () => {
  try {
    const result = await this.localDB2.allDocs({ include_docs: true });
    return result.rows
      .map(row => {
        return { key: row.key, doc: row.doc };
      });
  } catch (err) {
    console.log(err);
  }
}


// Raised during ongoing sync from CouchDB, not from changes
function onSyncChange(info) {
  console.log(info);
}

// Raised when no new changes are present
function onSyncActive(err) {
  console.log(err);
}

// Raised when no new changes are present
function onSyncPaused(err) {
  console.log('PAUSED');
}

// Raised when an error occurs with sync
function onSyncError(err) {
  console.log(JSON.stringify(err));
}

export const doReplication = async () => {
  
  try {
    // This throws and error
    let ret = await this.localDB2.replicate.from(this.localDB1);
    console.log('Result was: ' + JSON.stringify(ret));
  } catch (err) {
    /*
    Error output stringified is:
    ok:false
    start_time:"2018-12-30T21:55:10.707Z"
    docs_read:0
    docs_written:0
    doc_write_failures:0
    errors:[]
    status:"aborting"
    end_time:"2018-12-30T21:55:10.710Z"
    last_seq:0
    */
    console.log(JSON.stringify(err));
  }
}