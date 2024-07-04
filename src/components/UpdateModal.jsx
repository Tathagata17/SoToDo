import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import * as animate from 'react-native-animatable';
import {TextInput} from 'react-native-gesture-handler';
import {ArrowBigDown} from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const UpdateModal = ({data,onupdate,closebox}) => {
  const [color, setcolor] = useState('green');
  const [taskname, settaskname] = useState('');
  const [desc, setdesc] = useState('');
  const [completed, setcompleted] = useState(data.completed);
  const [animates,setanimate]=useState('slideInUp');

  const closethehell=()=>{
    setanimate('slideOutDown');
    setTimeout(() => {
        closebox();
    }, 500);
  }
  const completetask = () => {
    setcompleted(true);
  };



  const updatetodo = async id => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await axios.post(
        `http://192.168.29.197:3000/home/updatetask/${id}`,
        {task: taskname, description: desc, completed: completed},
        {
          headers: {
            authorization: token,
          },
        },
      );
      onupdate();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <animate.View animation={animates} style={styles.main}>
      <View>
        <Text
          style={{
            color: '#cccafc',
            fontSize: 40,
            marginBottom: 10,
            fontWeight: 'bold',
          }}>
          Update
        </Text>
      </View>
      <View style={styles.updatebox}>
        <TextInput
          style={styles.inuptbox}
          placeholder={data.taskName}
          onChangeText={text => {
            settaskname(text);
          }}
        />
        <TextInput
          style={styles.inuptdescbox}
          placeholder={data.description}
          multiline={true}
          onChangeText={text => {
            setdesc(text);
          }}
        />
        <TouchableOpacity style={styles.button} onPress={()=>{updatetodo(data._id)}}>
          <Text style={styles.buttonText}>Update Todo</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, {backgroundColor: color}]}
          onPress={completetask}>
          <Text style={styles.buttonText}>Completed</Text>
        </TouchableOpacity>
      </View>
      <View style={{marginTop: 20}}>
        <TouchableOpacity onPress={closethehell}>
        <ArrowBigDown size={50} color={'gray'} />
        </TouchableOpacity>
      </View>
    </animate.View>
  );
};

export default UpdateModal;

const styles = StyleSheet.create({
  main: {
    backgroundColor: 'white',
    width: '100%',
    height: '100%',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  updatebox: {
    backgroundColor: '#e9e8ff',
    height: 300,
    width: '90%',
    marginLeft: 50,
    marginRight: 50,
    borderRadius: 20,
    padding: 20,
    gap: 20,
  },
  inuptbox: {
    height: 'auto',
    width: '100%',
    backgroundColor: '#cccafc',
    padding: 10,
    borderRadius: 10,
    fontSize: 16,
  },
  inuptdescbox: {
    height: 'auto',
    width: '100%',
    backgroundColor: '#cccafc',
    padding: 10,
    borderRadius: 10,
    fontSize: 16,
    fontWeight: 'semibold',
  },
  button: {
    backgroundColor: '#a193db',
    borderRadius: 10,
    width: '100%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
