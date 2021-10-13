import React, { Component, PureComponent } from "react";
import { Text, View, StyleSheet } from "react-native";

import {
  fetchHomeAddCollect,
  fetchHomeBanner,
  fetchHomeCancelCollect,
  fetchHomeList,
  fetchHomeListMore,
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

class Home extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isRefreshing: false,
    };
  }

  async componentDidMount() {
    await this.onFetchData();
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
  }

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
    const { navigation, dataSource } = this.props;

    return (
      <View style={globalStyles.container}>
        <NavBar
          title={"wanAndroid"}
          navigation={navigation}
          leftIcon="md-person"
          rightIcon="md-search"
          onLeftPress={() => navigation.toggleDrawer()}
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
    //   language: state.user.language,
  };
};

export default connect(mapStateToProps)(Home);
