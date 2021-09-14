import React, { Component } from 'react'
import { Text, View ,StyleSheet} from 'react-native'

export default class Mine extends Component {
    render() {
        return (
            <View style={styles.root}>
                <Text>Mine</Text>
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