import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Dimensions,
  TextInput,
  Alert,
  Vibration,
} from "react-native";
import * as Location from "expo-location";
import MapView from "react-native-maps";
import Ionicons from "react-native-vector-icons/Ionicons";
import funcoes from "../componets/funçôes/functions";
import Menu from "../componets/menu";
const { width } = Dimensions.get("window");
export default function App() {
  const [origin, setOrigin] = useState(null);
  const [unidades, setUnidades] = useState([]);
  const [valorUsr, setvalorUsr] = useState("");
  const [detalhes, setDetalhes] = useState([]);
  const [active, setActive] = useState(false);
  const [save, setSave] = useState(<View></View>);
  const input = useRef();
  var v = "ola";
  useEffect(() => {
    (async function permisao() {
      let { status } = await Location.requestForegroundPermissionsAsync();
      console.log(status);
      try {
        if (status === "granted") {
          await Location.watchPositionAsync({}, (results) => {
            const { latitude, longitude } = results.coords;
            console.log(latitude + "  " + longitude + "|");
            setOrigin({
              latitude: latitude,
              longitude: longitude,
              latitudeDelta: 0.0042,
              longitudeDelta: 0.00203,
            });
          });

          /* console.log(
            "localiza",
            await Location.geocodeAsync(
              "Tancredo Gomes Toledo, Jardim Sandra Maria 30"
            )
          );*/
          //https://mobile-aceite.tcu.gov.br/mapa-da-saude/rest/estabelecimentos/latitude/-23.0102177/longitude/-45.5560553/raio/
        } else {
          Alert.alert(
            "Atenção",
            "permita o aplicativo acessar a sua localização ",
            [
              {
                onPress: () => permisao(),
              },
            ]
          );
        }
      } catch (e) {
        console.log("erro" + e);

        Alert.alert(
          "falha na Geolocation ",
          "sua posição não foi detectada verifique se a sua localização esta ativada",
          [{ text: "OK", onPress: () => permisao() }]
        );
      }
    })();
  }, []);

  useEffect(() => {
    if (detalhes?.length !== 0 && unidades?.length !== 0) {
      setSave(<Menu inf={detalhes}></Menu>);
      (async () => {
        if (detalhes !== null) {
          console.log("detalhamento", detalhes.length);
          // console.log(await funcoes.verificacaoDeCordenadas(detalhes));
        }
      })();
    }
    if (detalhes?.length == 0 && active == true) {
      setSave(null);
      Alert.alert("Atenção", "especialidade não encontrada");
      console.log("chegou aqui");
      Vibration.vibrate(300);
      input.current.clear();
      setvalorUsr("");
    }
  }, [detalhes]);

  return (
    <View style={styles.container}>
      <StatusBar style="light" backgroundColor="black" translucent={false}>
        {" "}
      </StatusBar>
      <MapView
        ref={(map) => (mapView = map)}
        initialRegion={origin}
        style={styles.MapView}
        rotateEnabled={true}
        scrollEnabled={true}
        zoomEnabled={true}
        showsPointsOfInterest={false}
        showsBuildings={false}
        showsUserLocation={true}
        loadingEnabled={true}
        showsMyLocationButton={false}
      >
        {unidades != null && unidades}
      </MapView>

      <View style={styles.descricao}></View>
      {active == false && detalhes != null ? (
        save
      ) : (
        <ActivityIndicator
          style={styles.loading}
          size="large"
          color="red"
          animating={active}
        ></ActivityIndicator>
      )}
      <View style={styles.seachbox}>
        <Ionicons
          name="ios-search"
          onPress={async () => {
            setActive(true);
            try {
              setUnidades(
                (await funcoes.marcadores(valorUsr, origin)).marcardor
              );
              setDetalhes((await funcoes.marcadores(valorUsr, origin)).dados);
              setActive(false);
            } catch (error) {
              setDetalhes(null);
              setUnidades(null);
              Alert.alert("Atenção", error);
              setActive(false);
              Vibration.vibrate(300);
              console.log(error);
            }
          }}
          size={25}
        >
          {" "}
        </Ionicons>
        <TextInput
          ref={input}
          placeholder="search here"
          placeholderTextColor="#008"
          autoCapitalize="none"
          style={{ flex: 1, padding: 0 }}
          onChangeText={(val) => {
            //  console.log(val + "" + valorUsr);
            setvalorUsr(val);
          }}
        >
          {" "}
        </TextInput>
        <Text>Teste: {valorUsr}</Text>
      </View>
      <View style={styles.viewIcone}>
        <Ionicons
          onPress={() => {
            funcoes.localizacaoAtual(origin);
            /* console.log(
                `valor do active 1  ${active} tamanho do lenght ${detalhes.length}`
              );*/
          }}
          style={styles.icone}
          size={50}
          name="navigate-sharp"
        ></Ionicons>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapStyle: {
    width: Dimensions.get("window").width,
    height: "100%",
  },
  MapView: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 0,
  },
  placesCointainer: {
    width: "100%",
    maxHeight: 200,
    //  alignItems:'flex-end',
    //justifyContent:'flex-end',
  },
  place: {
    width: width - 40,
    maxHeight: 200,
    backgroundColor: "#FFF",
    marginHorizontal: 20,
  },
  seachbox: {
    position: "absolute",
    marginTop: Platform.OS === "ios" ? 40 : 10,
    flexDirection: "row",
    backgroundColor: "#fff",
    width: "80%",
    marginLeft: 10,
    marginRight: 60,
    alignSelf: "flex-start",
    borderRadius: 5,
    padding: 10,
    shadowColor: "#ccc",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 20,
  },
  descricao: {
    marginTop: 10,
    marginHorizontal: 0,
    width: "80%",
    height: 48,
    marginLeft: 10,
    paddingBottom: 5,
    borderRadius: 5,
  },
  viewIcone: {
    position: "absolute",
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    marginLeft: "85%",
    marginRight: 5,
    marginTop: 10,
  },
  icone: {
    fontSize: 35,
    width: 50,
    height: 50,
    paddingHorizontal: 5,
    paddingVertical: 10,

    borderRadius: 50,
    backgroundColor: "black",
    color: "red",
  },
  loading: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
    //backgroundColor: "blue",
    marginBottom: "35%",
  },
});
