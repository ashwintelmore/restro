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
import React from 'react';

import Color from './Color';

export default function Getstarted({ navigation }) {
  return (
    <>
      <SafeAreaView style={styles.maincontainer}>
        <View style={styles.maincontainer}>
          <View style={styles.productimagecon}>
            <Image
              style={styles.productimage}
              source={{
                uri: 'https://logowik.com/content/uploads/images/food-service4537.jpg',
              }}
            />
          </View>
          <View style={styles.con} ><Text style={styles.txtlogo}>Quick Menu</Text>
          <Text style={styles.txt}>Food, in the end, in our own tradition, is something holy. It's not about nutrients and calories. It's about sharing. It's about honesty. It's about identity.</Text>
          </View>
          <View style={styles.btncon}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Login')}
              style={styles.btn}>
              <Text style={styles.btntxt}>Get Started</Text>
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
  productimagecon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  productimage: {
    height: '80%',
    width: '80%',
    aspectRatio: 1,
    
    
    resizeMode: 'contain',
  },
  btncon: {
    position:"absolute",
    bottom:80,
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
  txtlogo:{
    color:Color.PRIME,
    fontSize:50,
     fontWeight:'600',
  },
  txt:{
color:"#A9A9A9",
textAlign:"center",
  },
  con:{
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal:20,
    position:"absolute",
    bottom:150,
  },
});
