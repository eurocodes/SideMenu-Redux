import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
    Alert, CheckBox, StyleSheet, Text,
    TextInput, View, ScrollView,
    TouchableOpacity, Modal,
    Pressable
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import { getData, updateData } from '../redux/actions';

const ScreenOne = ({ navigation }) => {

    const [modalVisible, setModalVisible] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [id, setId] = useState({});
    const [inputTodo, setInputTodo] = useState({
        title: '',
        status: false,
    });

    const dispatch = useDispatch()
    const listData = useSelector(state => state.listData);
    const { data, loading, error } = listData;

    const updateTodoData = useSelector(state => state.updateTodoData);
    const { data: dataUpdata, loading: loadingUpdate, error: errorUpdate, success } = updateTodoData;

    const updateTodo = async (todoId, todo, status) => {
        let todoTitle = todo ? todo : id.title
        dispatch(updateData(todoId, todoTitle, status));
    }

    useEffect(() => {
        if (loadingUpdate) dispatch(getData());
        return () => {
            // 
        }
    }, [loadingUpdate])

    const titleUpdate = (val) => {
        setInputTodo({
            ...inputTodo,
            title: val
        })
    }

    const statusUpdate = () => {
        setIsChecked(!isChecked)
        setInputTodo({
            ...inputTodo,
            status: !isChecked,
        })
        console.log(isChecked)
        console.log(inputTodo.status)
    }

    const showMode = (id, title) => {
        setModalVisible(true);
        setId({ id: id, title: title, });
    }
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
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                >
                    <View style={styles.modalWrap}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>Editing todo</Text>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <TextInput
                                    onChangeText={e => {
                                        titleUpdate(e);
                                    }}
                                    style={styles.textInput}
                                    placeholder="Todo title"
                                />
                                <CheckBox
                                    value={isChecked}
                                    onValueChange={statusUpdate}
                                />
                            </View>

                            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                <Pressable
                                    style={[styles.button, styles.buttonCancel]}
                                    onPress={() => setModalVisible(!modalVisible)}
                                >
                                    <Text style={styles.textStyle}>Cancel</Text>
                                </Pressable>
                                <Pressable
                                    style={[styles.button, styles.buttonClose]}
                                    onPress={() => {
                                        updateTodo(id.id, inputTodo.title, inputTodo.status);
                                        setModalVisible(!modalVisible);
                                    }}
                                >
                                    <Text style={styles.textStyle}>Save Update</Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </Modal>
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
                            <TouchableOpacity
                                onPress={() => showMode(data.id, data.title)}
                                style={styles.itemView}>
                                <Feather name="edit" color="#3b5" size={25} />
                            </TouchableOpacity>
                        </View>
                    </View>)}
                </ScrollView>
                <StatusBar style="auto" />
            </View>
        </View>
    )
}

export default ScreenOne

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
    },
    modalWrap: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        width: "75%",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 5,
        padding: 10,
        elevation: 2
    },
    buttonCancel: {
        backgroundColor: "#F194FF",
        marginRight: 5,
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    textInput: {
        padding: 10,
        fontSize: 16,
        width: "80%",
        marginBottom: 8,
        justifyContent: "center",
        alignItems: "center",
        borderBottomColor: "#333",
        borderBottomWidth: 1,
        color: "#333",
    }
});
