import {combineReducers} from 'redux';
import PictureReducer from './reducer-pictures';

const allReducers = combineReducers({
    pictures : PictureReducer,
});

export default allReducers;