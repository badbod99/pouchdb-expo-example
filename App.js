import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Constants } from 'expo';
// You can import from local files
import AssetExample from './components/AssetExample';
// or any pure javascript modules available in npm
import { Card } from 'react-native-paper';

import * as Kittens from './services/kittens';
import presetKittens from './presetKittens';

export default class App extends React.Component {
  state = {
    localDocs: []
  }

  renderKittens() {
    return this.state.localDocs.map(item => {
      return (
        <Text key={item.key} style={styles.developmentModeText}>
          {item.kitten.name}
        </Text>
      );
    });
  }
  
  async loadKittens() {
    await Promise.all(presetKittens.map(function (kit) {
      return Kittens.addIfNew(kit);
    })); 
    await Kittens.duplicate();
    let allKittens = await Kittens.getAll();
    await this.promisedSetState({localDocs: allKittens});
  }

  promisedSetState = (newState) => {
      return new Promise((resolve) => {
          this.setState(newState, () => {
              resolve()
          });
      });
  }

  async componentDidMount() {
    await this.loadKittens();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}>
          This is a demo of working with PouchDB within Expo on React Native.
        </Text>
        {this.renderKittens()}
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
