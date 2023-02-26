import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  StatusBar,
} from "react-native";
import { SharedElement } from "react-navigation-shared-element";
import { useEffect, useState } from "react";
import tw from "twrnc";
import { useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import sanityClient from "../../sanity";
import imageUrlBuilder from "@sanity/image-url";

import { useDispatch } from "react-redux";
import { enableScanner } from "../../redux/dataAction";

const builder = imageUrlBuilder(sanityClient);
function urlFor(source) {
  return builder.image(source);
}

import { Ionicons } from "@expo/vector-icons";

import About from "./About";
import History from "./History";
import Images from "./Images";

const Stack = createStackNavigator();

let tabs = [
  {
    name: "About",
    isSelected: true,
  },
  {
    name: "History",
    isSelected: false,
  },
  {
    name: "Images",
    isSelected: false,
  },
  // {
  //   name: "Quiz",
  //   isSelected: false,
  // },
];

const DetailsScreen = ({ route }) => {
  const dispatch = useDispatch();
  const [content, setContent] = useState(route.params.data);
  const { navigate, goBack } = useNavigation();

  const handleOnPress = (name, data) => {
    tabs = tabs.map((tabs) => {
      if (tabs.name === name) {
        tabs.isSelected = true;
      } else {
        tabs.isSelected = false;
      }
      return tabs;
    });
    navigate(name, {
      data,
    });
  };

  const handleCamPress = () => {
    dispatch(enableScanner(true));
    goBack();
  };

  return (
    <View style={tw`flex-1 items-center bg-white`}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={tw`${content?.colorclass}`.backgroundColor}
      />
      <View
        style={{ ...styles.bg, ...tw`h-[250px] ${content?.colorclass} w-full` }}
      />
      <Image
        source={{
          uri: "https://manavrachna.edu.in/wp-content/uploads/2022/09/newmrlogo-scaled.jpg",
        }}
        style={styles.logo}
      />
      <SharedElement id={`item.image`} style={tw`absolute top-[140px] z-5`}>
        <Image
          source={{
            uri: urlFor(content?.images[0]).url(),
          }}
          resizeMode="contain"
          style={tw`w-[200px] h-[200px] rounded-3xl`}
        />
      </SharedElement>
      <View style={tw`pt-18 w-full h-full bg-white`}>
        <View style={tw`flex justify-between w-full px-6 py-4`}>
          <Text style={tw`text-4xl font-semibold`}>{content?.name}</Text>
        </View>
        <View style={tw`w-full h-full px-6`}>
          <FlatList
            horizontal
            style={tw`mb-4 max-h-[40px]`}
            data={tabs}
            keyExtractor={(item) => item.name}
            renderItem={({ item: screen }) => (
              <TouchableOpacity
                style={tw`rounded-full border border-gray-200 p-2 px-4 h-[40px] mr-2 ${
                  screen.isSelected
                    ? "bg-yellow-400 border-yellow-400"
                    : "bg-white"
                }`}
                onPress={() => handleOnPress(screen.name, content)}
              >
                <Text>{screen.name}</Text>
              </TouchableOpacity>
            )}
          />
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="About" component={About} />
            <Stack.Screen name="History" component={History} />
            <Stack.Screen name="Images" component={Images} />
          </Stack.Navigator>
        </View>
      </View>
      <TouchableOpacity
        style={tw`absolute bottom-6 shadow rounded-full bg-black p-2 h-[60px] w-[60px] flex items-center justify-center z-10`}
        onPress={handleCamPress}
      >
        <Ionicons name="scan" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

DetailsScreen.sharedElements = (route, otherRoute, showing) => {
  return [`item.image`];
};

const styles = StyleSheet.create({
  bg: {
    transform: [{ scaleX: 2 }],
    borderBottomStartRadius: 200,
    borderBottomEndRadius: 200,
  },
  logo: {
    width: 200,
    height: 70,
    alignSelf: "center",
    contentMode: "contain",
    borderRadius: 10,
    objectFit: "contain",
    backgroundSize: "contain",
    position: "absolute",
    top: 50,
  },
});
export default DetailsScreen;
