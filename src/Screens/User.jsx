import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import Topbar from '../components/Topbar';
import FastImage from 'react-native-fast-image';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
const User = () => {
  const [userdata, setuserdata] = useState({});
  const navigation = useNavigation();
  const handlelogout = async () => {
    try {
      await AsyncStorage.clear();
      navigation.navigate('Login');
    } catch (err) {
      console.log(err);
    }
  };
  const getuserdata = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await axios.get('http://192.168.29.197:3000/home/user', {
        headers: {
          authorization: token,
        },
      });
      setuserdata(response.data);
      //console.log(userdata);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getuserdata();
  }, []);
  return (
    <View style={styles.main}>
      <Topbar />
      <View style={styles.userbox}>
        <Text style={styles.text}>Name:{userdata.name}</Text>
        <Text style={styles.text}>email:{userdata.email}</Text>
        <TouchableOpacity onPress={handlelogout}>
          <Text style={{color: 'red', fontSize: 20, fontWeight: 600}}>
            logout
          </Text>
        </TouchableOpacity>

        <View style={styles.container}>
          <FastImage
            style={styles.image}
            source={require('../../assets/cat.gif')}
            resizeMode={FastImage.resizeMode.contain}
          />
        </View>
      </View>
    </View>
  );
};

export default User;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userbox: {
    alignItems: 'flex-start',
    backgroundColor: '#cccafc',
    width: '100%',
    height: '80%',
    top: 80,
    gap: 10,
    paddingTop: 20,
    paddingLeft: 20,
  },
  text: {
    color: '#a193db',
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 300,
  },
});
