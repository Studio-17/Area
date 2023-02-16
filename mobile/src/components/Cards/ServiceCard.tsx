import React from "react";
import { StyleSheet, Pressable } from "react-native";

// Redux
import { Service } from "../../redux/models/serviceModels";

// Components
import MyText from "../MyText";

interface Props {
  service: Service;
  logo?: any;
  setServiceSelected: any;
  setOpenActionModal: any;
}

export default function ServiceCard({
  service,
  logo,
  setServiceSelected,
  setOpenActionModal,
}: Props) {
  const onClickOnCards = () => {
    setServiceSelected(service);
    setOpenActionModal(true);
    console.log("openActionModal")
  };

  return (
    <Pressable style={styles.cardProperties} onPress={onClickOnCards}>
      <MyText style={styles.cardContainer}>
        <MyText style={styles.textProperties}>{service.name}</MyText>
      </MyText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  cardProperties: {
    padding: 10,
    borderRadius: 20,
    marginVertical: 5,
    backgroundColor: "gray",
  },
  cardContainer: {
    margin: "auto",
    fontSize: 15,
    fontWeight: "bold",
  },
  textProperties: {
    color: "black",
  },
});
