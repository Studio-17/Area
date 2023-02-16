import React from "react";
import {
  Text,
  StyleSheet,
  Pressable,
} from "react-native";
import { Service } from '../../redux/models/serviceModels';

interface Props {
  service: Service;
  logo?: any;
  setServiceSelected: any;
  setOpenActionModal: any;
  setOpenServicesModal: any;
}

export default function ServiceCard(
  {
    service,
    logo,
    setServiceSelected,
    setOpenActionModal,
    setOpenServicesModal,
  }: Props) {
  const onClickOnCards = () => {
    setServiceSelected(service);
    setOpenActionModal(true);
    setOpenServicesModal(false);
  };

  return (
    <Pressable style={ styles.cardProperties} onPress={onClickOnCards}>
      <Text style={styles.cardContainer}>
        <Text style={styles.textProperties}>{service.name}</Text>
      </Text>
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
