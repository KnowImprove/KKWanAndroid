import React, { Component } from "react";
import { Image, Text, View, StyleSheet } from "react-native";
import homeScreen from "./home/home";
import mineScreen from "./home/mine";
import weChatScreen from "./home/wechat";
import projectScreen from "./home/project";
import SearchScreen from "./home/SearchScreen";
import WebViewScreen from "./component/WebViewScreen";
import SearchArticleScreen from "./home/page/SearchArticleScreen";
import LoginScreen from "./home/page/LoginScreen";
import RegisterScreen from "./home/page/RegisterScreen";
import CollectScreen from "./home/page/CollectScreen";
import CoinDetailScreen from "./home/page/CoinDetailScreen";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

import { DEVICE_WIDTH, getRealDP as dp, isAndroid } from "./utils/screenUtil";

const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StackPage />
    </NavigationContainer>
  );
}

const config = {
  animation: "spring",
  config: {
    stiffness: 5000,
    damping: 500,
    mass: 6,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

function StackPage() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        keyboardHandlingEnabled: true,
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomePage}
        options={{
          title: "首页",
          transitionSpec: {
            open: config,
            close: config,
          },
          headerShown: false,
        }}
        // options={{
        //   // headerTitle: props => <LogoTitle {...props} />,
        //   headerRight: () => (
        //     <Button
        //       onPress={() => alert('This is a button!')}
        //       title="Info"
        //       color="#fff"
        //     />
        //   ),
        // }}
      />
      <Stack.Screen name="Search" component={SearchScreen} options={{
        headerShown: false,
      }} />

      <Stack.Screen name="WebView" component={WebViewScreen} options={{
        headerShown: false,
      }} />

      <Stack.Screen name="SearchArticle" component={SearchArticleScreen} options={{
        headerShown: false,
      }} />

      <Stack.Screen name="Login" component={LoginScreen} options={{
        headerShown: false,
      }} />

      <Stack.Screen name="Register" component={RegisterScreen} options={{
        headerShown: false,
      }} />

      <Stack.Screen name="Collect" component={CollectScreen} options={{
        headerShown: false,
      }} />

      <Stack.Screen name="CoinDetail" component={CoinDetailScreen} options={{
        headerShown: false,
      }} />

      {/* <Stack.Screen
        name="Login"
        component={Login}
        options={{
          title: '登录',
          transitionSpec: {
            open: TransitionSpecs.TransitionIOSSpec,
            close: TransitionSpecs.TransitionIOSSpec,
          },
        }}
      /> */}
    </Stack.Navigator>
  );
}

function HomePage() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          alert("route.name:" + route.name);
          // let iconName;

          // if (route.name === "home") {
          //   iconName = focused
          //     ? "ios-information-circle"
          //     : "ios-information-circle-outline";
          // } else if (route.name === "mine") {
          //   iconName = focused ? "ios-list-box" : "ios-list";
          // }

          // You can return any component that you like here!
          // return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#106323",
        tabBarInactiveTintColor: "gray",
        headerShown: false, //隐藏标题栏
        tabBarLabelStyle: {
          fontSize:dp(17),//字体大小
          margin:dp(0),
          // backgroundColor: "#325423"
        },
        tabBarIconStyle : {
          width:dp(20),
          height:dp(25),
          // backgroundColor:"#234"
        },
        tabBarStyle: {
          height: dp(60)
        },
      })}
    >
      <Tab.Screen
        name="home"
        component={homeScreen}
        options={{
          tabBarLabel: "首页",
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={dp(20)}
              color={color}
            />
          ),
          // tabBarBadge: 0,
        }}
      />
      <Tab.Screen
        name="wechat"
        component={weChatScreen}
        options={{
          tabBarLabel: "公众号",
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "people" : "people-outline"}
              size={dp(20)}
              color={color}
            />
          ),
          // tabBarBadge: 0,
        }}
      />
      <Tab.Screen
        name="project"
        component={projectScreen}
        options={{
          tabBarLabel: "项目",
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "document-text" : "document-text-outline"}
              size={dp(20)}
              color={color}
            />
          ),
          // tabBarBadge: 0,
        }}
      />
      <Tab.Screen
        name="mine"
        component={mineScreen}
        options={{
          tabBarLabel: "我的",
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "person" : "person-outline"}
              size={dp(20)}
              color={color}
            />
          ),
          // tabBarBadge: 0,
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  iconWrapper: {
    width: dp(65),
    height: dp(65),
    justifyContent: "center",
    alignItems: "center",
  },
});
