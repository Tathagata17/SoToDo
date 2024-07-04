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
  import axios from 'axios';
import Mesaage from '../components/Mesaage';
  
  const Signup = () => {
    const navigation = useNavigation();
    const [name, setName] = useState('');
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
  
    const signupHandle = async () => {
      console.log(name, email, password);
      //setName('');setEmail('');setPassword('');
     try{
           const resposne=await axios.post('http:192.168.29.197:3000/signup',{name,email,password});
           if(resposne.status===200)
            {
               console.log(resposne.data.message);
               messagehandler(resposne.data.message)
               setTimeout(() => {
                navigation.navigate('Login');
               }, 3000);
               
            }
            else
            {
                messagehandler(resposne.data.message)
                setTimeout(() => {
                  navigation.navigate('Login');
                 }, 3000);
            }
      }
      catch(err)
      {
        console.log("Internal server error");
        messagehandler("Internal server erorr")
      }
    };


    const loginhanle=()=>{
      navigation.navigate("Login");
    }
  
    return (
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        {messaagedispaly&&<Mesaage message={messaage}/>}
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <animate.View animation="slideInRight" style={styles.maincontainer}>
            <View style={styles.signupbox}>
              <Text style={styles.signupText}>Signup</Text>
              <TextInput
                style={styles.inputtext}
                placeholder="Name"
                onChangeText={(text) => setName(text)}
                value={name}
              />
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
              <TouchableOpacity style={styles.button} onPress={signupHandle}>
                <Text style={styles.buttonText}>Signup</Text>
              </TouchableOpacity>


              <TouchableOpacity onPress={loginhanle}>
                <Text style={{color:"gray", marginTop:8,fontSize:16}}>Login</Text>
              </TouchableOpacity>
            </View>
          </animate.View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  };
  
  export default Signup;
  
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
  