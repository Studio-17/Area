import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

// Redux
import { Service } from "../../redux/models/serviceModels";

import { Dimensions } from "react-native";

// Components
import MyText from "../MyText";

interface Props {
  service: Service;
  logo?: any;
  onClickService: any;
  cardGap: number;
  index: number;
}

export default function ServiceCard(
  {
    service,
    logo,
    onClickService,
    cardGap,
    index,
  }: Props) {

  const cardWidth = (Dimensions.get("window").width - cardGap * 3) / 2;

  return (
    <TouchableOpacity
      style={[
        styles.cardContainer,
        {
          marginTop: cardGap,
          marginLeft: index % 2 !== 0 ? cardGap : 0,
          width: cardWidth,
        },
      ]}
      onPress={onClickService}
    >
      <MyText style={styles.textProperties}>{service.name}</MyText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    height: 180,
    backgroundColor: "grey",
    borderRadius: 15,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    justifyContent: "center",
    alignItems: "center",
  },
  textProperties: {
    color: "black",
  },
});
