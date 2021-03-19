import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
    Button, Alert, CheckBox,
    StyleSheet, Text, TextInput, View, ScrollView,
    TouchableOpacity, Modal, Pressable
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import { createData, deleteData, getData } from '../redux/actions';

const HomeScreen = ({ navigation }) => {

    const [modalVisible, setModalVisible] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [inputTodo, setInputTodo] = useState({
        title: '',
        status: false,
    });

    const dispatch = useDispatch()
    const listData = useSelector(state => state.listData);
    const { data, loading, error } = listData;

    const createTodoData = useSelector(state => state.createTodoData);
    const { data: dataCreate, loading: loadingCreate, error: errorCreate, success } = createTodoData;

    const dataDelete = useSelector(state => state.dataDelete);
    const { data: dataDeleting, loading: loadingDelete, error: errorDelete, success: successDelete } = dataDelete;

    const userInfo = useSelector(state => state.userInfo);
    const { data: dataUser, loading: loadingUser, error: errorUser, success: successUser } = userInfo;

    useEffect(() => {
        if (dataUser) {
            dispatch(getData(dataUser.id));
        } else {
            dispatch(getData());
        }
        if (errorCreate) {
            Alert.alert("User does not exist", "Kindly add new user from the side bar menu")
        }

    }, [loadingCreate, loadingDelete, loadingUser]);

    const createTodo = (todo, status) => dispatch(createData(dataUser ? dataUser.id : 1262, todo, status));

    const handleDelete = (id) => dispatch(deleteData(id))

    const titleUpdate = (val) => {
        setInputTodo({
            ...inputTodo,
            title: val
        })
        console.log(inputTodo.title)
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

    const showMode = () => {
        setModalVisible(true);
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
                <Button title="Add Todo" onPress={showMode} />

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
                    onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                        setModalVisible(!modalVisible);
                    }}
                >
                    <View style={styles.modalWrap}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>Add new todo</Text>
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
                                        createTodo(inputTodo.title, inputTodo.status);
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
                    {errorCreate && <Text >User hasn't been add. Kindly add user from the sidebar</Text>}
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
                                onPress={() => handleDelete(data.id)}
                                style={styles.itemView}>
                                <Feather name="trash-2" color="#f22" size={25} />
                            </TouchableOpacity>
                        </View>
                    </View>)}
                </ScrollView>
                <StatusBar style="auto" />
            </View>
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        marginTop: 80,
        justifyContent: 'center',
        marginHorizontal: 10,
        marginBottom: 15
    },
    dataTable: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 8,
        padding: 15,
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
        marginRight: 10,
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
