import * as React from "react";
import {
  Text,
  StyleSheet,
  Pressable
} from "react-native";
import { Service } from '../../models/serviceModels';

interface Props {
  service: Service;
  logo: any;
  setServiceSelected: React.Dispatch<React.SetStateAction<Service | null>>;
  onClose: () => void;
}

export default function ServiceCard({ service, logo, setServiceSelected, onClose }: Props) {
  const onClickOnCards = () => {
    setServiceSelected(service);
    onClose();
  };
  console.log(service)

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
