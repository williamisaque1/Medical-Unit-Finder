import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  Animated,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const height = Dimensions.get("window").height;
import config from "../../config.js";
export default function Home({ navigation }) {
  // console.log(config);
  const [margin, setMargin] = useState(new Animated.Value(-55));
  const [size, setSize] = useState(new Animated.Value(0));
  useEffect(() => {
    //const Ani = Animated.createAnimatedComponent(Text);
    Animated.sequence([
      Animated.timing(size, {
        toValue: 16,
        duration: 1500,
        useNativeDriver: false,
      }),
      Animated.spring(margin, {
        toValue: 60,

        bounciness: 35,

        useNativeDriver: false,
      }),
    ]).start();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar
        style="light"
        backgroundColor="black"
        translucent={false}
      ></StatusBar>
      <Animated.Text
        Animation="tada"
        useNativeDriver
        iterantionCount={Infinity}
        style={[styles.titulo, { marginTop: margin }]}
      >
        {" "}
        Medical Unit Finder
      </Animated.Text>
      <View style={styles.containerTitulo}>
        <TouchableOpacity
          style={styles.touch1}
          onPress={() => {
            navigation.navigate("app");
          }}
        >
          <Ionicons style={styles.icone1} name="map-outline"></Ionicons>
          <Text style={styles.textInicio}>inicio</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.touch2}
          onPress={() => {
            navigation.navigate("configuracoes");
          }}
        >
          <Ionicons
            style={[styles.icone1, styles.icone2]}
            name="settings-outline"
          ></Ionicons>
          <Text style={styles.textInicio}>Configurações</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.containerRodape}>
        <Animated.Text style={[styles.tituloRodape, { fontSize: size }]}>
          desenvolvido por: vitor correia e william isaque
        </Animated.Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    flex: 1,
  },
  titulo: {
    color: "white",
    fontSize: 36,
    fontWeight: "bold",
    textShadowColor: "red",
    textShadowOffset: { width: 10, height: 10 },
    position: "absolute",
    textShadowRadius: 8,
    //marginTop: this.margin,
    // backgroundColor: "red",
    alignSelf: "center",
  },

  containerTitulo: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: (height * 10) / 100,

    //  backgroundColor: "red",
  },
  containerRodape: {
    alignItems: "center",

    justifyContent: "center",
    position: "relative",
    // backgroundColor: "blue",
    marginTop: (height * 10) / 100,
    borderRadius: 10,
    marginHorizontal: 15,
  },
  tituloRodape: {
    color: "white",
    paddingBottom: 15,
    //textDecorationLine: "underline",
    //backgroundColor: "blue",
    textShadowColor: "red",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
    textDecorationStyle: "solid",
  },
  icone1: {
    fontSize: 50,
    color: "white",
    marginTop: "70%",
  },
  textInicio: {
    color: "white",
    fontSize: 20,
    fontStyle: "italic",
    fontWeight: "bold",
  },
  icone2: {
    fontSize: 50,
    color: "white",
    marginTop: 10,
  },
  touch1: {
    marginBottom: 35,
  },
  touch2: {
    alignItems: "center",
  },
});
