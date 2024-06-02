import {
  TextInput,
  Text,
  View,
  StyleSheet,
  Image,
  Pressable,
  Alert,
  SafeAreaView,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Modal,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/FontAwesome';
import React,{useState} from 'react';

import Color from './Color';

export default function Signup({ navigation }) {
const [name,setName]= useState();
const [phone,setPhone]= useState();
const [email,setEmail]= useState();
const [password,setPassword]= useState();
const handlenewUser = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        'https://quick-menu-backend.onrender.com/api/register',
        {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body :JSON.stringify({ownerName:name,phone,email,password})
        }
      );
      const data = await res.json();
      console.log(data);
      console.log(res.status);
      if(data && res.status === 201){
        window.alert("User registered")
        navigation.navigate('Login')
        
      }
      if(res.status===203){
        window.alert("Input fiels should not be empty")
      }
      
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <SafeAreaView style={styles.maincontainer}>
        <View style={styles.maincontainer}>
          <View style={styles.backbtncon}>
            <TouchableOpacity
              style={styles.backbtn}
              onPress={() => navigation.navigate('Login')}>
              <Ionicons name="chevron-left" size={18} color="gray" />
            </TouchableOpacity>
          </View>
          <View>
            <Text style={styles.txt1}>Getting Started</Text>
            <Text style={styles.txt2}>Create an account to continue</Text>
          </View>
          <View style={styles.logininputmaincontainer}>
            <View style={styles.logininputcontainer}>
              <Text style={styles.txt3}>Name</Text>
              <TextInput value={name} onChangeText={(name)=>setName(name)}
                style={styles.inputlogin}
                placeholder="Enter your Name"></TextInput>
            </View>
            <View style={styles.logininputcontainer}>
              <Text style={styles.txt3}>Phone no.</Text>
              <TextInput value={phone} onChangeText={(phone)=>setPhone(phone)}
                style={styles.inputlogin}
                placeholder="Enter your Phone no."></TextInput>
            </View>
            <View style={styles.logininputcontainer}>
              <Text style={styles.txt3}>Email</Text>
              <TextInput value={email} onChangeText={(email)=>setEmail(email)}
                style={styles.inputlogin}
                placeholder="Enter your Email"></TextInput>
            </View>
            <View style={styles.logininputcontainer}>
              <Text style={styles.txt3}>Password</Text>
              <TextInput secureTextEntry={true} value={password} onChangeText={(password)=>setPassword(password)}
                style={styles.inputlogin}
                placeholder="Enter your Password"></TextInput>
            </View>
            <View style={styles.logininputcontainer}>
              <TouchableOpacity
                onPress={(e) =>handlenewUser(e)}
                style={styles.loginbtn}>
                <Text style={styles.txt4}>Create Account</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.flex}>
            <Text style={styles.txt5}>Have an Account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.txt6}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}
const styles = StyleSheet.create({
  maincontainer: {
    backgroundColor: 'white',
    flex: 1,
  },
  backbtncon: {
    marginLeft: 10,
    marginTop: 10,
  },
  backbtn: {
    justifyContent: 'center',
    alignItems: 'center',
    
    width: 30,
    height: 30,
    borderRadius: 20,
  },
  txt1: {
    fontSize: 30,
    marginLeft: 20,
    marginTop: 30,
  },
  txt2: {
    fontSize: 18,
    color: 'lightgray',
    marginLeft: 20,
  },
  logininputmaincontainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 20,
  },
  logininputcontainer: {
    width: '100%',
  },
  inputlogin: {
    backgroundColor: '#E5E4E2',
    borderRadius: 10,
    fontSize: 15,
    marginTop: 0,
    marginBottom: 10,
    padding: 10,
    color: 'gray',
  },
  txt3: {
    fontSize: 15,
    color: Color.PRIME,
  },
  loginbtn: {
    paddingHorizontal: 30,
    backgroundColor: Color.PRIME,
    padding: 15,
    borderRadius: 10,
    width: '100%',
    textAlign: 'center',
    marginTop: 20,
  },
  txt4: {
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
  },
  txt6: {
    borderBottomWidth: 1,
  },
  flex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 25,
    marginTop: 40,
  },
});
