import React from "react";
import { View, Button } from "react-native";

// Redux
import { Service } from "../../redux/models/serviceModels";

// Components
import MyText from "../MyText";

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
      <MyText>{service.name}</MyText>
      <MyText>{service.description}</MyText>
      <MyText>{service.uuid}</MyText>
      <Button title="Select" onPress={onClickOnCards} />
    </View>
  );
}
