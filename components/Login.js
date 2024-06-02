import React, { useState, useContext } from 'react';
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useToast } from 'react-native-toast-notifications';
import { GlobalInfo } from '../App';
import Color from './Color';

export default function Getstarted({ navigation }) {
  const toast = useToast();
  const { user, setUser , setToken } = useContext(GlobalInfo);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        'https://quick-menu-backend.onrender.com/api/login',
        {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        }
      );
      const data = await res.json();
      console.log(data);
      console.log(res.status);
      console.log(data.user);

      if (data && res.status === 200) {
        setUser({ ...data.user });
        console.log(user);

        try {
          await AsyncStorage.setItem('token', data.token);
          setToken(data.token)
          toast.show('SignIn succesful', { type: 'success', placement: 'top' });
        navigation.navigate('Home');
        } catch (error) {
          console.log(error);
          throw Error('Error in storing token on local');
        }
      }

      if (res.status === 400) {
        toast.show('Input fiels should not be empty', {
          type: 'warning',
          placement: 'top',
        });
      }
      if (res.status === 404 || res.status === 403) {
        toast.show('Invalid Credentials', { type: 'danger', placement: 'top' });
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <SafeAreaView style={styles.maincontainer}>
        <View>
          <View style={styles.loginproductimagecontainer}>
            <Image
              style={styles.productimage}
              source={{
                uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-JBa0qzn3MlCscFTrOs6GKUaSSkWIgviGxmdcMsO1HQ&s',
              }}
            />
            <Text style={styles.txt1}>Quick Menu</Text>
            <Text style={styles.txt2}>Food Ordering App</Text>
          </View>
          <View method="POST" style={styles.logininputmaincontainer}>
            <View style={styles.logininputcontainer}>
              <Text style={styles.txt3}>Email/Phone no.</Text>
              <TextInput
                value={email}
                onChangeText={(email) => setEmail(email)}
                style={styles.inputlogin}
                placeholder="Enter your Email/Phone no."></TextInput>
            </View>
            <View style={styles.logininputcontainer}>
              <Text style={styles.txt3}>Password</Text>
              <TextInput
                style={styles.inputlogin}
                value={password}
                secureTextEntry={true}
                onChangeText={(password) => setPassword(password)}
                placeholder="Enter your Password"></TextInput>
            </View>
            <View style={styles.logininputcontainer}>
              <TouchableOpacity
                onPress={(e) => handleSubmit(e)}
                style={styles.loginbtn}>
                <Text style={styles.txt4}>Sign In</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.flex}>
            <Text style={styles.txt5}>Don't Have Account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
              <Text style={styles.txt6}>Sign Up</Text>
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
  loginproductimagecontainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 50,
  },
  productimage: {
    height: 120,

    aspectRatio: 1,

    resizeMode: 'contain',
  },
  txt1: {
    fontSize: 25,
    fontWeight: '700',
  },
  txt2: {
    fontSize: 18,
    color: 'gray',
  },
  txt3: {
    fontSize: 15,
    color: Color.PRIME,
  },
  logininputmaincontainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
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
  loginbtn: {
    backgroundColor: Color.PRIME,
    padding: 15,
    paddingHorizontal: 30,
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
