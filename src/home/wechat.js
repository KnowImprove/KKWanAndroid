import React, { Component } from 'react'
import { Text, View,StyleSheet } from 'react-native'

/**
 * 微信公众号
 */
export default class WeChat extends Component {
    render() {
        return (
            <View style={styles.root}>
                <Text>wechat</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    root:{
        width:'100%',
        height:'100%'
    },
})