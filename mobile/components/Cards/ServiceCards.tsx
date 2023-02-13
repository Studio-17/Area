import React from "react";
import { View, Text, Modal, Button } from "react-native";
import { Service } from "../../models/serviceModels";

interface Props {
  service: Service;
  logo: any;
  setServiceSelected: React.Dispatch<React.SetStateAction<Service | null>>;
  onClose: () => void;
}

export default function ServicesCards({
  service,
  logo,
  setServiceSelected,
  onClose,
}: Props) {

  const onClickOnCards = () => {
    setServiceSelected(service);
    onClose();
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Button title="Close" onPress={onClose} />
      <Text>{service.name}</Text>
      <Text>{service.description}</Text>
      <Text>{service.uuid}</Text>
      <Button title="Select" onPress={onClickOnCards} />
    </View>
  );
}
