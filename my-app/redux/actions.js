import { ACCESS_TOKEN } from "../utils/accessKey";
import {
    GET_DATA, GET_DATA_SUCCESS, GET_DATA_FAIL,
    MODIFY_DATA, MODIFY_DATA_SUCCESS, MODIFY_DATA_FAIL,
    CREATE_DATA, CREATE_DATA_SUCCESS, CREATE_DATA_FAIL,
    DELETE_DATA, DELETE_DATA_SUCCESS, DELETE_DATA_FAIL,
    CREATE_NEW_USER, CREATE_NEW_USER_SUCCESS, CREATE_NEW_USER_FAIL
} from "./constants";

const getData = (id) => async (dispatch) => {
    let userid = id ? id : 1262;
    dispatch({ type: GET_DATA });
    try {
        const response = await fetch(`https://gorest.co.in/public-api/users/${userid}/todos`);
        // console.log(await response.json())
        const { data } = await response.json();
        dispatch({ type: GET_DATA_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: GET_DATA_FAIL, payload: error.message })
    }
}

const createData = (userid, todo, status) => async (dispatch) => {
    dispatch({ type: CREATE_DATA });
    try {
        const response = await fetch(`https://gorest.co.in/public-api/users/${userid}/todos`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + ACCESS_TOKEN,
            },
            body: JSON.stringify({
                title: todo,
                completed: status,
            })
        });
        const data = await response.json();
        console.log(data)
        dispatch({ type: CREATE_DATA_SUCCESS, payload: data, success: true });
    } catch (error) {
        dispatch({ type: CREATE_DATA_FAIL, payload: error.message })
    }
}

const updateData = (id, todo, status) => async (dispatch) => {
    dispatch({ type: MODIFY_DATA });
    try {
        const response = await fetch(`https://gorest.co.in/public-api/todos/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + ACCESS_TOKEN,
            },
            body: JSON.stringify({
                title: todo,
                completed: status,
            })
        });
        console.log(await response.json())
        const { data } = await response.json();
        dispatch({ type: MODIFY_DATA_SUCCESS, payload: data, success: true });
    } catch (error) {
        dispatch({ type: MODIFY_DATA_FAIL, payload: error.message })
    }
}

const deleteData = (id) => async (dispatch) => {
    dispatch({ type: DELETE_DATA });
    try {
        const response = await fetch(`https://gorest.co.in/public-api/todos/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + ACCESS_TOKEN,
            }
        });
        console.log(await response.json())
        const { data } = await response.json();
        dispatch({ type: DELETE_DATA_SUCCESS, payload: data, success: true });
    } catch (error) {
        dispatch({ type: DELETE_DATA_FAIL, payload: error.message })
    }
}

const createNewUser = () => async (dispatch) => {
    dispatch({ type: CREATE_NEW_USER });
    try {
        const response = await fetch(`https://gorest.co.in/public-api/users/`);
        const { data } = await response.json();
        dispatch({ type: CREATE_NEW_USER_SUCCESS, payload: data[0], success: true });
    } catch (error) {
        dispatch({ type: CREATE_NEW_USER_FAIL, payload: error.message })
    }
}

export { getData, updateData, createData, deleteData, createNewUser }