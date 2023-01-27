import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, SafeAreaView } from 'react-native';
import { useFonts } from 'expo-font';
import ReaccoonTitle from './components/reaccoonTitle';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <ReaccoonTitle />
      <View style={styles.centered}>
        <Image style={styles.logo} source={require('./assets/reaccoon.png')} />
        <View style={styles.textBlock}>
          <Text style={styles.presentationText}>Welcome dear visitor!</Text>
          <Text style={styles.presentationText}>You found the most helpful app on the market!</Text>
        </View>
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF7FA',
  },
  blueText: {
    color: '#0165F5',
  },
  brownText: {
    color: '#A37C5B',
  },
  basictText: {
    fontSize: 35,
    fontWeight: 'bold',
  },
  content: {
    marginLeft: 30,
    marginTop: 20,
    textAlign: 'left',
  },
  textBlock: {
    marginVertical: 30,
    marginTop: 20,
  },
  presentationText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#A37C5B',
  },
  logo: {
    width: 300,
    height: 300,
    alignSelf: 'center',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
