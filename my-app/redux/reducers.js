import {
    GET_DATA, GET_DATA_SUCCESS, GET_DATA_FAIL,
    MODIFY_DATA, MODIFY_DATA_SUCCESS, MODIFY_DATA_FAIL,
    CREATE_DATA, CREATE_DATA_SUCCESS, CREATE_DATA_FAIL,
    DELETE_DATA, DELETE_DATA_SUCCESS, DELETE_DATA_FAIL, CREATE_NEW_USER, CREATE_NEW_USER_SUCCESS, CREATE_NEW_USER_FAIL
} from "./constants";

function getDataReducer(state = { data: [] }, action) {

    switch (action.type) {
        case GET_DATA:
            return { loading: true, data: [] };
        case GET_DATA_SUCCESS:
            return {
                loading: false,
                data: action.payload
            };
        case GET_DATA_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
};

function createDataReducer(state = { data: [] }, action) {

    switch (action.type) {
        case CREATE_DATA:
            return { loading: true, data: [] };
        case CREATE_DATA_SUCCESS:
            return {
                loading: false,
                data: action.payload
            };
        case CREATE_DATA_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
};

function updateDataReducer(state = { data: [] }, action) {

    switch (action.type) {
        case MODIFY_DATA:
            return { loading: true, data: [] };
        case MODIFY_DATA_SUCCESS:
            return {
                loading: false,
                data: action.payload
            };
        case MODIFY_DATA_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
};

function deleteDataReducer(state = { data: [] }, action) {

    switch (action.type) {
        case DELETE_DATA:
            return { loading: true, data: [] };
        case DELETE_DATA_SUCCESS:
            return {
                loading: false,
                data: action.payload
            };
        case DELETE_DATA_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
};

function createNewUserReducer(state = { user: {} }, action) {

    switch (action.type) {
        case CREATE_NEW_USER:
            return { loading: true, user: {} };
        case CREATE_NEW_USER_SUCCESS:
            return {
                loading: false,
                data: action.payload
            };
        case CREATE_NEW_USER_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
};

export { getDataReducer, updateDataReducer, createDataReducer, deleteDataReducer, createNewUserReducer }