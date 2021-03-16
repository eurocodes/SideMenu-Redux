import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';

const ScreenThree = ({ navigation }) => {
    return (
        <View style={{ flex: 1 }} >
            <Feather name="menu" size={22} color="#000"
                onPress={() => navigation.openDrawer()}
                style={{
                    position: "absolute", top: 40, left: 16
                }}
            />
            <View style={styles.container}>
                <Text>App Screen 3</Text>
                <StatusBar style="auto" />
            </View>
        </View>
    )
}

export default ScreenThree;

const styles = StyleSheet.create({
    container: {
        marginTop: 80,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
