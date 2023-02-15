import React from "react";
import {
  Text,
  Pressable,
  StyleSheet
} from "react-native";

interface Props {
  actionContent?: string;
  reactionContent?: string;
  uuidOfAction?: string;
  onClick: (
    actionContent?: string,
    reactionContent?: string,
    uuidOfAction?: string
  ) => any | undefined;
  onClose: () => void;
  onCloseServicesModal: () => void;
  logo?: any;
}

export default function ActionCard(
  {
    onClose,
    onCloseServicesModal,
    actionContent,
    reactionContent,
    uuidOfAction,
    onClick
  }: Props) {
  const onClickOnCards = () => {
    onClose();
    onCloseServicesModal();
    onClick(actionContent && actionContent, reactionContent && reactionContent, uuidOfAction && uuidOfAction)
  };

  return (
    <Pressable style={ styles.cardProperties} onPress={onClickOnCards}>
      <Text style={styles.cardContainer}>
        {actionContent && (
          <Text style={styles.textProperties}>{actionContent}</Text>
        )}
        {reactionContent && (
          <Text style={styles.textProperties}>{reactionContent}</Text>
        )}
      </Text>
    </Pressable>
  );
};

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
