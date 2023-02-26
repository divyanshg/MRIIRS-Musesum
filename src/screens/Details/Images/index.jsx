import { View, Text, Image } from "react-native";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import tw from "twrnc";
import sanityClient from "../../../sanity";

import imageUrlBuilder from "@sanity/image-url";
import { ScrollView } from "react-native-gesture-handler";

const builder = imageUrlBuilder(sanityClient);
function urlFor(source) {
  return builder.image(source);
}

const Images = () => {
  let { images } = useSelector((state) => state.item);

  return (
    <ScrollView
      style={tw`bg-white flex-1 max-h-[400px]`}
      contentContainerStyle={{
        flexGrow: 1,
      }}
    >
      {images?.map((image, index) => {
        return (
          <View
            key={index}
            style={tw`flex items-center justify-center rounded-lg`}
          >
            <Image
              source={{ uri: urlFor(image).url() }}
              style={tw`w-60 h-60`}
              resizeMode="contain"
            />
          </View>
        );
      })}
      <View style={tw`mt-32`} />
    </ScrollView>
  );
};

export default Images;
