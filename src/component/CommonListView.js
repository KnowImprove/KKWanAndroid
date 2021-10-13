import React, { Component, PureComponent } from "react";
import {
  View,
  FlatList,
  RefreshControl,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { DEVICE_HEIGHT, getRealDP as dp } from "../utils/screenUtil";
import Icon from "react-native-vector-icons/Ionicons";
import PropTypes from 'prop-types';


import Color from "../utils/Color";
import { connect } from "react-redux";



const propTypes = {
  toRefresh: PropTypes.func,
};

const defaultProps = {
  toRefresh: () => {},
};

class CommonListView extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isShowTop: false, //是否显示置顶按钮
    };
  }

  handleScrollToTop = () => {
    this.flatListRef &&
      this.flatListRef.scrollToOffset({ animated: true, offset: 0 });
  };

  onScrollByEvent = (e) => {
    const offsetY = e.nativeEvent.contentOffset.y;
    if (offsetY > DEVICE_HEIGHT) {
      this.setState({
        isShowTop: true,
      });
    } else {
      this.setState({
        isShowTop: false,
      });
    }
  };

  render() {
    const { isRefreshing, toRefresh, themeColor } = this.props;
    return (
      <View style={styles.container}>
        <FlatList
          ref={(comp) => {
            this.flatListRef = comp;
          }}
          onScroll={this.onScrollByEvent}
          onEndReachedThreshold={0.2}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={toRefresh}
              tintColor={themeColor}
              colors={[themeColor]}
              title={"玩命加载中..."}
              titleColor={Color.TEXT_LIGHT}
            />
          }
          {...this.props}
        />
        {this.state.isShowTop ? (
          <TouchableWithoutFeedback onPress={this.handleScrollToTop}>
            <View style={styles.fixAndroidStyle}>
              <View style={[styles.topStyle, { backgroundColor: themeColor }]}>
                <Icon name={"md-rocket"} size={dp(60)} color={Color.WHITE} />
              </View>
            </View>
          </TouchableWithoutFeedback>
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fixAndroidStyle: {
    position: "absolute",
    bottom: dp(80),
    right: dp(45),
    width: dp(120),
    height: dp(120),
    backgroundColor: "rgba(0,0,0,0.005)", // android View设置borderRadius需要外加一层带背景色的View
  },
  topStyle: {
    width: dp(120),
    height: dp(120),
    borderRadius: dp(60),
    justifyContent: "center",
    alignItems: "center",
    opacity: 0.8,
  },
});

CommonListView.propTypes = propTypes;
CommonListView.defaultProps = defaultProps;

const mapStateToProps = state => {
  return {
    themeColor: state.user.themeColor,
  };
};

export default connect(mapStateToProps)(CommonListView);
