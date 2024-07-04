import { View, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { ArrowLeftIcon, UserCircle2 } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { Text } from 'react-native-animatable';
import * as animate from 'react-native-animatable';

const Topbar = () => {
  const navigation = useNavigation();
  const [show,setshow]=useState('Hello');
  
  const handleBackPress = () => {
    navigation.navigate('Home');
  };
  
  const handleUserPress = () => {
    navigation.navigate('User');
  };
  return (
    <View style={styles.topbar}>
      <TouchableOpacity onPress={handleBackPress}>
        <ArrowLeftIcon color="#a193db" size={34} />
      </TouchableOpacity>
      <animate.Text animation={'slideInDown'} style={{color:"#8776cc",fontWeight:"bold",fontSize:30}}>{show}</animate.Text>
      <TouchableOpacity onPress={handleUserPress}>
        <UserCircle2 color="#a193db" size={34} />
      </TouchableOpacity>
    </View>
  );
};

export default Topbar;

const styles = StyleSheet.create({
  topbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: 16,
    position: 'absolute',
    top: 0,
  },
});
