import React, { PureComponent } from "react";
import { Share, View } from "react-native";
import WebView from "react-native-webview";
import ProgressBar from "../component/ProgressBar";
import globalStyles from "../utils/globalStyles";
import NavBar from "../component/NavBar";
/**
 * WebViewScreen
 */
class WebViewScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      progress: 0,
    };
    this.onShare = this.onShare.bind(this);
  }

  async onShare(title, url) {
    try {
      await Share.share({
        message: `${title}：${url}`,
      });
    } catch (error) {
      alert(error.message);
    }
  }

  render() {
    const { route, navigation } = this.props;
    const { url, title } = route.params;

    // const url = navigation.getParam('url', 'https://www.wanandroid.com/');
    // const title = navigation.getParam('title', '');
    return (
      <View
        style={globalStyles.container}
        // renderToHardwareTextureAndroid={true}
      >
        <NavBar
          title={title}
          navigation={navigation}
          rightIcon={"md-share"}
          onRightPress={() => {
            this.onShare(title, url);
          }}
        />
        <ProgressBar progress={this.state.progress} />
        <WebView
          //解决webview加载过程中返回崩溃问题，据说是因为webview嵌套在View内的问题，不知放在最外层是否一切正常
          style = {{opacity: 0.99, overflow: 'hidden'}}
          source={{ uri: url }}
          onLoadProgress={({ nativeEvent }) => {
            this.setState({ progress: nativeEvent.progress });
          }}
          androidHardwareAccelerationDisabled = {true}
        />
      </View>
    );
  }
}

export default WebViewScreen;
