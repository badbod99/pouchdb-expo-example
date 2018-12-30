import PouchDB from './custombuild';

this.remoteDB1 = new PouchDB('http://192.168.1.92:5984/kittens1');
this.remoteDB2 = new PouchDB('http://192.168.1.92:5984/kittens2');

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
    await this.remoteDB1.put(doc);
  } catch (err) {
    console.error(err);
  }
}

export const docExists = async () => {
  try {
    await this.remoteDB1.get('mittens');
    return true;
  } catch (err) {
    return false;
  }
}

export const getDocs = async () => {
  try {
    const result = await this.remoteDB2.allDocs({ include_docs: true });
    return result.rows
      .map(row => row.doc)
      .map(doc => {
        return { key: doc.key, data: doc };
      });
  } catch (err) {
    console.log(err);
  }
}

export const doReplication = async () => {
  try {
    // This throws and error
    let ret = await this.remoteDB2.replicate.from(this.remoteDB1);
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