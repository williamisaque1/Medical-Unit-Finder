import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
const height = Dimensions.get("window").height;
export default function Home({ navigation }) {
  useEffect(() => {
    console.log(height);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar
        style="light"
        backgroundColor="black"
        translucent={false}
      ></StatusBar>
      <View style={styles.containerTitulo}>
        <Text style={styles.titulo}> Medical Unit Finder</Text>
        <TouchableOpacity
          style={styles.touch1}
          onPress={() => {
            navigation.navigate("app");
          }}
        >
          <Ionicons style={styles.icone1} name="map-outline"></Ionicons>
          <Text style={styles.textInicio}>inicio</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.touch2}>
          <Ionicons
            style={[styles.icone1, styles.icone2]}
            name="settings-outline"
          ></Ionicons>
          <Text style={styles.textInicio}>Configurações</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.containerRodape}>
        <Text style={styles.tituloRodape}>
          desenvolvido por: vitor correia e william isaque
        </Text>
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
    textShadowRadius: 8,
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
    fontSize: 16,
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
