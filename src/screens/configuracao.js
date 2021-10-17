import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";

//setmodal(place);
//modalizeRef.current?.open();
export default function Configuracoes() {
  const [kms, setKms] = useState([2, 4, 6, 8, 10]);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["rgba(0,0,0,0.3)", "rgba(0,0,0,0.6)", "rgba(0,0,0,0.9)"]}
        end={{ x: 0.2, y: 0.9 }}
        style={{ flex: 1 }}
      >
        <Text style={styles.textoInformativo}> km do raio de busca </Text>

        <View style={styles.viewPicker}>
          <Picker
            mode={"dropdown"}
            dropdownIconColor={"white"}
            selectedValue={kms}
            style={styles.picker}
            onValueChange={async (itemValue, itemIndex) => {
              try {
                await AsyncStorage.setItem("km", itemValue);

                const recuperaValor = await AsyncStorage.getItem("km");

                alert(
                  "preferência do usuário salvo com sucesso !!!  " +
                    decodeURI("😀")
                );

                console.log(recuperaValor);
              } catch (err) {
                alert(
                  "Erro ao salvar preferência do usuário " + decodeURI("☹️")
                );
              }
            }}
          >
            {kms.map((km) => (
              <Picker.Item
                style={styles.pickerItem}
                key={`${km}`}
                label={` ${km == 2 ? `${km} KM (padrão)` : `${km} KM `}`}
                value={`${km}`}
              />
            ))}
          </Picker>
        </View>
      </LinearGradient>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  textoInformativo: {
    fontSize: 20,
    textAlign: "center",
    marginTop: "10%",
    borderColor: "red",
    borderWidth: 2,
    borderRadius: 50,
    marginHorizontal: 50,
    backgroundColor: "rgba(0,0,0,1)",
    color: "white",
    textShadowColor: "white",
    textShadowOffset: { width: 3, height: 3 },
    textShadowRadius: 10,
    fontWeight: "bold",
  },
  viewPicker: {
    alignSelf: "center",
    backgroundColor: "black",
    width: "68%",
    marginTop: "10%",
  },
  picker: {
    color: "white",
  },
  pickerItem: {
    color: "white",

    fontSize: 30,

    backgroundColor: "black",
  },
});
