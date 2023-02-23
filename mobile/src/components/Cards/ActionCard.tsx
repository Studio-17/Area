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
  onClick: (
    actionContent?: string,
    reactionContent?: string,
    uuidAction?: string,
  ) => any | undefined;
  logo?: any;
}

export default function ActionCard({
  onClick,
  actionContent,
  reactionContent,
  uuidOfAction,
}: Props) {
  const onClickOnCards = () => {
    onClick(
      actionContent && actionContent,
      reactionContent && reactionContent,
      uuidOfAction && uuidOfAction
    );
  };

  return (
    <Pressable style={[styles.actionCard, { backgroundColor: "grey" }]} onPress={onClickOnCards}>
        {actionContent && (
          <MyText style={styles.cardTitle}>{actionContent}</MyText>
        )}
        {reactionContent && (
          <MyText style={styles.cardTitle}>{reactionContent}</MyText>
        )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  actionCard: {
    borderRadius: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 20,
  },
  cardTitle: {
    margin: "auto",
    padding: 15,
    color: "black",
    fontSize: 15,
  },
});
