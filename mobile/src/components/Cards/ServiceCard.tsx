import React from "react";
import { StyleSheet, TouchableOpacity, View, Image } from "react-native";

// Redux
import { Service } from "../../redux/models/serviceModels";

import { Dimensions } from "react-native";

// Components
import MyText from "../MyText";

interface Props {
  service: Service;
  logo: any;
  onClickService: any;
  cardGap: number;
  index: number;
}

export default function ServiceCard({
  service,
  logo,
  onClickService,
  cardGap,
  index,
}: Props) {
  const cardWidth = (Dimensions.get("window").width - cardGap * 3) / 2;

  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <TouchableOpacity
      key={index}
      style={[
        styles.cardContainer,
        {
          marginTop: cardGap,
          marginLeft: index % 2 !== 0 ? cardGap : 0,
          width: cardWidth,
          backgroundColor: service.color ? service.color : "grey",
        },
      ]}
      onPress={onClickService}
    >
      <View style={styles.contentContainer}>
        <Image style={styles.logo} source={logo} />
        <MyText style={styles.textProperties}>
          {capitalizeFirstLetter(service.name)}
        </MyText>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    height: 180,
    borderRadius: 15,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    borderColor: "black",
    borderWidth: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  textProperties: {
    color: "black",
  },
  contentContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 50,
    height: 50,
    marginBottom: 10,
    margin: "auto",
  },
});
