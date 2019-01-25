import React, { Component }  from "react";
import {
  AppRegistry,
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import * as WeChat from 'react-native-wechat';

export class Example extends Component<Props> {
  constructor(props: Props) {
    super(props);
    this.state = {
      apiVersion: 'waiting...',
      wxAppInstallUrl: 'waiting...',
      isWXAppInstalled: 'waiting...',
    };
  }
  async componentDidMount() {
    try {
      await WeChat.registerApp('1234567');
      this.setState({
        apiVersion: await WeChat.getApiVersion(),
        wxAppInstallUrl: Platform.OS === 'ios' ? await WeChat.getWXAppInstallUrl() : null,
        isWXAppInstalled: await WeChat.isWXAppInstalled()
      });
      console.log(this.state);
    } catch (e) {
      console.error(e);
    }
    console.log(WeChat);
    // console.log('getApiVersion', typeof WeChat.getApiVersion);
    // console.log('getWXAppInstallUrl', typeof WeChat.getWXAppInstallUrl);
    // console.log('sendRequest', typeof WeChat.sendRequest);
    // console.log('registerApp', typeof WeChat.registerApp);
    // console.log('sendErrorCommonResponse', typeof WeChat.sendErrorCommonResponse);
    // console.log('sendErrorUserCancelResponse', typeof WeChat.sendErrorUserCancelResponse);
    // console.log('sendAuthRequest', typeof WeChat.sendAuthRequest);
    // console.log('getWXAppInstallUrl', typeof WeChat.getWXAppInstallUrl);
    // console.log('openWXApp', typeof WeChat.openWXApp);
    // console.log('registerAppWithDescription', typeof WeChat.registerAppWithDescription);
    // console.log('isWXAppSupportApi', typeof WeChat.isWXAppSupportApi);
    // console.log('isWXAppInstalled', typeof WeChat.isWXAppInstalled);
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>api版本：{this.state.apiVersion}</Text>
        <Text>微信注册url：{this.state.wxAppInstallUrl}</Text>
        <Text>是否安装微信：{String(this.state.isWXAppInstalled)}</Text>
        <TouchableOpacity onPress={this._openWXApp}>
          <Text>打开微信</Text>
        </TouchableOpacity>
      </View>
    );
  }
  async _openWXApp() {
    await WeChat.openWXApp();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('Example', () => Example);
