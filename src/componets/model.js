import React, { useRef } from "react";
import { Modalize } from "react-native-modalize";

import { View, TouchableOpacity, Text, Button, Dimensions } from "react-native";

export default function Model({ modalizeRef, conteudo }) {
  const { height } = Dimensions.get("screen");
  console.log("ao vivo" + JSON.stringify(conteudo));
  //console.log(modalizeRef.current.open());
  console.log(modalizeRef.current);

  return (
    <Modalize ref={modalizeRef} modalHeight={height / 1.27}>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          marginTop: "50%",
        }}
      >
        <Text>Nome: {conteudo.nomeFantasia}</Text>
        <Text>vinculo com o sus:{conteudo.vinculoSus}</Text>
        <Text>
          tem atendimento em urgencia {conteudo.temAtendimentoUrgencia}
        </Text>
        <Text>tipo da unidade {conteudo.tipoUnidadeCnes}</Text>
        <Text>turno de atendimento {conteudo.turnoAtendimento}</Text>
        <View>
          <Text>endereco</Text>
          <Text>
            rua {conteudo.logradouro} número {conteudo.numero} bairro{" "}
            {conteudo.bairro} cidade {conteudo.cidade}{" "}
          </Text>
        </View>
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
