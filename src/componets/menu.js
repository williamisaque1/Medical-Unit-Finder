import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  Button,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import axios from "axios";
const { width } = Dimensions.get("window");
//console.log("estao me");

import Model from "./model";
import Ionicons from "react-native-vector-icons/Ionicons";
import MapViewDirections from "react-native-maps-directions";
export default function menu({ inf }) {
  const modalizeRef = useRef(null);
  const [modal, setmodal] = useState(null);
  const [estado, setestado] = useState(false);
  const [place, setplace] = useState(0);

  const [telefone, setTelefone] = useState(0);

  // var inf = props;
  //console.log(`esta correto  ${inf.length == 0}`);
  // console.log(`esta correto 2  ${inf}`);
  //console.log(`esta esse conteudo  ${JSON.stringify(inf[0])}`);
  if (place == 0) {
    console.log("hhdddd");
    const { lat, long } = inf[0];

    let region = {
      latitude: lat,
      longitude: long,
      latitudeDelta: 0.0042,
      longitudeDelta: 0.00203,
    };
    let camera = {
      center: region,
      pitch: 2,
      heading: 100,
      altitude: 100,
      zoom: 19,
    };
    setplace(1);
    mapView.animateCamera(camera, { duration: 2500 });
  }
  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.placesCointainer}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        onScrollEndDrag={() => {
          console.log("fui ativado");
        }}
        onMomentumScrollEnd={async (e) => {
          const scroll = e.nativeEvent.contentOffset.x;
          //console.log(e.nativeEvent);
          console.log(`evento ${e.nativeEvent.contentOffset.x}`);
          console.log(
            `place  ${place} conta: ${Math.round(
              e.nativeEvent.contentOffset.x / Dimensions.get("window").width
            )}`
          );

          const { lat, long } =
            inf[Math.round(scroll / Dimensions.get("window").width)];

          let region = {
            latitude: lat,
            longitude: long,
            latitudeDelta: 0.0042,
            longitudeDelta: 0.00203,
          };
          let camera = {
            center: region,
            pitch: 2,
            heading: 100,
            altitude: 100,
            zoom: 19,
          };
          <MapViewDirections
            origin={{ latitude: -23.0211155, longitude: -45.5545315 }}
            destination={{
              latitude: -23.0211155,
              longitude: -45.5545315,
            }}
            strokeWidth={3}
            strokeColor={"red"}
            onReady={(result) =>
              console.log("cordenadas utimate", (result?.distance).toFixed(2))
            }
            apikey={"AIzaSyCf8mZ0zWbVEszclobulVqhd-BAjGLBEiM"}
          />;
          mapView.animateCamera(camera, { duration: 2500 });
        }}
      >
        {inf.map((place) => (
          // console.log(place),
          <View style={styles.place} key={place.nomeFantasia}>
            <Text
              style={{ fontWeight: "bold", fontSize: 15, marginLeft: 5 }}
            >{` Nome: ${place.nomeFantasia} `}</Text>

            <Text
              numberOfLines={4}
              style={{
                lineHeight: 19,
                fontWeight: "bold",
                fontSize: 15,
                marginLeft: 5,
              }}
            >
              {`${
                place.horarioFuncionamento != "erro"
                  ? place.horarioFuncionamento == true
                    ? " horario de funcionamento: aberto"
                    : " horario de funcionamento : fechado"
                  : ""
              } \n`}{" "}
            </Text>

            <Ionicons
              name="information-circle"
              size={40}
              style={{
                flex: 1,

                alignSelf: "flex-end",

                position: "absolute",
                top: 150,
                right: "2%",
              }}
              onPress={async () => {
                console.log(place.nomeFantasia);
                await setmodal(place);
                (async function detalhamento() {
                  console.log("sss", place.nomeFantasia);
                  setTelefone(
                    (
                      await axios.post(
                        "http://192.168.0.17:8000/detalhamento",
                        {
                          places_id: place.places_id,
                        }
                      )
                    ).data
                  );

                  console.log(
                    "gggg",
                    telefone?.detalhes?.result?.opening_hours?.weekday_text
                  );
                })();

                modalizeRef.current?.open();
                await setTelefone(
                  "buscando informaçôes importantes aguarde..."
                );
              }}
            ></Ionicons>
          </View>
        ))}
      </ScrollView>
      {modal && (
        <Model
          modalizeRef={modalizeRef}
          conteudo={modal}
          detalhamento={telefone}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: "black",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    marginBottom: 30,
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
  descricao: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "flex-end",
    paddingBottom: 5,
  },
});
