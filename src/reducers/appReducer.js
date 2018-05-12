import actions from '../actions/actionTypes';
import InitialState from './InitialState';

let uuid = 1;
export default function appReducer(state = InitialState.app, action) {
  if(action.type === actions.UPDATE_SELECTED_DIR) {
    return Object.assign({}, state, {selectedDir:action.selectedDir});
  } else if(action.type === actions.SHOW_HIDE_ADD_DIR_MODAL) {
    return Object.assign({}, state, {showDirModal:action.showDirModal});
  } else if(action.type === actions.UPDATE_DIRS) {
    return Object.assign({}, state, {dirs:action.dirs});    
  } else {
    return state;
  }
}
