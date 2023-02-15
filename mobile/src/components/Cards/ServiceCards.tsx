import React from "react";
import { View, Text, Button } from "react-native";

// Redux
import { Service } from "../../redux/models/serviceModels";

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
