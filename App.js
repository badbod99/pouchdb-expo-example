import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Constants } from 'expo';
// You can import from local files
import AssetExample from './components/AssetExample';
// or any pure javascript modules available in npm
import { Card } from 'react-native-paper';

import * as ReplicateLocal from './pouchdb/replicateLocal';
import * as ReplicateRemote from './pouchdb/replicateRemote';

export default class App extends React.Component {
  renderLocalDocs() {
    if (this.state == null) {
      return;
    }
    
    return this.state.localDocs.map(doc => {
      return (
        <Text key={doc.key} style={styles.developmentModeText}>
          {doc.data._id}
        </Text>
      );
    });
  }

  renderRemoteDocs() {
    if (this.state == null) {
      return;
    }
    
    return this.state.remoteDocs.map(doc => {
      return (
        <Text key={doc.key} style={styles.developmentModeText}>
          {doc.data._id}
        </Text>
      );
    });
  }

  doLocalRep() {
    ReplicateLocal.docExists().then(
    function (exists) {
      if (exists) {
        return ReplicateLocal.addDoc();
      } else {
        return Promise.resolve();
      }
    }).then(function () {
      return ReplicateLocal.doReplication();
    }).then(function () {
      return ReplicateLocal.getDocs();
    }).then(function (result) {
      () => this.setState({localDocs: result});
    }).catch(function (err) {
      console.log(err);
    });
  }

  doRemoteRep() {
    ReplicateRemote.docExists().then(
    function (exists) {
      if (exists) {
        return ReplicateRemote.addDoc();
      } else {
        return Promise.resolve();
      }
    }).then(function () {
      return ReplicateRemote.doReplication();
    }).then(function () {
      return ReplicateRemote.getDocs();
    }).then(function (result) {
      () => this.setState({remoteDocs: result});
    }).catch(function (err) {
      console.log(err);
    });
  }

  componentDidMount() {
    this.doRemoteRep();
    this.doLocalRep();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}>
          This is a demo showing replication failing with React Native regardless
          of underlying storage.
        </Text>
        {this.renderLocalDocs()}
        {this.renderRemoteDocs()}
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
