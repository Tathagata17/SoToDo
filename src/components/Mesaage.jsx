import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import * as animate from 'react-native-animatable';
const Mesaage = ({message}) => {
    const [animation,setanimation]=useState('slideInDown');
    setTimeout(()=>{
        setanimation('slideOutUp')
    },3000)

  return (
    <animate.View animation={animation} style={styles.messagebox}>
        <Text style={styles.message}>{message}</Text>
    </animate.View>
  )
}

export default Mesaage

const styles=StyleSheet.create({
    messagebox:{
        width:"100%",
        height:100,
        backgroundColor:"#8776cc",
        opacity:0.9,
        position:"absolute",
        top:0,
        justifyContent:"center",
        alignItems:"center",
        zIndex: 1000
    }
    ,message:{
        top:10,
        color:"white",
        fontSize:20,
        fontWeight:"bold"
    }
})