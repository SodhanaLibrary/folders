import actions from './actionTypes';

export const updateSelectedDir = selectedDir => {
  return {
    type: actions.UPDATE_SELECTED_DIR,
    selectedDir
  }
}

export const createDirectory = dir => {
  return {
    type: actions.CREATE_DIR,
    dir
  }
}

export const deleteDirectory = dir => {
  return {
    type: actions.DELETE_DIR,
    dir
  }
}

export const showHideDirModal = show => {
  return {
    type: actions.SHOW_HIDE_ADD_DIR_MODAL,
    show
  }
}
