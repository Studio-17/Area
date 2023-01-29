import { Text, StyleSheet, View } from 'react-native';

const ReaccoonTitle = () => {

    return (
        <View style={styles.content}>
            <Text style={styles.basictText}>
                <Text style={styles.brownText}>R</Text>
                <Text style={styles.blueText}>e</Text>
                <Text style={styles.brownText}>accoon</Text>
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
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
});

export default ReaccoonTitle;