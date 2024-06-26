import {
  Text,
  SafeAreaView,
  StyleSheet,
  View,
  Platform,
  StatusBar,
  TextInput,
  Pressable,
  FlatList,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
//test
import { ToastProvider } from 'react-native-toast-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, createContext, useEffect,useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  createDrawerNavigator,
  DrawerItemList,
} from '@react-navigation/drawer';
import { useFocusEffect } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/FontAwesome';
import { NavigationContainer } from '@react-navigation/native';
const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();
import Color from './components/Color';

import Home from './components/Home';
import Getstarted from './components/Getstarted';
import Login from './components/Login';
import Signup from './components/Signup';
import Notification from './components/Notification';
import GenerateQR from './components/GenerateQR';
import YourDetails from './components/YourDetails';
import NavBar from './components/NavBar';
import { useNavigation } from "@react-navigation/native";
export const GlobalInfo = createContext();

const CustomeDrawer = (props) => {
  const navigation = useNavigation();
  const { user, setUser, token,setToken } = useContext(GlobalInfo);
  const logout = async()=>{
     await AsyncStorage.removeItem('token')
     setToken(null)
     navigation.navigate('Login')
  }
  return (
    <>
      <View style={styles.customdrawercontainer}>
        <View style={styles.customdrawerinnercontainer}>
          <Image
            style={styles.productimage}
            source={{
              uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-JBa0qzn3MlCscFTrOs6GKUaSSkWIgviGxmdcMsO1HQ&s',
            }}
          />

          <Text style={styles.drawerHeader}>Restro Name</Text>
        </View>
      </View>
      <Text style={styles.profile}>Profile</Text>
      <DrawerItemList {...props} />
      <Text
        style={styles.profile}
        onPress={() =>logout()}>
        Logout
      </Text>
    </>
  );
};

export default function App() {
  const getToken = async () => {
    try {
      const value = await AsyncStorage.getItem('token');
      if (value !== null) {
        // We have data!!
        console.log('login', value);
        setToken(value);
        return value;
      }
    } catch (error) {
      console.log(error);
      // Error retrieving data
    }
  };
  
    const setTokenLocal = async (token) => {
      console.log('under token',token)
    try {
      const value = await AsyncStorage.setItem('token' , token);
      if (value !== null) {
        // We have data!!
        console.log('login', value);
        setToken(value);
        return value;
      }
    } catch (error) {
      console.log(error);
      // Error retrieving data
    }
  };

  const [user, setUser] = useState({
    ownerName: '',
    restroName: '',
    phone: '',
    email: '',
    address: '',
  });

useEffect(()=>{
  getToken()
})
  const [token, setToken] = useState(null);
  console.log('token in app', token);
  return (
    <>
      <ToastProvider duration={2000} style={styles.topmargin}>
        <GlobalInfo.Provider
          value={{
            user: user,
            token: token,
            setUser: setUser,
            setToken:setToken,
          }}>
          <View style={styles.container}>
            <NavigationContainer>
              <Drawer.Navigator
                drawerContent={(props) => <CustomeDrawer {...props} />}
                screenOptions={{
                  drawerStyle: {},
                  headerTintColor: { color: 'red' },
                  headerStyle: {
                    height: 80,
                    backgroundColor: 'green',
                  },

                  headerTitleStyle: {
                    color: 'red',
                  },
                  drawerActiveBackgroundColor: 'white',
                  drawerActiveTintColor: 'black',
                }}
                initialRouteName={token ? 'Home' : 'Home'}
                tabBarOption={{ headerShown: false }}>
               
                  <>
                    <Stack.Screen
                      name="Home"
                      component={Home}
                      options={{ headerShown: false }}
                    />
                    <Stack.Screen
                      name="Notification"
                      component={Notification}
                      options={{ headerShown: false }}
                    />
                    <Stack.Screen
                      name="GenerateQR"
                      component={GenerateQR}
                      options={{ headerShown: false }}
                    />
                    <Stack.Screen
                      name="YourDetails"
                      component={YourDetails}
                      options={{ headerShown: false }}
                    />
                  </>
                  <>
                    <Stack.Screen
                      name="Getstarted"
                      component={Getstarted}
                      options={{ headerShown: false }}
                    />

                    <Stack.Screen
                      name="Login"
                      component={Login}
                      options={{ headerShown: false }}
                    />
                    <Stack.Screen
                      name="Signup"
                      component={Signup}
                      options={{ headerShown: false }}
                    />
                  </>
              </Drawer.Navigator>
            </NavigationContainer>
          </View>
        </GlobalInfo.Provider>
      </ToastProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  productimage: {
    height: 80,
    width: 80,
    borderRadius: 100,
    aspectRatio: 1,

    resizeMode: 'contain',
    shadowColor: 'black',
    shadowOffset: { width: 2, height: 5 },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 5,
  },
  drawerHeader: {
    color: 'white',
    fontSize: 20,
  },

  customdrawercontainer: {
    backgroundColor: Color.PRIME,
    justifyContent: 'center',
    alignItems: 'center',
  },
  customdrawerinnercontainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
    marginHorizontal: 20,
  },
  profile: {
    fontSize: 18,
    marginLeft: 18,
    marginTop: 10,
  },
  topmargin: {
    marginTop: 20,
  },
});
