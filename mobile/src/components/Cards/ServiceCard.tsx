import React from "react";
import {
  Text,
  StyleSheet,
  Pressable,
} from "react-native";
import { Service } from '../../redux/models/serviceModels';

interface Props {
  service: Service;
  logo: any;
  setServiceSelected: any;
  onClose: () => void;
  setOpenModal: any;
}

export default function ServiceCard({ service, logo, setServiceSelected, onClose, setOpenModal }: Props) {
  const onClickOnCards = () => {
    setServiceSelected(service);
    // onClose();
    setOpenModal(true);
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
