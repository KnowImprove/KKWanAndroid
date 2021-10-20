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
import ArticleTabComponent from "../component/ArticleTabComponent";
import LoadingView from "../component/LoadingView";
import {fetchWxArticleTabs, updateArticleLoading} from '../actions';


/**
 * 微信公众号
 */
class WeChat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isRefreshing: false,
    };
  }

  componentDidMount() {
    updateArticleLoading(true);
    fetchWxArticleTabs();
  }

  render() {
    const {navigation, articleTabs, isShowLoading} = this.props;
    return (
      <View style={globalStyles.container}>
        <NavBar
          title={"公众号"}
          navigation={navigation}
          leftIcon=""
          rightIcon="md-search"
          onLeftPress={() => {}}
          //   onLeftPress={() => this.needLogin}
          onRightPress={() => navigation.navigate("Search")}
        />
        <ArticleTabComponent
          isWxArticle={true}
          articleTabs={articleTabs}
          navigation={navigation}
        />
        <LoadingView isShowLoading={isShowLoading} />
      </View>
    );
  }
}

const mapStateToProps = state =>{
    return {
        articleTabs: state.wxArticle.articleTabs,
        isShowLoading: state.wxArticle.isShowLoading,
    };
}

export default connect(mapStateToProps)(WeChat);
