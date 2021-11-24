import React, { useRef } from "react";
import { Modalize } from "react-native-modalize";

import {
  View,
  TouchableOpacity,
  Text,
  Button,
  Dimensions,
  StyleSheet,
} from "react-native";
const { height, width } = Dimensions.get("screen");
export default function Model({ modalizeRef, conteudo }) {
  console.log("ao vivo" + JSON.stringify(conteudo));
  //console.log(modalizeRef.current.open());
  console.log(modalizeRef.current);

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
          marginTop: "50%",
        }}
      >
        {conteudo.nomeFantasia.length > 40 ? (
          <Text style={[{ marginLeft: 10, marginRight: 10 }, styles.TextoNome]}>
            {conteudo.nomeFantasia}
          </Text>
        ) : (
          <Text style={styles.TextoNome}> {conteudo.nomeFantasia}</Text>
        )}
        <Text style={styles.TextoSus}>
          vinculo com o sus:{conteudo.vinculoSus}
        </Text>
        <Text style={styles.TextoUrgencia}>
          tem atendimento em urgencia {conteudo.temAtendimentoUrgencia}
        </Text>
        <Text style={styles.TextoTipoUnidade}>
          tipo da unidade {conteudo.tipoUnidadeCnes}
        </Text>
        <Text style={styles.TextoTurno}>
          turno de atendimento {conteudo.turnoAtendimento}
        </Text>
        <View>
          <Text style={styles.Titulos}>endereco</Text>
          <Text style={styles.Enderecos}>
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
const styles = StyleSheet.create({
  modal: {
    backgroundColor: "white",
  },
  TextoNome: {
    color: "red",
    textShadowOffset: { width: 4, height: 0 },
    textShadowColor: "black",
    fontWeight: "bold",
    fontSize: 22,
    textShadowRadius: 4,
    top: (width * -40) / 100,
    flexWrap: "nowrap",
    //marginLeft: "3%",
    borderBottomWidth: 1,
  },
  overlay: { backgroundColor: "red" },
  handle: {
    width: (width * 30) / 100,
    backgroundColor: "black",
  },
});
