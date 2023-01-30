import { View, Text, Button } from "react-native";

export default function AppletContentScreen({ navigation } : { navigation: any }) {
    return (
        <View>
            <Button title="Go back" onPress={() => navigation.goBack()} />
        </View>
    );
}
