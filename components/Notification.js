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
import React from 'react';
import NavBar from './NavBar';
import Color from './Color';

export default function Notification({ navigation }) {
  return (
    <>
      <SafeAreaView style={styles.maincontainer}>
        <NavBar />

        <View style={styles.container}>
          <View style={styles.txtcon}>
            <Text style={styles.txt}>You don't have any Notification </Text>
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
  container: {
    justifyContent: 'center',
    flex: 1,
    position:'fixed',
    top:0,
  },
  txtcon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  txt: {
    textAlign: 'center',
  },
});
