import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native'
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer'
import { Feather } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { createNewUser } from '../redux/actions';

export default function DrawerContent(props) {
    const dispatch = useDispatch()

    return (
        <View style={styles.drawerContent}>
            <DrawerContentScrollView {...props}>
                <View style={{ marginTop: 15 }}>
                    <DrawerItem
                        icon={({ color, size }) => (
                            <Feather name="home" color="#23355b" size={size} />
                        )}
                        label={() => <Text style={styles.drawerText}>Home</Text>}
                        onPress={() => { props.navigation.navigate("Home Screen") }}
                    />
                    <DrawerItem
                        icon={({ color, size }) => (
                            <Feather name="sidebar" color="#23355b" size={size} />
                        )}
                        label={() => <Text style={styles.drawerText}>Screen 1</Text>}
                        onPress={() => { props.navigation.navigate("Screen One") }}
                    />
                    <DrawerItem
                        icon={({ color, size }) => (
                            <Feather name="sidebar" color="#23355b" size={size} />
                        )}
                        label={() => <Text style={styles.drawerText}>Screen 2</Text>}
                        onPress={() => { props.navigation.navigate("Screen Two") }}
                    />
                </View>
            </DrawerContentScrollView>
            <View style={styles.bottomDrawerSection}>
                <DrawerItem
                    icon={({ color, size }) => (
                        <Feather name="user-plus" color="#23355b" size={size} />
                    )}
                    label={() => <Text style={styles.drawerText}>Add a user</Text>}
                    onPress={() => dispatch(createNewUser())}
                />

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
        padding: 8,
        backgroundColor: "#f4f4f4",
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: "#627aac",
        borderTopWidth: 1,
    },
    drawerText: {
        fontSize: 18,
        fontWeight: "normal",
        justifyContent: "flex-start",
        textAlign: "justify",
        color: "#23355b",
        lineHeight: 26,
    },
})