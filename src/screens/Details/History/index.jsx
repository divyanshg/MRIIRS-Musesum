import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import tw from "twrnc";
import sanityClient from "../../../sanity/";
import { FlatList } from "react-native-gesture-handler";
import { useSelector, useDispatch } from "react-redux";

const History = ({ route }) => {
  let item = useSelector((state) => state.item);
  return (
    <ScrollView
      style={tw`flex-1 bg-white max-h-[400px]`}
      contentContainerStyle={{
        flexGrow: 1,
      }}
    >
      <Text style={tw`leading-5 font-semibold`}>{item?.history}</Text>
      <View style={tw`mt-32`} />
    </ScrollView>
  );
};

export default History;
