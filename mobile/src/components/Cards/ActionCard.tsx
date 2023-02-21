import React from "react";
import {
  Pressable,
  StyleSheet
} from "react-native";

// Components
import MyText from "../MyText";

interface Props {
  actionContent?: string;
  reactionContent?: string;
  uuidOfAction?: string;
  // onClick: (
  //   actionContent?: string,
  //   reactionContent?: string,
  // ) => any | undefined;
  onClose: (actionContent?: string, reactionContent?: string) => any;
  logo?: any;
}

export default function ActionCard({
  onClose,
  actionContent,
  reactionContent,
  // onClick,
}: Props) {
  const onClickOnCards = () => {
    onClose(actionContent && actionContent, reactionContent && reactionContent);
    // onClick(
    //   actionContent && actionContent,
    //   reactionContent && reactionContent,
    // );
  };

  return (
    <Pressable style={styles.cardProperties} onPress={onClickOnCards}>
      <MyText style={styles.cardContainer}>
        {actionContent && (
          <MyText style={styles.textProperties}>{actionContent}</MyText>
        )}
        {reactionContent && (
          <MyText style={styles.textProperties}>{reactionContent}</MyText>
        )}
      </MyText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  cardProperties: {
    padding: 10,
    borderRadius: 20,
    marginVertical: 5,
    backgroundColor: "red",
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
