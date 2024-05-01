import { createStore, combineReducers } from 'redux';
import communityReducer from './reducers';

const rootReducer = combineReducers({
  community: communityReducer,
});

const store = createStore(rootReducer);

export default store;
