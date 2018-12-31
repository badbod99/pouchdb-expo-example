import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Constants } from 'expo';
// You can import from local files
import AssetExample from './components/AssetExample';
// or any pure javascript modules available in npm
import { Card } from 'react-native-paper';

import * as ReplicateLocal from './pouchdb/replicateLocal';

export default class App extends React.Component {
  state = {
    localDocs: []
  }

  renderLocalDocs() {
    return this.state.localDocs.map(doc => {
      return (
        <Text key={doc.key} style={styles.developmentModeText}>
          {doc.doc.name}
        </Text>
      );
    });
  }

  async loadDocs() {
    let exists = await ReplicateLocal.docExists();
    if (!exists) {
      await ReplicateLocal.addDoc();
    }
    await ReplicateLocal.doReplication();
    let docs = await ReplicateLocal.getDocs();
    await this.promisedSetState({localDocs: docs});
  }

  promisedSetState = (newState) => {
      return new Promise((resolve) => {
          this.setState(newState, () => {
              resolve()
          });
      });
  }

  async componentDidMount() {
    await this.loadDocs();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}>
          This is a demo of working with PouchDB within Expo on React Native.
        </Text>
        {this.renderLocalDocs()}
        <Card>
          <AssetExample />
        </Card>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
