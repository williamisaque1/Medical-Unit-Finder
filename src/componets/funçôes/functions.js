//import Apps from '../../src/componets/index.js';
import axios from "axios";
import React, { useRef } from "react";
import { Marker } from "react-native-maps";
import * as Location from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";

var data;
export default class funcoes {
  static localizacaoAtual(origin) {
    /*   console.log(
      ` ${origin} latitude ${origin.latitude} e longitude ${origin.longitude}`
    );*/
    let region = {
      latitude: origin.latitude,
      longitude: origin.longitude,
      latitudeDelta: origin.latitudeDelta,
      longitudeDelta: origin.longitudeDelta,
    };
    let camera = {
      center: region,
      pitch: 2,
      heading: 100,
      altitude: 100,
      zoom: 19,
    };

    mapView.animateCamera(camera, { duration: 2500 });
  }

  static async marcadores(valorUsr, origin) {
    const marcardor = [];
    var dados = [];
    var obj = {};
    let model;
    console.log(
      ` ${valorUsr == ""}minha latitude ${
        origin.latitude
      } usuario digitou ${valorUsr}`
    );
    if (valorUsr !== "") {
      console.log(await AsyncStorage.getItem("km"));
      console.log("lati" + origin.latitude + "log" + origin.longitude);
      let km;
      if ((await AsyncStorage.getItem("km")) == null) {
        km = 2;
      } else {
        km = await AsyncStorage.getItem("km");
      }

      await axios
        .post(
          "https://back-end-medical-unit-finder.herokuapp.com/cordenadas",
          //"http://192.168.0.17:8000/cordenadas",
          {
            origin,
            km,
          }
        )
        .then(function (response) {
          console.log(`tamanho: ${response.data.length}`);
          // console.log("dados" + response.data);
          //  "http://mobile-aceite.tcu.gov.br/mapa-da-saude/rest/estabelecimentos/?municipio=taubat%C3%A9"

          for (let i = 0; i < response.data.length; i++) {
            if (
              response.data[i].descricaoCompleta
                .toLowerCase()
                .includes(valorUsr)
            ) {
              //  console.log(response.data[i]);
              dados.push(response.data[i]);
            }
          }
        })
        .catch(function (error) {
          throw `erro de internet ${error}`;
        });

      for (const index of dados) {
        marcardor.push(
          <Marker
            onPress={() => {
              //console.log(<Model conteudo={index}> </Model>);
              //  data = index;
              //this.selecionado();
              console.log(
                `${index} nome: ${index.nomeFantasia} latitude  ${index.lat}  longitude  ${index.long} `
              );
            }}
            title={index.nomeFantasia}
            key={index.codUnidade}
            description={index.descricaoCompleta}
            icon={{
              uri: "https://img.icons8.com/emoji/48/000000/hospital-emoji.png",
            }}
            coordinate={{
              latitude: index.lat,
              longitude: index.long,
            }}
          ></Marker>
        );
      }
      console.log("marcador " + marcardor.length);
      return (obj = { marcardor: marcardor, dados: dados });
    } else {
      throw "coloque uma especialidade ";
    }
  }
  /* static selecionado() {
    console.log("dadoss" + JSON.stringify(data));
    return data;
  }*/
}
