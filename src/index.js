import React, { Component } from "react";
import { Image, Text, View, StyleSheet } from "react-native";
import homeScreen from "./home/home";
import mineScreen from "./home/mine";
import weChatScreen from "./home/wechat";
import projectScreen from "./home/project";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

import { DEVICE_WIDTH, getRealDP as dp, isAndroid } from "./utils/screenUtil";

// const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
              alert('route.name:'+route.name)
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
        })}
      >
        <Tab.Screen
          name="home"
          component={homeScreen}
          options={{
            tabBarLabel: "首页",
            tabBarIcon: ({ focused ,color, size }) => (
              <Ionicons name={focused?"home":"home-outline"} size={25} color={color}/>
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
              <Ionicons name={focused?"people":"people-outline"} size={25} color={color}/>
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
              <Ionicons name={focused?"document-text":"document-text-outline"} size={25} color={color}/>
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
              <Ionicons name={focused?"person":"person-outline"} size={25} color={color}/>
            ),
            // tabBarBadge: 0,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
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