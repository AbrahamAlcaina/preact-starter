import { combineReducers } from 'redux';
import home from '../home/reducer';
import blog from '../blog/reducer';
import credit from '../credit/reducer';

export default combineReducers({
    home, blog, credit
});
