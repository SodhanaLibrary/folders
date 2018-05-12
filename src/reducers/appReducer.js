import actions from '../actions/actionTypes';
import InitialState from './InitialState';

let uuid = 1;
export default function appReducer(state = InitialState.app, action) {
  if(action.type === actions.UPDATE_SELECTED_DIR) {
    return Object.assign({}, state, {selectedDir:action.selectedDir});
  } else {
    return state;
  }
}
