import React from 'react';
import { StatusBar } from 'expo-status-bar';
import {
    StyleSheet, Text,
    View, ScrollView,
    TouchableOpacity
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useSelector } from 'react-redux';

const ScreenTwo = ({ navigation }) => {

    const listData = useSelector(state => state.listData);

    const { data, loading, error } = listData;

    return (
        <View style={{ flex: 1 }} >
            <Feather name="menu" size={22} color="#000"
                onPress={() => navigation.openDrawer()}
                style={{
                    position: "absolute", top: 40, left: 16
                }}
            />
            <View style={styles.container}>

                <View style={styles.dataTable}>
                    <View style={styles.title}>
                        <Text>Title</Text>
                    </View>
                    <View>
                        <Text>Status</Text>
                    </View>
                    <View style={styles.actions}>
                        <Text>Action</Text>
                    </View>
                </View>
                <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
                    {loading && <Text >Loading...</Text>}
                    {data && data.map(data => <View key={data.id} style={styles.dataTable} >
                        <View style={styles.title}>
                            <Text style={styles.todoText}>{data.title}</Text>
                        </View>
                        <View style={styles.itemView}>
                            <Text style={styles.todoText}>{data.completed ? "Completed" : "Not Completed"}</Text>
                        </View>
                        <View style={styles.actions}>
                            <TouchableOpacity disabled
                                onPress={() => showMode(data.id)}
                                style={styles.itemView}>
                                <Feather name="edit" color="#aaa" size={25} />
                            </TouchableOpacity>
                            <TouchableOpacity disabled
                                onPress={() => {
                                    dispatch(deleteData(data.id))
                                    setRefresh(!refresh)
                                }}
                                style={styles.itemView}>
                                <Feather name="trash-2" color="#aaa" size={25} />
                            </TouchableOpacity>
                        </View>
                    </View>)}
                </ScrollView>
                <StatusBar style="auto" />
            </View>
        </View>
    )
}

export default ScreenTwo;

const styles = StyleSheet.create({
    container: {
        marginTop: 80,
        justifyContent: 'center',
        marginHorizontal: 10,
    },
    dataTable: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 15,
        padding: 10,
        backgroundColor: "#d5d8e0"
    },
    title: {
        width: "45%",
        marginRight: 5,
        justifyContent: "center",
    },
    actions: {
        width: "25%",
        marginLeft: 10,
        flexDirection: "row",
        justifyContent: "space-around",
    },
    itemView: {
        justifyContent: "center",
    },
    todoText: {
        fontSize: 16,
        fontWeight: "normal",
        textAlign: "left",
        lineHeight: 25,
        justifyContent: "center"
    }
});
