import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native'
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer'
import { Feather } from '@expo/vector-icons';

export default function DrawerContent(props) {

    return (
        <View style={styles.drawerContent}>
            <DrawerContentScrollView {...props}>
                <View style={{ marginTop: 15 }}>
                    <DrawerItem
                        icon={({ color, size }) => (
                            <Feather name="home" color="#fff" size={size} />
                        )}
                        label={() => <Text style={styles.drawerText}>Home</Text>}
                        onPress={() => { props.navigation.navigate("Home Screen") }}
                    />
                    <DrawerItem
                        icon={({ color, size }) => (
                            <Feather name="video" color="#fff" size={size} />
                        )}
                        label={() => <Text style={styles.drawerText}>Screen 1</Text>}
                        onPress={() => { props.navigation.navigate("Screen One") }}
                    />
                    <DrawerItem
                        icon={({ color, size }) => (
                            <Feather name="file-text" color="#fff" size={size} />
                        )}
                        label={() => <Text style={styles.drawerText}>Screen 2</Text>}
                        onPress={() => { props.navigation.navigate("Screen Two") }}
                    />
                    <DrawerItem
                        icon={({ color, size }) => (
                            <Feather name="info" color="#fff" size={size} />
                        )}
                        label={() => <Text style={styles.drawerText}>Screen 3</Text>}
                        onPress={() => { props.navigation.navigate("Screen Three") }}
                    />
                </View>
            </DrawerContentScrollView>
            <View style={styles.bottomDrawerSection}>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
        padding: 8,
        backgroundColor: "#263759",
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: "#f4f4f4",
        borderTopWidth: 1,
    },
    drawerText: {
        fontSize: 18,
        fontWeight: "normal",
        justifyContent: "flex-start",
        textAlign: "justify",
        color: "#fff",
        lineHeight: 26,
    },
})