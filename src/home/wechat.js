import React, { Component } from 'react'
import { Text, View,StyleSheet } from 'react-native'

/**
 * 微信公众号
 */
export default class WeChat extends Component {
    render() {
        return (
            <View style={styles.root}>
                <Text>你好，我是公众号 、</Text>
                <Text>你好，我是公众号 、</Text>

                <Text>你好，我是公众号 、</Text>

                <Text>你好，我是公众号 、</Text>

                <Text>你好，我是公众号 、</Text>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    root:{
        width:'100%',
        height:'100%',
        backgroundColor:'pink'
    },
})