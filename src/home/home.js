import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";

import NavBar from "../component/NavBar";

import {connect} from 'react-redux';


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
          isRefreshing: false,
        };

      }

  render() {
    const {navigation, dataSource} = this.props;

    return (
      <View style={styles.root}>
        <NavBar
          title={'wanAndroid'}
          navigation={navigation}
          leftIcon="md-person"
          rightIcon="md-search"
          onLeftPress={() => navigation.toggleDrawer()}
          onRightPress={() => navigation.navigate("Search")}
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

const mapStateToProps = state => {
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