import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import FastImage from 'react-native-fast-image'
const GIFFY = () => {
  return (
    <View style={styles.container}>
       <FastImage
        style={styles.image}
        source={require('../../assets/cute-cat.gif')}
        resizeMode={FastImage.resizeMode.contain}
      />
    </View>
  )
}

export default GIFFY

const styles=StyleSheet.create({
    container: {
        marginTop:"30%",
        justifyContent: 'center',
        alignItems: 'center',
      },
      image: {
        width: 300,
        height: 300,
      },
})