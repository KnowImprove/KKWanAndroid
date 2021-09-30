import React, { Component, PureComponent } from "react";
import { View } from "react-native";

export default class CommonListView extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isShowTop: false, //是否显示置顶按钮
    };
  }

  handleScrollToTop = () => {
      
  };

  render() {
    return <View></View>;
  }
}
