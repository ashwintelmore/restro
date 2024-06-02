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
} from "react-native";
import Color from "./Color";
import NavBar from "./NavBar";
import { useToast } from "react-native-toast-notifications";
import Ionicons from "react-native-vector-icons/FontAwesome";
import React, { useState, useEffect, useContext } from "react";
import { useFocusEffect } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { GlobalInfo } from "../App";
export default function FoodCategory({ navigation }) {
  const toast = useToast();
  const [categories, setCategories] = useState([]);
  const { user, setUser, token } = useContext(GlobalInfo);
  console.log("token in home", token);
  const [showFood, setShowFood] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState();
  const [restroName, setRestroName] = useState("Restro Logo");
  const [showRegister, setShowRegister] = useState([]);
  const [allFood, setAllFood] = useState(false);
  const [category, setCategory] = useState({
    catName: "",
    catDescp: "",
    catImage: { uri: "" },
  });
  const [loading, setLoaing] = useState(false);

  useEffect(() => {
    getCategories();
  }, []);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log("result.assets[0]", result);

    if (!result.canceled) {
      setCategory({
        ...category,
        catImage: {
          type: "image/jpeg",
          name: "photo.jpg",
          uri: result.assets[0].uri,
        },
      });
    }
  };

  const addNewCategory = async () => {
    console.log("category", category);

    try {
      let body = new FormData();
      body.append("catName", category.catName);
      body.append("catDescp", category.catDescp);
      body.append("catImage", category.catImage);
      console.log("token in outer", token);
      setLoaing(true);
      console.log(body);

      const res = await fetch(
        "http://localhost:5000/api/category/create",
        {
          method: "POST",
          headers: {
            "content-type": "multipart/form-data",
            Authorization: "test " + token,
          },
          body: body,
        }
      );
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.log(error);
      toast.show("Something went wrong", { type: "failure", placement: "top" });
    }
    setLoaing(false);
    // setShowRegister(!showRegister)
  };
  // 664f8cb128f1709facca266b]
  console.log("token in get cat outer ", token);

  const getCategories = async () => {
    console.log("token in get cat ", token);
    const res = await fetch(
      "https://quick-menu-backend.onrender.com/api/category/getAll/665039cb097f6b27a8882b18",
      {
        method: "GET",
        headers: {
          "content-type": "multipart/form-data",
          Authorization: "test " + token,
        },
      }
    );
    const data = await res.json();
    console.log("cates", data);
    setCategories(data.payload);
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <Modal transparent={true} visible={showRegister} animationType="fade">
        <View style={styles.registerModalmainContainer1}>
          <View style={styles.registerModalmainContainer2}>
            <Text style={styles.registerModalRestroName}>Add New Category</Text>
            <TextInput
              style={styles.registerModalInput}
              value={category.catName}
              onChangeText={(value) =>
                setCategory({ ...category, catName: value })
              }
              placeholder="Category Name"
            ></TextInput>
            <TextInput
              style={styles.registerModalInput}
              value={category.catDescp}
              onChangeText={(value) =>
                setCategory({ ...category, catDescp: value })
              }
              placeholder="Descrpition"
            ></TextInput>
            <View style={styles.registerModalButtons}>
              <TouchableOpacity style={styles.catImagerModalButton}>
                <Text
                  style={styles.registerModalButton1Txt}
                  onPress={() => pickImage()}
                >
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
                onPress={() => setShowRegister(!showRegister)}
                style={styles.registerModalButton2}
              >
                <Text style={styles.registerModalButton1Txt}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => addNewCategory()}
                style={styles.registerModalButton1}
              >
                <Text style={styles.registerModalButton1Txt}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.maincontainer}>
          <View style={styles.categoryContainer1}>
            <View style={styles.categoryContainer1TxtContainer}>
              <Text style={styles.categoryContainer1Txt}>Food Categories</Text>
              <TouchableOpacity onPress={() => setShowRegister(!showRegister)}>
                <Text style={styles.categoryContainer1Txt1}>
                  Add New Category +
                </Text>
              </TouchableOpacity>
            </View>

            <View>
              <FlatList
                data={categories}
                keyExtractor={(item) => item?._id}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => {
                  return (
                    <View style={styles.categoryContainer2}>
                      <Image
                        style={styles.categoryContainer2Img}
                        source={{
                          uri: item?.catImage
                            ? item?.catImage
                            : "https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg",
                        }}
                      />
                      <Text style={styles.categoryContainer2Txt}>
                        {item?.catName}
                      </Text>
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
    justifyContent: "center",
    alignItems: "center",

    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  picker: {
    borderRadius: 20,
    padding: 10,
    marginTop: 10,
    backgroundColor: "#F2F3F4",
  },
  maincontainer: {
    flex: 1,
    marginTop: 0,
  },
  registerModalmainContainer2: {
    height: "auto",
    width: "85%",
    backgroundColor: "white",
    // justifyContent: 'center',
    alignItems: "center",
    padding: 20,
    borderRadius: 20,
  },
  registerModalRestroName: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 10,
  },
  registerModalInput: {
    borderRadius: 5,
    width: "90%",
    color: "gray",
    fontSize: 12,
    padding: 8,
    margin: 10,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  registerModalInput2: {
    borderRadius: 5,
    width: "50%",
    color: "gray",
    fontSize: 12,
    padding: 8,
    margin: 10,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  registerModalInputOtp: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 10,
  },
  registerModalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 10,
    marginTop: 10,
  },
  catImagerModalButton: {
    color: "white",
    padding: 10,

    backgroundColor: Color.PRIME,
    borderRadius: 10,
  },
  registerModalButton1: {
    backgroundColor: Color.PRIME,
    color: "white",
    padding: 10,
    width: "45%",
    borderRadius: 10,
  },
  registerModalButton2: {
    backgroundColor: "#DE3163",
    padding: 10,
    borderRadius: 10,
    width: "45%",
  },
  registerModalButton1Txt: {
    color: "white",
    fontWeight: "700",
    textAlign: "center",
  },
  mainContainer: {
    flex: 1,
    marginTop: 0,
    backgroundColor: "white",
  },

  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    marginHorizontal: 20,
  },
  input: {
    borderRadius: 25,
    borderWidth: 1,
    width: "80%",
    color: "gray",
    fontSize: 15,
    padding: 8,
    paddingLeft: 20,
  },

  buttonQR: {},
  buttonQRtxt: {
    color: "white",

    fontWeight: "700",
  },
  categoryContainer1: {
    marginHorizontal: 20,
  },
  categoryContainer1TxtContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  categoryContainer1Txt: {
    fontWeight: "700",
    marginTop: 10,
  },
  categoryContainer1Txt1: {
    fontWeight: "600",
    marginTop: 10,
    color: Color.PRIME,
  },
  categoryContainer2: {
    justifyContent: "center",
    alignItems: "center",
  },
  categoryContainer2Img: {
    aspectRatio: 1,
    width: 66,
    borderRadius: 50,
  },
  categoryContainer2Txt: {
    color: "gray",
    fontSize: 12,
    marginLeft: 0,
  },
  offerImgContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  offerImg: {
    marginTop: 15,
    marginHorizontal: 10,
    aspectRatio: 2,
    width: "10%",
    height: 300,
    borderRadius: 17,
  },
  foodImgContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
    gap: 2,

    height: "100%",
  },
  foodName: {
    fontWeight: "600",
    marginTop: 10,
    marginLeft: 10,
  },
  foodImg: {
    width: "100%",
    height: 100,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  foodImginnerContainer: {
    backgroundColor: "white",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    height: "auto",
    width: "48%",
    marginTop: 10,
  },
  time: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    paddingHorizontal: 10,
  },
  timetxt: {
    color: "gray",
  },
  priceAdd: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  price: {
    fontWeight: "500",
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    display: "flex",
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    marginHorizontal: 20,
  },
  bottominnerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  bottomContainertxt1: {
    color: "white",
  },
  bottomContainertxt2: {
    color: "white",
    fontWeight: "600",
    fontSize: 20,
  },
  catimage: {
    aspectRatio: 1,
    width: 30,
    height: 30,
    borderRadius: 0,
  },
});
