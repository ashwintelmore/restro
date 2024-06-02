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
import NavBar from './NavBar';
import FoodCategory from './FoodCategory';
import { useToast } from 'react-native-toast-notifications';
import Ionicons from 'react-native-vector-icons/FontAwesome';
import React, { useState, useEffect, useContext } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { GlobalInfo } from '../App';
export default function Home({ navigation }) {
  const toast = useToast();
  const [categories, setCategories] = useState([]);
  const { user, setUser, token } = useContext(GlobalInfo);
  console.log('token in home', token);
  const [showFood, setShowFood] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState();
  const [restroName, setRestroName] = useState('Restro Logo');
  const [showRegister, setShowRegister] = useState([]);
  const [allFood, setAllFood] = useState(false);
  const [category, setCategory] = useState({
    catName: '',
    catDescp: '',
    catImage: { uri: '' },
  });
  const [loading, setLoaing] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      BackHandler.addEventListener('hardwareBcakPress', handleBackPress);
      return () => {
        BackHandler.removeEventListener('hardwareBcakPress', handleBackPress);
      };
    })
  );
  useEffect(() => {
    getFood();
  }, []);
  const handleBackPress = () => {
    Alert.alert('Exit App', 'Are you sure you want to exit?', [
      {
        text: 'Cancel',
        onPress: () => null,
        style: 'cancel',
      },
      {
        text: 'Exit',
        onPress: () => BackHandler.exitApp(),
      },
    ]);
    return true;
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log('result.assets[0]', result);

    if (!result.canceled) {
      setCategory({
        ...category,
        catImage: {
          type: 'image/jpeg',
          name: 'photo.jpg',
          uri: result.assets[0].uri,
        },
      });
    }
  };

  const addNewFood = async () => {
    try {
      const res = await fetch(
        'https://quick-menu-backend.onrender.com/api/food/create',
        {
          method: 'POST',
          headers: {
            'content-type': 'multipart/form-data',
            Authorization: 'test ' + token,
          },
          body: body,
        }
      );
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.log(error);
      toast.show('Something went wrong', { type: 'failure', placement: 'top' });
    }
    setLoaing(false);
    // setShowRegister(!showRegister)
  };
  // 664f8cb128f1709facca266b]
  console.log('token in get cat outer ', token);

  const getFood = async () => {
    console.log('token in get cat ', token);
    const res = await fetch(
      'https://quick-menu-backend.onrender.com/api/food/getAll',
      {
        method: 'GET',
      }
    );
    const data = await res.json();
    console.log('food', data);
    setAllFood(data.payload);
  };
  console.log(loading);
  return (
    <SafeAreaView style={styles.mainContainer}>
      <NavBar />

      <Modal transparent={true} visible={showFood} animationType="fade">
        <View style={styles.registerModalmainContainer1}>
          <View style={styles.registerModalmainContainer2}>
            <Text style={styles.registerModalRestroName}>Add New Food</Text>
            <TextInput
              style={styles.registerModalInput}
              value={category.catName}
              onChangeText={(value) =>
                setCategory({ ...category, catName: value })
              }
              placeholder="Food Name"></TextInput>

            <TextInput
              style={styles.registerModalInput}
              value={category.catDescp}
              onChangeText={(value) =>
                setCategory({ ...category, catDescp: value })
              }
              placeholder="Descrpition"></TextInput>
            <TextInput
              style={styles.registerModalInput}
              value={category.catDescp}
              onChangeText={(value) =>
                setCategory({ ...category, catDescp: value })
              }
              placeholder="Price"></TextInput>

            <View style={styles.registerModalButtons}>
              <TouchableOpacity style={styles.catImagerModalButton}>
                <Text
                  style={styles.registerModalButton1Txt}
                  onPress={() => pickImage()}>
                  Pick Image
                </Text>
              </TouchableOpacity>
              {category.catImage ? (
                <Image
                  source={{ uri: category.catImage.uri }}
                  style={styles.catimage}
                />
              ) : (
                <Text>Priview image here</Text>
              )}
            </View>

            <View style={styles.registerModalButtons}>
              <TouchableOpacity
                onPress={() => setShowFood(!showFood)}
                style={styles.registerModalButton2}>
                <Text style={styles.registerModalButton1Txt}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => addNewFood()}
                style={styles.registerModalButton1}>
                <Text style={styles.registerModalButton1Txt}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.maincontainer}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Search all dishes"></TextInput>
            <TouchableOpacity style={styles.buttonQR}>
              <Text style={styles.buttonQRtxt}>
                <Ionicons name="qrcode" size={40} color="#FFB61E" />
              </Text>
            </TouchableOpacity>
          </View>

          <FoodCategory />

          <View style={styles.categoryContainer1}>
            <View style={styles.categoryContainer1TxtContainer}>
              <Text style={styles.categoryContainer1Txt}>
                {"Today's Offers"}
              </Text>
              <Text style={styles.categoryContainer1Txt1}>Add more +</Text>
            </View>

            <View>
              <View style={styles.offerImgContainer}>
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}>
                  <Image
                    style={styles.offerImg}
                    source={{
                      uri: 'https://i0.wp.com/s3.ap-south-1.amazonaws.com/img.paisawapas/images/2021/09/14175021/SWIGGY.jpg?fit=1200%2C630&ssl=1',
                    }}
                  />
                  <Image
                    style={styles.offerImg}
                    source={{
                      uri: 'https://cdn.grabon.in/gograbon/images/merchant/1610000375685.png',
                    }}
                  />
                  <Image
                    style={styles.offerImg}
                    source={{
                      uri: 'https://cdn.grabon.in/gograbon/images/merchant/1583822192166.png',
                    }}
                  />
                </ScrollView>
              </View>
            </View>

            <View>
              <View style={styles.categoryContainer1TxtContainer}>
                <Text style={styles.categoryContainer1Txt}>Food for You</Text>
                <TouchableOpacity onPress={() => setShowFood(!showFood)}>
                  <Text style={styles.categoryContainer1Txt1}>
                    Add New Food +
                  </Text>
                </TouchableOpacity>
              </View>

              <FlatList
                data={allFood}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => {
                  return (
                    <View style={styles.foodImgContainer}>
                      <View style={styles.foodImginnerContainer}>
                        <Image
                          style={styles.foodImg}
                          source={{
                            uri: 'https://img.freepik.com/free-photo/burger-hamburger-cheeseburger_505751-3697.jpg?size=338&ext=jpg&ga=GA1.1.87170709.1707264000&semt=ais',
                          }}
                        />
                        <Text style={styles.foodName}>{item.name}</Text>
                        <View style={styles.time}>
                          <Text style={styles.timetxt}>15mins</Text>
                          <Text style={styles.timetxt}>
                            5
                            <Ionicons
                              style={styles.star}
                              name="star"
                              size={10}
                              color={Color.PRIME}
                            />
                          </Text>
                        </View>
                        <View style={styles.priceAdd}>
                          <Text style={styles.price}>
                            <Ionicons
                              style={styles.star}
                              name="inr"
                              size={12}
                              color="black"
                            />
                            {item.price}
                          </Text>
                          <TouchableOpacity>
                            <Ionicons
                              style={styles.edit}
                              name="pencil"
                              size={15}
                              color="white"
                            />
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  );
                }}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  registerModalmainContainer1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  picker: {
    borderRadius: 20,
    padding: 10,
    marginTop: 10,
    backgroundColor: '#F2F3F4',
  },
  maincontainer: {
    flex: 1,
    marginTop: 0,
  },
  registerModalmainContainer2: {
    height: 'auto',
    width: '85%',
    backgroundColor: 'white',
    // justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    borderRadius: 20,
  },
  registerModalRestroName: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
  },
  registerModalInput: {
    borderRadius: 5,
    width: '90%',
    color: 'gray',
    fontSize: 12,
    padding: 8,
    margin: 10,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  registerModalInput2: {
    borderRadius: 5,
    width: '50%',
    color: 'gray',
    fontSize: 12,
    padding: 8,
    margin: 10,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  registerModalInputOtp: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 10,
  },
  registerModalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 10,
    marginTop: 10,
  },
  catImagerModalButton: {
    color: 'white',
    padding: 10,

    backgroundColor: Color.PRIME,
    borderRadius: 10,
  },
  registerModalButton1: {
    backgroundColor: Color.PRIME,
    color: 'white',
    padding: 10,
    width: '45%',
    borderRadius: 10,
  },
  registerModalButton2: {
    backgroundColor: '#DE3163',
    padding: 10,
    borderRadius: 10,
    width: '45%',
  },
  registerModalButton1Txt: {
    color: 'white',
    fontWeight: '700',
    textAlign: 'center',
  },
  mainContainer: {
    flex: 1,
    marginTop: 0,
    backgroundColor: 'white',
  },

  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginHorizontal: 20,
  },
  input: {
    borderRadius: 25,
    borderWidth: 1,
    width: '80%',
    color: 'gray',
    fontSize: 15,
    padding: 8,
    paddingLeft: 20,
  },

  buttonQR: {},
  buttonQRtxt: {
    color: 'white',

    fontWeight: '700',
  },
  categoryContainer1: {
    marginHorizontal: 20,
  },
  categoryContainer1TxtContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoryContainer1Txt: {
    fontWeight: '700',
    marginTop: 10,
  },
  categoryContainer1Txt1: {
    fontWeight: '600',
    marginTop: 10,
    color: Color.PRIME,
  },
  categoryContainer2: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryContainer2Img: {
    aspectRatio: 1,
    width: 66,
    borderRadius: 50,
  },
  categoryContainer2Txt: {
    color: 'gray',
    fontSize: 12,
    marginLeft: 0,
  },
  offerImgContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  offerImg: {
    marginTop: 15,
    marginHorizontal: 10,
    aspectRatio: 2,
    width: '10%',
    height: 300,
    borderRadius: 17,
  },
  foodImgContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
    gap: 2,

    height: '100%',
  },
  foodName: {
    fontWeight: '600',
    marginTop: 10,
    marginLeft: 10,
  },
  foodImg: {
    width: '100%',
    height: 100,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  foodImginnerContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    height: 'auto',
    width: '48%',
    marginTop: 10,
  },
  time: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    paddingHorizontal: 10,
  },
  timetxt: {
    color: 'gray',
  },
  priceAdd: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  price: {
    fontWeight: '500',
  },
  edit: {
    backgroundColor: Color.PRIME,
    borderRadius: 90,
    paddingHorizontal: 9,
    paddingVertical: 7,
  },
  add: {
    backgroundColor: Color.PRIME,
    borderRadius: 90,
    paddingHorizontal: 10,
    paddingVertical: 7,
  },
  bottomContainer: {
    backgroundColor: Color.PRIME,
    borderRadius: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    display: 'flex',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    marginHorizontal: 20,
  },
  bottominnerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bottomContainertxt1: {
    color: 'white',
  },
  bottomContainertxt2: {
    color: 'white',
    fontWeight: '600',
    fontSize: 20,
  },
  catimage: {
    aspectRatio: 1,
    width: 30,
    height: 30,
    borderRadius: 0,
  },
});
