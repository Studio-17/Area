import * as React from "react";
import { useEffect } from "react";
import { Action } from "../models/actionModels";
import { Service } from "../models/serviceModels";
import ActionCard from "./Cards/ActionCard";
import {
  SafeAreaView,
  View,
  Text,
  Modal,
  Button,
  FlatList,
} from "react-native";

interface Props {
  service: Service;
  onClickOnAreasCards: any;
  typeSelected: "action" | "reaction";
}

const ACTIONSDATA = [
  {
    name: "Action 1",
    uuid: "uuid1",
    description: "Description 1",
  },
  {
    name: "Action 2",
    uuid: "uuid2",
    description: "Description 2",
  },
  {
    name: "Action 3",
    uuid: "uuid3",
    description: "Description 3",
  },
];

const DATA = {
  actions: ACTIONSDATA,
};

export default function ServicesInfos({
  service,
  onClickOnAreasCards,
  typeSelected,
}: Props) {
  const data = DATA;

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <SafeAreaView>
      <View>
        <FlatList
          data={data.actions}
          renderItem={({ item }) => (
            <ActionCard
              actionContent={item.name}
              reactionContent={item.description}
              onClick={onClickOnAreasCards}
              uuidOfAction={item.uuid}
            />
          )}
          keyExtractor={(item) => item.uuid}
        />
      </View>
    </SafeAreaView>
  );
}
