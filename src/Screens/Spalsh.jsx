import { View, Text, Image, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as animate from 'react-native-animatable'
import { useNavigation } from '@react-navigation/native'
const backimg=require("../../assets/splash.jpg")
import AsyncStorage from '@react-native-async-storage/async-storage'
const Spalsh = () => {

const navigation = useNavigation();

    useEffect(() => {
        const checkUser = async () => {
            const token = await AsyncStorage.getItem('token');
            setTimeout(() => {
                if (!token) {
                    navigation.navigate('Login');
                } else {
                    navigation.navigate('Home');
                }
            }, 2000); // Keep the splash screen for 2 seconds
        };

        checkUser();
    }, [navigation]);


  return (
    <animate.View animation={'slideInRight'} style={styles.container}>
        <Image source={backimg} style={{objectFit:"cover",height:"100%",width:"100%"}}/>
      <animate.Text animation={'slideInDown'} delay={200} style={styles.text}>SoTODO</animate.Text>
      <animate.Text animation={'slideInUp'} delay={200} style={styles.text2}>list down your work</animate.Text>
    </animate.View>
  )
}

export default Spalsh

const styles=StyleSheet.create({
container:{
    flex:1,
    justifyContent:"center",
    alignItems:"center"
},
text:{
    color:"white",
    fontSize:40,
    position:"absolute",
    fontWeight:"bold"
},
text2:{
    color:"gray",
    fontSize:20,
    position:"absolute",
    bottom:16
}
})