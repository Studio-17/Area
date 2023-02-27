import React from "react";
import {
  Pressable,
  StyleSheet,
} from "react-native";

// Components
import MyText from "../MyText";

import { Action } from "../../redux/models/actionModels";
import { GetParamsDto } from "../../redux/models/paramsModel";

// interface Props {
//   actionContent?: string;
//   reactionContent?: string;
//   uuidOfAction?: string;
//   onClick: (
//     actionContent?: string,
//     reactionContent?: string,
//     uuidAction?: string,
//   ) => any | undefined;
//   logo?: any;
// }

interface Props {
  actionContent?: string;
  reactionContent?: string;
  uuidOfAction?: string;
  onClick: (
    actionContent?: string,
    reactionContent?: string,
    uuidOfAction?: string,
    params?: GetParamsDto[] | null,
    action?: Action
  ) => void;
  params: GetParamsDto[] | null;
  action: Action;
  color: string;
}

export default function ActionCard({
  actionContent,
  reactionContent,
  onClick,
  uuidOfAction,
  params,
  action,
  color,
}: Props) {
  const onClickOnCards = () => {
    onClick(
      actionContent && actionContent,
      reactionContent && reactionContent,
      uuidOfAction && uuidOfAction,
      params,
      action
    )
  };

  return (
    <Pressable style={[styles.actionCard, { backgroundColor: color }]} onPress={onClickOnCards}>
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
