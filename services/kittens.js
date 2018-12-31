import PouchDB from '../pouchdb/custombuild';

this.localDB1 = new PouchDB('db1', { adapter: 'react-native-sqlite' });
this.localDB2 = new PouchDB('db2', { adapter: 'react-native-sqlite' });

export const addNew = async (kitten) => {
  try {
    await this.localDB1.put(kitten);
  } catch (err) {
    console.error(err);
  }
}

export const exists = async (id) => {
  try {
    await this.localDB1.get(id);
    return true;
  } catch (err) {
    return false;
  }
}

export const addIfNew = async (kitten) => {
  const ex = await exists(kitten._id);
  if (!ex) {
    addNew(kitten);
  }
}

export const getAll = async () => {
  try {
    const result = await this.localDB2.allDocs({ include_docs: true });
    return result.rows
      .map(row => {
        return { key: row.key, kitten: row.doc };
      });
  } catch (err) {
    console.log(err);
  }
}

export const duplicate = async () => {
  try {
    let ret = await this.localDB2.replicate.from(this.localDB1);
  } catch (err) {
    console.log(JSON.stringify(err));
  }
}