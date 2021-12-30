import React, { Component, PureComponent } from "react";
import { Text, View, StyleSheet } from "react-native";

import {
  fetchHomeAddCollect,
  fetchHomeBanner,
  fetchHomeCancelCollect,
  fetchHomeList,
  fetchHomeListMore,
  updateHomeLoading,
} from "../actions";

import NavBar from "../component/NavBar";
import CommonListView from "../component/CommonListView";
import ArticleItemRow from "../component/ArticleItemRow";
import Banner from "../component/Banner";
import globalStyles from "../utils/globalStyles";
import { getRealDP as dp } from "../utils/screenUtil";
import ListFooter from "../component/ListFooter";
import { showToast } from "../utils/Utility";
import { connect } from "react-redux";
import LoadingView from "../component/LoadingView";

import CodePush from "react-native-code-push"; // 引入code-push

class Home extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isRefreshing: false,
    };
  }

  componentWillUnmount() {
    CodePush.disallowRestart(); //禁止重启
  }

  async componentDidMount() {
    CodePush.allowRestart(); //在加载完了，允许重启

    updateHomeLoading(true);
    this.syncImmediate(); //开始检查更新
    await this.onFetchData();
    updateHomeLoading(false);
  }

  /** Update pops a confirmation dialog, and then immediately reboots the app 一键更新，加入的配置项 */
  syncImmediate() {
    CodePush.sync(
      {
        // deploymentKey:'ay3Y1oC26mYI-T7TJ0WtawZEZsLG-n66xgXH6',
        //安装模式
        //ON_NEXT_RESUME 下次恢复到前台时
        //ON_NEXT_RESTART 下一次重启时
        //IMMEDIATE 马上更新
        installMode: CodePush.InstallMode.IMMEDIATE,
        updateDialog: {
          //是否显示更新描述
          appendReleaseDescription: true,
          //更新描述的前缀。 默认为"Description"
          descriptionPrefix: "更新内容：",
          //强制更新按钮文字，默认为continue
          mandatoryContinueButtonLabel: "立即更新",
          //强制更新时的信息. 默认为"An update is available that must be installed."
          mandatoryUpdateMessage: "必须更新后才能使用，",
          //非强制更新时，按钮文字,默认为"ignore"
          optionalIgnoreButtonLabel: "稍后",
          //非强制更新时，确认按钮文字. 默认为"Install"
          optionalInstallButtonLabel: "后台更新",
          //非强制更新时，检查到更新的消息文本
          optionalUpdateMessage: "有新版本了，是否更新？",
          //Alert窗口的标题
          title: "新版本",
        },
      },
      this.codePushStatusDidChange.bind(this),
      this.codePushDownloadDidProgress.bind(this)
    );
  }

  // 监听更新状态
  codePushStatusDidChange(syncStatus) {
    switch (syncStatus) {
      case CodePush.SyncStatus.CHECKING_FOR_UPDATE:
        // this.setState({ syncMessage: "Checking for update." });
        console.log("-----Checking for update.");
        showToast('Checking for update');
        break;
      case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
        // this.setState({ syncMessage: "Downloading package." });
        console.log("-----Downloading package.");
        break;
      case CodePush.SyncStatus.AWAITING_USER_ACTION:
        // this.setState({ syncMessage: "Awaiting user action." });
        console.log("-----Awaiting user action.");
        break;
      case CodePush.SyncStatus.INSTALLING_UPDATE:
        // this.setState({ syncMessage: "Installing update." });
        console.log("-----Installing update.");
        break;
      case CodePush.SyncStatus.UP_TO_DATE:
        // this.setState({ syncMessage: "App up to date.", progress: false });
        console.log("-----App up to date.");
        showToast('App up to date');
        break;
      case CodePush.SyncStatus.UPDATE_IGNORED:
        // this.setState({ syncMessage: "Update cancelled by user.", progress: false });
        console.log("-----Update cancelled by user.");
        break;
      case CodePush.SyncStatus.UPDATE_INSTALLED:
        // this.setState({ syncMessage: "Update installed and will be applied on restart.", progress: false });
        console.log("-----Update installed and will be applied on restart.");
        break;
      case CodePush.SyncStatus.UNKNOWN_ERROR:
        // this.setState({ syncMessage: "An unknown error occurred.", progress: false });
        console.log("-----An unknown error occurred.");
        showToast('An unknown error occurred');
        break;
    }
  }

  codePushDownloadDidProgress(progress) {
    // this.setState({ progress });
    console.log("------hot download progress : " + progress);
  }

  async onFetchData() {
    await Promise.all([fetchHomeBanner(), fetchHomeList()]);
  }

  async onRefresh() {
    this.setState({ isRefreshing: true });
    await Promise.all([fetchHomeBanner(), fetchHomeList()]);
    this.setState({ isRefreshing: false });
  }

  onEndReached = () => {
    const { isFullData } = this.props;
    if (isFullData) {
      return;
    }
    fetchHomeListMore(this.props.page);
  };

  needLogin = () => {
    const { navigation, isLogin } = this.props;

    if (isLogin) {
      showToast("您已经登录了呢！");
      return;
    }
    //跳转登录
    navigation.navigate("Login");
  };

  renderItem = ({ item, index }) => {
    const { navigation, isLogin } = this.props;
    return (
      <ArticleItemRow
        navigation={navigation}
        item={item}
        onCollectPress={() => {
          if (!isLogin) {
            showToast("请先登录");
            return navigation.navigate("Login");
          }
          if (item.collect) {
            fetchHomeCancelCollect(item.id, index);
          } else {
            fetchHomeAddCollect(item.id, index);
          }
        }}
      />
    );
  };

  renderHeader = () => {
    const { navigation, homeBanner } = this.props;
    return (
      <View>
        <Banner bannerArr={homeBanner} navigation={navigation} />
        <View style={{ height: dp(20) }} />
      </View>
    );
  };

  renderFooter = () => {
    const { isRenderFooter, isFullData, themeColor } = this.props;
    return (
      <ListFooter
        isRenderFooter={isRenderFooter}
        isFullData={isFullData}
        indicatorColor={themeColor}
      />
    );
  };

  render() {
    const { navigation, dataSource, isShowLoading } = this.props;

    const self = this;

    return (
      <View style={globalStyles.container}>
        <NavBar
          title={"wanAndroid"}
          navigation={navigation}
          leftIcon="md-person"
          rightIcon="md-search"
          // onLeftPress={() => navigation.toggleDrawer()}
          onLeftPress={() => {
            self.needLogin();
          }}
          onRightPress={() => navigation.navigate("Search")}
        />
        <CommonListView
          data={dataSource}
          keyExtractor={(item) => item.id.toString()}
          renderItem={this.renderItem}
          ListHeaderComponent={this.renderHeader}
          ListFooterComponent={this.renderFooter}
          onEndReached={this.onEndReached}
          isRefreshing={this.state.isRefreshing}
          toRefresh={this.onRefresh}
        />
        <LoadingView isShowLoading={isShowLoading} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    width: "100%",
    height: "100%",
  },
});

const mapStateToProps = (state) => {
  return {
    page: state.home.page,
    dataSource: state.home.dataSource,
    homeBanner: state.home.homeBanner,
    homeList: state.home.homeList,
    isRenderFooter: state.home.isRenderFooter,
    isFullData: state.home.isFullData,
    isLogin: state.user.isLogin,
    themeColor: state.user.themeColor,
    isShowLoading: state.home.isShowLoading,
    //   language: state.user.language,
  };
};

export default connect(mapStateToProps)(Home);
