import React, { useEffect } from "react";
import { View, Text, ScrollView, StyleSheet, Dimensions } from "react-native";
import MapView, { Marker } from "react-native-maps";
const { width } = Dimensions.get("window");
//console.log("estao me");
export default function menu({ inf }) {
  // var inf = props;
  //console.log(`esta correto  ${inf.length == 0}`);
  console.log(`esta correto 2  ${inf}`);
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
          // console.log(`evento ${e.nativeEvent.contentOffset.x}`);

          const place =
            e.nativeEvent.contentOffset.x > 0
              ? Math.round(
                  e.nativeEvent.contentOffset.x / Dimensions.get("window").width
                )
              : 0;
          //  console.log(`place  ${place}`);

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
            <Text>{`Descricao: ${place.descricaoCompleta} \n`} </Text>
            <Text>{`Tipo da Unidade: ${place.tipoUnidade} `}</Text>
            {place.telefone != undefined ? (
              <Text>{`Telefone: ${place.telefone}`}</Text>
            ) : (
              <Text>{`não foi possivel acessar o Telefone`}</Text>
            )}
          </View>
        ))}
      </ScrollView>
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
