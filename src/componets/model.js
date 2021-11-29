import React, { useRef, useState } from "react";
import { Modalize } from "react-native-modalize";
import axios from "axios";
import {
  View,
  TouchableOpacity,
  Text,
  Dimensions,
  StyleSheet,
  Image,
  Button,
} from "react-native";
import { setEnabled } from "react-native/Libraries/Performance/Systrace";
const { height, width } = Dimensions.get("screen");

export default function Model({
  modalizeRef,
  conteudo,
  detalhamento,
  setdetalhamento,
}) {
  // console.log("ao vivo" + JSON.stringify(conteudo));
  //console.log(modalizeRef.current.open());
  // console.log(modalizeRef.current);
  console.log("place iddd", conteudo.places_id);
  console.log(
    "telefone :",
    detalhamento?.detalhes?.result.formatted_phone_number
  );

  return (
    <Modalize
      ref={modalizeRef}
      modalHeight={height / 1.27}
      modalStyle={styles.modal}
      overlayStyle={styles.overlay}
      handleStyle={styles.handle}
      openAnimationConfig={{
        timing: { duration: 400 },
        spring: { speed: 20, bounciness: 10 },
      }}
      closeAnimationConfig={{
        timing: { duration: 1 },
        spring: { speed: 10000, bounciness: 1 },
      }}
    >
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "grey",
          height: 680,
        }}
      >
        {conteudo.nomeFantasia.length > 40 ? (
          <Text
            style={[
              {
                marginLeft: 10,
                marginRight: 10,
                fontSize: 15,
                paddingTop: "9%",
              },
              styles.TextoNome,
            ]}
          >
            {conteudo.nomeFantasia}
          </Text>
        ) : (
          <Text
            style={[
              {
                marginLeft: 10,
                marginRight: 10,
                fontSize: 20,
                paddingTop: "9%",
              },
              styles.TextoNome,
            ]}
          >
            {" "}
            {conteudo.nomeFantasia}
          </Text>
        )}

        {console.log("tipo", typeof detalhamento)}
        <Text style={{ top: "6%", fontWeight: "bold", marginTop: 5 }}>
          {" "}
          Telefone{" "}
        </Text>
        {typeof detalhamento == "object" ? (
          <Text style={[styles.telefone, { color: "black", fontSize: 13 }]}>
            {detalhamento?.detalhes?.result.formatted_phone_number}
          </Text>
        ) : (
          <Text
            style={[
              styles.telefone,
              { color: "red", fontSize: 16, fontWeight: "bold" },
            ]}
          >
            {detalhamento}
          </Text>
        )}

        <Text style={{ top: "14%", fontWeight: "bold" }}>
          horário de atendimento
        </Text>
        {detalhamento?.detalhes?.result?.opening_hours?.weekday_text !=
        undefined ? (
          typeof detalhamento == "object" ? (
            <Text style={{ top: "14%" }}>
              {` ${detalhamento.detalhes.result.opening_hours?.weekday_text[0]}\n ${detalhamento?.detalhes?.result.opening_hours?.weekday_text[1]}\n ${detalhamento?.detalhes?.result?.opening_hours?.weekday_text[2]}\n ${detalhamento?.detalhes?.result?.opening_hours?.weekday_text[3]}\n ${detalhamento?.detalhes?.result?.opening_hours?.weekday_text[4]}\n ${detalhamento?.detalhes?.result.opening_hours?.weekday_text[5]}\n ${detalhamento?.detalhes?.result?.opening_hours?.weekday_text[6]}`}
            </Text>
          ) : (
            <Text>{detalhamento}</Text>
          )
        ) : (
          <Text style={{ top: "14%", marginBottom: "7%" }}>indisponivel</Text>
        )}
        <View>
          <Text style={[styles.Titulos, { alignSelf: "center", marginTop: 2 }]}>
            endereco
          </Text>
          {conteudo.rua != "erro" ? (
            <Text style={styles.Enderecos}>
              {conteudo.rua} número {conteudo.numero} bairro {conteudo.bairro}{" "}
              cidade {conteudo.cidade}
            </Text>
          ) : (
            <Text style={{ top: "150%", textAlign: "center" }}>
              {conteudo.endereco}
            </Text>
          )}
        </View>
        {conteudo.urlFoto != "erro" ? (
          <Image
            source={{
              uri: `https://maps.googleapis.com/maps/api/place/photo?photoreference=${conteudo.urlFoto}&sensor=false&maxheight=300&maxwidth=300&key=AIzaSyCf8mZ0zWbVEszclobulVqhd-BAjGLBEiM`,
            }}
            style={{
              width: "95%",
              height: "35%",
              marginTop: "27%",
              marginBottom: "1%",
            }}
          />
        ) : (
          <Image
            source={require("../Images/semImagem.jpg")}
            style={{
              width: "95%",
              height: "35%",
              marginTop: "32%",
              marginBottom: "1%",
            }}
          />
        )}
        <Button
          title="sair"
          onPress={() => {
            console.log("fechado ");

            modalizeRef.current?.close();
          }}
        ></Button>
      </View>
    </Modalize>
  );
}
const styles = StyleSheet.create({
  modal: {
    backgroundColor: "white",
  },
  TextoNome: {
    color: "red",
    textShadowOffset: { width: 4, height: 0 },
    textShadowColor: "black",
    fontWeight: "bold",

    textShadowRadius: 4,
    top: (width * -8) / 100,
    flexWrap: "nowrap",
    //marginLeft: "3%",
    borderBottomWidth: 1,
    position: "absolute",
  },
  overlay: { backgroundColor: "red" },
  handle: {
    width: (width * 30) / 100,
    backgroundColor: "black",
  },
  Titulos: {
    fontSize: 15,
    fontWeight: "bold",
    top: "150%",
    paddingLeft: "5%",
    paddingRight: "5%",
  },
  Enderecos: {
    fontSize: 14,
    fontWeight: "700",
    top: "160%",
    paddingLeft: "5%",
    paddingRight: "5%",
  },
  telefone: {
    marginTop: "-8%",
    top: "12%",
    color: "black",
    fontSize: 15,
  },
});
