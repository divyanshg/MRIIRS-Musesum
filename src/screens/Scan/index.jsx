import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button, Image } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useNavigation } from "@react-navigation/native";
import { SharedElement } from "react-navigation-shared-element";
import tw from "twrnc";
import ConfettiCannon from "react-native-confetti-cannon";
import sanityClient from "../../sanity";
import imageUrlBuilder from "@sanity/image-url";

import { useSelector, useDispatch } from "react-redux";
import { updateItem, enableScanner } from "../../redux/dataAction";

const builder = imageUrlBuilder(sanityClient);
function urlFor(source) {
  return builder.image(source);
}

export default function ScanScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [hasPermission, setHasPermission] = useState(null);
  const [scannedItem, setScannedItem] = useState(null);

  const { enableScanner: scannerEnabled } = useSelector((state) => state);
  const [scanned, setScanned] = useState(!scannerEnabled);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  useEffect(() => {
    setScanned(!scannerEnabled);
  }, [scannerEnabled]);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    let s = data.split(":");
    if (s[0] !== "mriirs") return;

    let slug = s[1];

    sanityClient
      .fetch(
        `*[slug.current == $slug]{
          slug,
          name,
          description,
          history,
          images,
          colorclass
        }
    `,
        {
          slug: slug,
        }
      )
      .then((data) => {
        setScannedItem(data[0]);
        dispatch(updateItem(data[0]));
        dispatch(enableScanner(false));
        setTimeout(() => {
          navigation.navigate("Details", { data: data[0] });
        }, 4000);
      })
      .catch(console.error);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={tw`w-full bg-white pt-12 pb-6 flex flex-col`}>
        <Image
          source={{
            uri: "https://manavrachna.edu.in/wp-content/uploads/2022/09/newmrlogo-scaled.jpg",
          }}
          style={styles.logo}
        />
        <Text>
          Scan the QR against an item to get its information
        </Text>
      </View>
      {scannerEnabled && (
        <View style={styles.imageContainer}>
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
          />
          <View style={tw`items-center`}>
            <View style={styles.region} />
            <Text style={tw`my-4 text-xl font-semibold text-white`}>
              {scanned
                ? "Tap to Scan Again"
                : "Place the QR code inside the box"}
            </Text>
          </View>
        </View>
      )}
      {scanned && scannedItem && !scannerEnabled && (
        <View
          style={tw`flex-1 items-center justify-center h-full w-full bg-white`}
        >
          <ConfettiCannon count={200} origin={{ x: -10, y: 0 }} />
          <View style={tw`flex items-center`}>
            <SharedElement id={`item.image`} style={styles.itemImage}>
              <Image
                source={{
                  uri: urlFor(scannedItem?.images[0]).url(),
                }}
                resizeMode="contain"
                style={[tw`w-[300px] h-[200px]`]}
              />
            </SharedElement>
            <Text style={tw`text-4xl font-semibold mt-4`}>
              {scannedItem?.name}
            </Text>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "black",
  },
  logo: {
    width: 200,
    height: 70,
    marginTop: 10,
    alignSelf: "center",
    contentMode: "contain",
    borderRadius: 10,
    objectFit: "contain",
    backgroundSize: "contain",
  },
  imageContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  region: {
    height: 250,
    width: 250,
    borderColor: "white",
    borderWidth: 4,
    alignSelf: "center",
    borderRadius: 10,
    borderStyle: "dashed",
  },
  itemImage: {
    alignSelf: "center",
  },
  //full screen camera
  camera: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
});
