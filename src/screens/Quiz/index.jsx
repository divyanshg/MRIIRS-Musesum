import { View, Text, Image, Pressable, TouchableHighlight } from "react-native";
import React from "react";
import tw from "twrnc";

import { useSelector } from "react-redux";

const QuizScreen = () => {
  const { item: currentItem } = useSelector((state) => state);
  return (
    <View style={tw`flex-1 relative items-center justify-center bg-indigo-900`}>
      <Image
        source={require("../../assets/sammy-line-bubbles.png")}
        style={tw`w-full h-1/2 opacity-20 absolute top-0`}
        resizeMode="contain"
      />
      <View>
        <Text style={tw`text-2xl text-center text-white font-bold mb-2`}>
          Quiz On
        </Text>
        <Text style={tw`text-2xl text-center text-white font-bold`}>
          {currentItem?.name}
        </Text>
      </View>
      <View
        style={tw`absolute bottom-40 w-full flex-1 items-center justify-center px-6`}
      >
        <TouchableHighlight
          style={tw`
            bg-purple-700 px-4 py-3 rounded-2xl mt-4 w-full
            border border-purple-500
        `}
        >
          <Text style={tw`text-2xl text-center text-white font-bold`}>
            Start Now
          </Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};

export default QuizScreen;
