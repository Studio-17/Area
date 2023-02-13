import React from "react";
import {
  Text,
  Pressable,
  StyleSheet
} from "react-native";
import { Action } from '../../redux/models/actionModels';

interface Props {
  actionContent?: string;
  reactionContent?: string;
  uuidOfAction?: string;
  // onClick?: (
  //   actionContent?: string,
  //   reactionContent?: string,
  //   uuidOfAction?: string
  // ) => React.MouseEventHandler<HTMLButtonElement> | undefined;
  action: Action;
  onClose: () => void;
  setActionSelected?: any;
  logo: any;
}

export default function ActionCard({ onClose, actionContent, reactionContent, uuidOfAction, setActionSelected, action }: Props) {
  const onClickOnCards = () => {
    setActionSelected(action);
    onClose();
  };

    return (
      <Pressable style={ styles.cardProperties} onPress={onClickOnCards}>
        <Text style={styles.cardContainer}>
          <Text style={styles.textProperties}>{action.name}</Text>
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
