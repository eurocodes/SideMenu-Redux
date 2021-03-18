import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createDataReducer, deleteDataReducer, getDataReducer, updateDataReducer, createNewUserReducer } from './reducers';

const initialState = { listData: { data: [] }, userInfo: {} };

const reducer = combineReducers({
    listData: getDataReducer,
    updateTodoData: updateDataReducer,
    createTodoData: createDataReducer,
    dataDelete: deleteDataReducer,
    userInfo: createNewUserReducer,
});

const combineEnhancer = compose;
const store = createStore(reducer, initialState, combineEnhancer(applyMiddleware(thunk)));

export default store;