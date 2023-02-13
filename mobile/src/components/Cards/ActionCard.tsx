import * as React from "react";
import { SafeAreaView, View, Text, Modal, Button } from "react-native";

interface Props {
  actionContent?: string;
  reactionContent?: string;
  uuidOfAction?: string;
  onClick: (
    actionContent?: string,
    reactionContent?: string,
    uuidOfAction?: string
  ) => React.MouseEventHandler<HTMLButtonElement> | undefined;
}

export default function ActionCard({ actionContent, reactionContent, onClick, uuidOfAction }: Props) {
    return (
        <SafeAreaView>
            <View>
                <Text>{actionContent}</Text>
                <Text>{reactionContent}</Text>
                {/* <Button title="Select" onClick={onClick(actionContent && actionContent, reactionContent && reactionContent, uuidOfAction && uuidOfAction)} /> */}
            </View>
        </SafeAreaView>
    );
};
