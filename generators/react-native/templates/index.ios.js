/* tslint:disable:no-console */
import { View, AppRegistry } from 'react-native';
import React from 'react';

let MobileDemo = React.createClass({
  render() {
    return (
      <View style={{ marginTop: 20 }}>
        hello world
      </View>
    );
  }
});

MobileDemo = createForm()(MobileDemo);

AppRegistry.registerComponent('MobileDemo', () => MobileDemo);
