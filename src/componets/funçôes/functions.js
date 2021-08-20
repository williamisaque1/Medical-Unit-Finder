import axios from "axios";
import React from "react";
import { Marker } from "react-native-maps";

export default class funcoes {
  static localizacaoAtual(origin) {
    console.log(
      ` ${origin} latitude ${origin.latitude} e longitude ${origin.longitude}`
    );
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
    console.log(
      ` ${valorUsr == ""}minha latitude ${
        origin.latitude
      } usuario digitou ${valorUsr}`
    );
    if (valorUsr !== "") {
      await axios
        .get(
          `http://mobile-aceite.tcu.gov.br/mapa-da-saude/rest/estabelecimentos/latitude/${origin.latitude}/longitude/${origin.longitude}/raio/10/?categoria=CLÍNICA`
        )
        //  "http://mobile-aceite.tcu.gov.br/mapa-da-saude/rest/estabelecimentos/?municipio=taubat%C3%A9"
        .then(function (response) {
          // console.log(response.data);
          console.log(`tamanho: ${response.data.length}`);

          for (let i = 0; i < response.data.length; i++) {
            // console.log(response.data[i].cnpj);
            console.log(
              `esta contido: ${response.data[i].descricaoCompleta
                .toLowerCase()
                .includes(valorUsr)}`
            );

            if (
              response.data[i].descricaoCompleta
                .toLowerCase()
                .includes(valorUsr)
            ) {
              marcardor.push(
                <Marker
                  onPress={() => {
                    console.log(
                      ` nome: ${response.data[i].nomeFantasia} latitude  ${response.data[i].lat}  longitude  ${response.data[i].long} `
                    );
                  }}
                  title={response.data[i].nomeFantasia}
                  key={response.data[i].codUnidade}
                  description={response.data[i].descricaoCompleta}
                  icon={{
                    uri: "https://img.icons8.com/emoji/48/000000/hospital-emoji.png",
                  }}
                  coordinate={{
                    latitude: response.data[i].lat,
                    longitude: response.data[i].long,
                  }}
                ></Marker>
              );
              dados.push(response.data[i]);
            }
          }
          return (obj = { marcardor: marcardor, dados: dados });
          console.log(
            `\n dados estao  aki${JSON.stringify(response.data[0].codCnes)}`
          );

          console.log("||" + "||");
        })
        .catch(function (error) {
          throw "erro de internet";
        });
      return (obj = { marcardor: marcardor, dados: dados });
      /*} else {
      console.log("passou aqui");
      //dados.push(null);
     */ return (obj = { marcardor: marcardor, dados: dados });
    } else {
      throw "coloque uma especialidade";
    }
  }
}
