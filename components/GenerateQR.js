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
import AsyncStorage from '@react-native-async-storage/async-storage';
import NavBar from './NavBar';
import React, { useState, useEffect } from 'react';
import Ionicons from 'react-native-vector-icons/FontAwesome';
import Color from './Color';
import Styles from './Styles';


//  const headers = {
//     'Content-Type': 'application/json',
//     Authorization: 'test ' +  getToken(),
//   };
export default function GenerateQR({ navigation }) {
  const [qrImage, setQrImage] = useState();
  const [token, setToken] = useState('');
  const [loading, setLoaing] = useState(false);
  const generateQR = async () => {
    const res = await fetch(
      'https://quick-menu-backend.onrender.com/api/restro/qrcode/create',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'test ' + token,
        },
        body: JSON.stringify({}),
      }
    );
    const data = await res.json();
    setQrImage(data.payload.qrImage);
    console.log('res', data);
  };
  //6658312259e48baf5681c022
  const getQRCode = async () => {
    setLoaing(true);
    const res = await fetch(
      'https://quick-menu-backend.onrender.com/api/restro/qrcode/get/6658312259e48baf5681c022',
      {
        method: 'get',
      }
    );
    const data = await res.json();
    setQrImage(data.payload);
    setLoaing(false);
  };
  const getToken = async () => {
    try {
      const value = await AsyncStorage.getItem('token');
      if (value !== null) {
        // We have data!!
        // console.log('login',value);
        setToken(value);
        return value;
      }
    } catch (error) {
      console.log(error);
      // Error retrieving data
    }
  };
  console.log(qrImage);
  //665820198e0b345c1f7a82c3
  useEffect(() => {
    // generateQR();
    getQRCode();
  }, []);
  console.log('token', token);
  if (loading)
    return (
      <>
        <View>
          <Text style={styles.generatetxt}>
            <Text style={styles.qr}>Loading...</Text>
          </Text>
        </View>
      </> 
    );
  return (
    <>
      <SafeAreaView style={styles.maincontainer}>
        <ScrollView>
          <View style={styles.maincontainer}>
          <NavBar/>
            

            <View>
              <Text style={styles.generatetxt}>
                Generate<Text style={styles.qr}>QR</Text>
              </Text>
            </View>

            {qrImage ? (
              <View style={styles.qrimgcontainer}>
                <Image
                  style={styles.qrimg}
                  source={{
                    uri: qrImage,
                  }}
                />
              </View>
            ) : (
              <View style={styles.btncon}>
                <TouchableOpacity
                  style={styles.btn}
                  onPress={() => generateQR()}>
                  <Text style={styles.btntxt}>GenerateQR</Text>
                </TouchableOpacity>
              </View>
            )}
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
  qrimg: {
    height: '70%',
    width: '80%',
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
