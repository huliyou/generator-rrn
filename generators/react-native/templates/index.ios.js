/* tslint:disable:no-console */
import { View, Text, AppRegistry } from 'react-native';
import React from 'react';

let MobileDemo = React.createClass({
  render() {
    return (
      <View style={{ marginTop: 20 }}>
        <Text>hello world</Text>
      </View>
    );
  }
});

MobileDemo = createForm()(MobileDemo);

AppRegistry.registerComponent('MobileDemo', () => MobileDemo);
