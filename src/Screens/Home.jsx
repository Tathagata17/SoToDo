import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Topbar from '../components/Topbar';
import Card from '../components/Card';
import Mesaage from '../components/Mesaage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import UpdateModal from '../components/UpdateModal';
import GIFFY from '../components/GIFFY';
import * as animate from 'react-native-animatable';
import { useFocusEffect } from '@react-navigation/native';

const Home = () => {
  const [taskname, settaskname] = useState('');
  const [desc, setdesc] = useState('');
  const [List, setlist] = useState([]);
  const [messaagedispaly, setmessagedisplay] = useState(false);
  const [messaage, setmessage] = useState('');

  const [openmodal, setopenmodal] = useState(false);
  const [items, setitem] = useState({});

  const [toload, settoload] = useState(true);
  const [toloadgif, settoloadgif] = useState(false);

  const handleload = () => {
    if (List.length == 0) {
      settoload(false);
      settoloadgif(true);
    } else {
      settoload(true);
      settoloadgif(false);
    }
  };

  useEffect(() => {
    handleload();
  }, [List]);

  const messagehandler = text => {
    setmessage(text);
    setmessagedisplay(true);
    setTimeout(() => {
      setmessagedisplay(false);
    }, 5000);
  };

  const loadtodo = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await axios.get('http://192.168.29.197:3000/home', {
        headers: {
          authorization: token,
        },
      });
      setlist(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };
  //useEffect(() => {
  //  loadtodo();
  //}, []);
  useFocusEffect(
    React.useCallback(() => {
      loadtodo(); // Refresh the list when navigating back to the home screen

      return () => {
        // Optionally, clear any specific states when the screen is unfocused (navigated away)
        setlist([]);
      };
    }, [])
  );

  const createtodo = async () => {
    try {
      if (taskname === '' && desc === '') {
        messagehandler('Input is Empty');
        return;
      }
      const token = await AsyncStorage.getItem('token');
      const response = await axios.post(
        'http://192.168.29.197:3000/home/createtask',
        {task: taskname, description: desc},
        {
          headers: {
            authorization: token,
          },
        },
      );
      // console.log(response.data);
      messagehandler(response.data.message);
      loadtodo();
      settaskname('');
      setdesc('');
    } catch (err) {
      console.log(err);
    }
  };

  const deletetodo = async id => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await axios.post(
        `http://192.168.29.197:3000/home/deletetask/${id}`,
        {},
        {
          headers: {
            authorization: token,
          },
        },
      );
      messagehandler(response.data.message);
      loadtodo();
    } catch (err) {
      console.log(err);
    }
  };

  const updatetodo = (item, id) => {
    //console.log('its to be updated', id);
    setopenmodal(true);
    setitem(item);
  };

  const handleupdatedtodo = () => {
    setopenmodal(false);
    messagehandler('Todo Updated');
    loadtodo();
  };

  const handleclosemodal = () => {
    setopenmodal(false);
    loadtodo();
  };

  return (
    <animate.View animation={'slideInRight'} style={styles.maincontainer}>
      {messaagedispaly && <Mesaage message={messaage} />}
      <Topbar />
      <View style={styles.todobox}>
        <TextInput
          placeholder="Todo"
          style={styles.input}
          onChangeText={text => settaskname(text)}
          value={taskname}
        />
        <TextInput
          placeholder="Description"
          style={styles.input}
          onChangeText={text => {
            setdesc(text);
          }}
          value={desc}
        />
        <TouchableOpacity style={styles.button} onPress={createtodo}>
          <Text style={styles.buttonText}>Add Todo</Text>
        </TouchableOpacity>
      </View>
      {toload && (
        <View style={styles.cardbox}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {List.map((item, index) => {
              //console.log(item._id);
              return (
                <Card
                  data={item}
                  key={index}
                  expand={1}
                  ondelete={() => {
                    deletetodo(item._id);
                  }}
                  onupdate={() => {
                    updatetodo(item, item._id);
                  }}
                />
              );
            })}
          </ScrollView>
        </View>
      )}
      {toloadgif && (
        <View>
          <GIFFY />
        </View>
      )}
      {openmodal && (
        <UpdateModal
          data={items}
          onupdate={handleupdatedtodo}
          closebox={handleclosemodal}
        />
      )}
    </animate.View>
  );
};

export default Home;

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //position: 'relative',
  },
  todobox: {
    marginTop: 80,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e9e8ff',
    width: 320,
    height: 240,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    padding: 20,
  },
  input: {
    height: 48,
    width: 300,
    backgroundColor: '#cccafc',
    marginVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#a193db',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 20,
    width: 300,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardbox: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 500,
    flex: 1,
    marginTop: 20,
    paddingHorizontal: 20,
  },
});
