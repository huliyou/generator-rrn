/* @flow */
import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers/reducers';
import AppInfo from '../AppInfo';
const prod = AppInfo.prod;

let createStoreWithMiddleware;
if (prod) {
  createStoreWithMiddleware = applyMiddleware(
    thunkMiddleware,
  )(createStore);
} else {
  createStoreWithMiddleware = applyMiddleware(
    thunkMiddleware,
  )(createStore);
}


const store = createStoreWithMiddleware(
  reducers,
);

export default store;

export const dispatch = store.dispatch;
