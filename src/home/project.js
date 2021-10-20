import React, { PureComponent } from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import NavBar from "../component/NavBar";
import globalStyles from "../utils/globalStyles";
import { fetchProjectTabs, updateArticleLoading } from "../actions";
import ArticleTabComponent from "../component/ArticleTabComponent";
import LoadingView from "../component/LoadingView";

class Project extends PureComponent {
  componentDidMount() {
    updateArticleLoading(true);
    fetchProjectTabs();
  }

  render() {
    const { navigation, projectTabs, isShowLoading } = this.props;
    return (
      <View style={globalStyles.container}>
        <NavBar
          title={'项目'}
          navigation={navigation}
          leftIcon="md-person"
          rightIcon="md-search"
        //   onLeftPress={() => navigation.toggleDrawer()}
          onRightPress={() => navigation.navigate("Search")}
        />
        <ArticleTabComponent
          articleTabs={projectTabs}
          navigation={navigation}
        />
        <LoadingView isShowLoading={isShowLoading} />
      </View>
    );
  }
}

const mapStateToProps = state => {
    return {
      projectTabs: state.project.projectTabs,
      isShowLoading: state.wxArticle.isShowLoading,
      language: state.user.language,
    };
  };
  
  export default connect(mapStateToProps)(Project);