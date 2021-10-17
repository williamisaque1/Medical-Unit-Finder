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

const { width } = Dimensions.get("window");
//console.log("estao me");

import Model from "./model";
import Ionicons from "react-native-vector-icons/Ionicons";
export default function menu({ inf }) {
  const modalizeRef = useRef(null);
  const [modal, setmodal] = useState(null);
  const [estado, setestado] = useState(false);
  // var inf = props;
  //console.log(`esta correto  ${inf.length == 0}`);
  // console.log(`esta correto 2  ${inf}`);
  //console.log(`esta esse conteudo  ${JSON.stringify(inf[0])}`);
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
        onMomentumScrollEnd={(e) => {
          const scroll = e.nativeEvent.contentOffset.x;
          //console.log(e.nativeEvent);
          console.log(`evento ${e.nativeEvent.contentOffset.x}`);

          const place =
            e.nativeEvent.contentOffset.x > 0
              ? Math.round(
                  e.nativeEvent.contentOffset.x / Dimensions.get("window").width
                )
              : 0;
          console.log(`place  ${place}`);

          const { lat, long } = inf[place];

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

          mapView.animateCamera(camera, { duration: 2500 });
        }}
      >
        {inf.map((place) => (
          // console.log(place),
          <View style={styles.place} key={place.codUnidade}>
            <Text>{` Nome: ${place.nomeFantasia} `}</Text>
            <Text numberOfLines={4} style={{ lineHeight: 19 }}>
              {`Descricao: ${place.descricaoCompleta} \n`}{" "}
            </Text>
            <Text>{`Tipo da Unidade: ${place.tipoUnidade} `}</Text>

            {place.telefone != undefined ? (
              <Text>{`Telefone: ${place.telefone}`}</Text>
            ) : (
              <Text>{`não foi possivel acessar o Telefone`}</Text>
            )}
            <Ionicons
              name="information-circle"
              size={30}
              style={{ flex: 1, justifyContent: "flex-end" }}
              onPress={async () => {
                // console.log(modalizeRef?.crurrent.open());
                await setmodal(place);

                modalizeRef.current?.open();
              }}
            ></Ionicons>
          </View>
        ))}
      </ScrollView>
      {modal && <Model modalizeRef={modalizeRef} conteudo={modal} />}
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
