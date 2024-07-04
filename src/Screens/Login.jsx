import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    TextInput,
    TouchableOpacity,
    ScrollView,
    KeyboardAvoidingView,
  } from 'react-native';
  import React, {useState} from 'react';
  import * as animate from 'react-native-animatable';
  import Topbar from '../components/Topbar';
  import {useNavigation} from '@react-navigation/native';
  import Mesaage from '../components/Mesaage';
  import axios from 'axios';
  import AsyncStorage from '@react-native-async-storage/async-storage';
  
  const Login = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [messaagedispaly,setmessagedisplay]=useState(false);
    const [messaage,setmessage]=useState('');

    const messagehandler=(text)=>{
        setmessage(text);
        setmessagedisplay(true);
        setTimeout(() => {
            setmessagedisplay(false)
        }, 5000);
    }
  
    const LoginHandle = async () => {
      console.log(email, password);
     try{
           const resposne=await axios.post('http:192.168.29.197:3000/login',{email,password});
           if(resposne.status===200)
            {
              messagehandler(resposne.data.message);
              await AsyncStorage.setItem('token',resposne.data.token);
              navigation.navigate('Home');
            }
            else
            {
                messagehandler(resposne.data.message);
            }
      }
      catch(err)
      {
        console.log("Internal server error");
      }
    };


    const handlesignup=()=>{
      navigation.navigate('Signup')
    }


    return (
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        {messaagedispaly&&<Mesaage message={messaage}/>}
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <animate.View animation="slideInRight" style={styles.maincontainer}>
            <View style={styles.signupbox}>
              <Text style={styles.signupText}>Login</Text>
              <TextInput
                style={styles.inputtext}
                placeholder="Example@gmail.com"
                onChangeText={(text) => setEmail(text)}
                value={email}
              />
              <TextInput
                style={styles.inputtext}
                placeholder="Password"
                secureTextEntry
                onChangeText={(text) => setPassword(text)}
                value={password}
              />
              <TouchableOpacity style={styles.button} onPress={LoginHandle}>
                <Text style={styles.buttonText}>Login</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={handlesignup}>
                <Text style={{color:"gray", marginTop:8,fontSize:16}}>Signup</Text>
              </TouchableOpacity>

            </View>
          </animate.View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  };
  
  export default Login;
  
  const styles = StyleSheet.create({
    scrollContainer: {
      flexGrow: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    maincontainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    inputtext: {
      height: 40,
      width: 250,
      backgroundColor: '#cccafc',
      marginVertical: 10,
      paddingHorizontal: 10,
      borderRadius: 5,
    },
    signupbox: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#e9e8ff',
      width: 300,
      borderRadius: 30,
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      padding: 20,
    },
    signupText: {
      color: 'white',
      fontSize: 40,
      fontWeight: '600',
      marginBottom: 20,
    },
    button: {
      backgroundColor: '#a193db',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
      marginTop: 20,
    },
    buttonText: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
    },
  });
  