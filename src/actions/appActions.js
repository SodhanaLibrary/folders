import actions from './actionTypes';

export const updateSelectedDir = selectedDir => {
  return {
    type: actions.UPDATE_SELECTED_DIR,
    selectedDir
  }
}

export const updateDirectories = dirs => {
  return {
    type: actions.UPDATE_DIRS,
    dirs
  }
}

export const deleteDirectory = dir => {
  return {
    type: actions.DELETE_DIR,
    dir
  }
}

export const showHideDirModal = showDirModal => {
  return {
    type: actions.SHOW_HIDE_ADD_DIR_MODAL,
    showDirModal
  }
}
