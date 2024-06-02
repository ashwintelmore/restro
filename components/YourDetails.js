import {
  TextInput,
  Text,
  View,
  StyleSheet,
  Span,
  Image,
  Pressable,
  Alert,
  SafeAreaView,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Modal,
} from 'react-native';
import NavBar from './NavBar';
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import Ionicons from 'react-native-vector-icons/FontAwesome';
import Color from './Color';
import Styles from './Styles';
export default function YourDetails({ navigation }) {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        'https://quick-menu-backend.onrender.com/api/restro/update',
        {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body :JSON.stringify({email,password})
        }
      );
      const data = await res.json();
      console.log(data);
      console.log(res.status);
      if(data && res.status===200){

        navigation.navigate('Home');
      }
      if(res.status === 203){
        window.alert("Input fiels should not be empty");
      }
      if(res.status === 404){
        window.alert("Invalid credentials")
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <SafeAreaView style={styles.maincontainer}>
      <NavBar/>
      <ScrollView>
        <View style={styles.maincontainer}>
          
          <View>
            <Text style={styles.generatetxt}>
              Your<Text style={styles.qr}>Details</Text>
            </Text>
          </View>
          <View style={styles.logininputmaincontainer}>
            <View style={styles.logininputcontainer}>
              <Text style={styles.txt3}>Restro Name</Text>
              <TextInput
                style={styles.inputlogin}
                placeholder="Enter your Restro Name"></TextInput>
            </View>
            <View style={styles.logininputcontainer}>
              <Text style={styles.txt3}>Owner Name</Text>
              <TextInput
                style={styles.inputlogin}
                placeholder="Enter Restro Owner Name"></TextInput>
            </View>
            <View style={styles.logininputcontainer}>
              <Text style={styles.txt3}>Phone no.</Text>
              <TextInput
                style={styles.inputlogin}
                placeholder="Enter your Phone no."></TextInput>
            </View>
            
            
          
            <View style={styles.logininputcontainer}>
              <Text style={styles.txt3}>Email</Text>
              <TextInput
                style={styles.inputlogin}
                placeholder="Enter your Email"></TextInput>
            </View>
            <View style={styles.logininputcontainer}>
              <Text style={styles.txt3}>Address</Text>
              <TextInput
                style={styles.inputlogin}
                placeholder="Enter your Address"></TextInput>
            </View>


            <View style={styles.logininputcontainer}>
            <Text style={styles.txt3}>Logo</Text>
              <TouchableOpacity style={styles.loginbtn}  onPress={pickImage} >
                <Text style={styles.txt4}>Pick an image from camera roll</Text>
              </TouchableOpacity>
            </View>
            


            <View style={styles.logininputcontainer}>
              <TouchableOpacity style={styles.loginbtn} onPress={(e)=>handleSubmit(e)}>
                <Text style={styles.txt4}>Submit Details</Text>
              </TouchableOpacity>
            </View>
          </View>
          
        </View>
        </ScrollView>
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
  qrimgcontainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 350,
    // borderColor: Color.PRIME,
    // borderWidth: 10,
  },
  productimagecon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadimg: {
    height: '10%',
    width: '10%',
    aspectRatio: 1,
    shadowColor: 'black',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 5,
    transform: [{ translateY: -0 }],
    borderColor: Color.PRIME,
    borderWidth: 0,
    borderRadius: 0,
    resizeMode: 'contain',
  },
  btncon: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  btn: {
    backgroundColor: Color.PRIME,
    padding: 18,
    paddingHorizontal: 30,
    borderRadius: 10,
    width: '50%',
    textAlign: 'center',
  },
  btntxt: {
    textAlign: 'center',
    color: 'white',
  },
  txtlogo: {
    color: Color.PRIME,
    fontSize: 50,
    fontWeight: '600',
  },
  generatetxt: {
    fontSize: 30,
    fontWeight: '600',
    textAlign: 'center',
    color: 'gray',
  },
  qr: {
    color: Color.PRIME,
  },
  txt: {
    color: '#A9A9A9',
    textAlign: 'center',
  },
  con: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    position: 'absolute',
    bottom: 150,
  },
  logininputmaincontainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 0,
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
});
