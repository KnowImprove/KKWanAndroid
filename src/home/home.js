import React, { Component } from 'react'
import { Text, View,StyleSheet } from 'react-native'

export default class Home extends Component {
    render() {
        return (
            <View style={styles.root}>
                <Text>home</Text>
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