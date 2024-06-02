
import {
  Text,
  SafeAreaView,
  StyleSheet,
  View,
  TextInput,
  Pressable,
  FlatList,
  ScrollView,
  Image,
  TouchableOpacity,
  Modal,
  BackHandler,
  Alert,
} from 'react-native';
import Color from './Color';
import { useToast } from 'react-native-toast-notifications';
import Ionicons from 'react-native-vector-icons/FontAwesome';
import React, { useState, useEffect, useContext } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { GlobalInfo } from '../App';
import { useNavigation } from "@react-navigation/native";

export default function NavBar() {
  const navigation = useNavigation();
  const { user, setUser, token } = useContext(GlobalInfo);
  
  const [restroName, setRestroName] = useState('Restro Logo');
  

  return (
    <SafeAreaView style={styles.mainContainer}>
      

      <View style={styles.navBarContainer}>
        <View style={styles.navBar}>
          <TouchableOpacity
            style={styles.navBarImgbtn}
            onPress={() => navigation.openDrawer()}>
            <Image
              style={styles.navBarImg}
              source={{
                uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEhm52kKxfKuzfAvGcExrUI2r0kxn4rHeOdw&usqp=CAU',
              }}
            />
          </TouchableOpacity>
          <Text style={styles.navBarLogo}>{restroName}</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Notification')}>
            <Image
              style={styles.navBarImg}
              source={{
                uri: 'https://cdn.icon-icons.com/icons2/1880/PNG/512/iconfinder-ring-4341316_120544.png',
              }}
            />
          </TouchableOpacity>
        </View>
      </View>

      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    
    marginTop: 0,
    backgroundColor: 'white',
  },
  navBarContainer: {
    marginHorizontal: 20,
    marginTop: 10,
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  navBarImg: {
    aspectRatio: 1,
    width: 30,

    padding: 12,
    borderRadius: 9,
  },
  navBarImgbtn: {
    width: 30,
    height: 25,
  },
  navBarLogo: {
    color: 'black',
    fontSize: 20,
    fontWeight: '600',
  },
  
});
