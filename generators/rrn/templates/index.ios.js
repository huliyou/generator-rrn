/* tslint:disable:no-console */
import { View, AppRegistry } from 'react-native';
import { DatePicker, List } from 'antd-mobile';
import React from 'react';
import { createForm } from 'rc-form';

let MobileDemo = React.createClass({
  render() {
    return (<View style={{ marginTop: 20 }}>
      hello world
    </View>);
  }
});

MobileDemo = createForm()(MobileDemo);

AppRegistry.registerComponent('MobileDemo', () => MobileDemo);
