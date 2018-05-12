import React from 'react';
import * as appActions from './actions/appActions'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Utils from './common/Utils';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      dirName:'',
      dirNameValid:true
    };
    this.selectDirectory = this.selectDirectory.bind(this);
    this.goBack = this.goBack.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.openModal = this.openModal.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.deleteThisFolder = this.deleteThisFolder.bind(this);
    this.validateDirName = this.validateDirName.bind(this);
  }

  selectDirectory(path) {
    this.props.actions.updateSelectedDir(path);
  }

  goBack(path) {
    if(path) {
      const dirs = path.split('/').filter(dir => dir !== '');
      this.props.actions.updateSelectedDir(dirs.slice(0, dirs.length - 1).join('/'));
    }
  }

  handleChange(event) {
    this.setState({
      [event.target.name]:event.target.value,
      [event.target.name+'Valid']:this.validateDirName(event.target.value)
    });
  }

  openModal() {
    this.setState({
      dirName:'',
      dirNameValid:true
    });
    this.props.actions.showHideDirModal(true);
  }

  validateDirName(name) {
    return (/^[a-zA-Zа-яА-Я0-9_! ]+$/.test(name)) && !Object.keys(this.currentDir).find(dir => dir === name);
  }

  deleteThisFolder() {
    const {selectedDir, dirs, showDirModal} = this.props;
    this.props.actions.showHideDirModal(false);
    const cDirs = Object.assign({}, dirs);
    const fDirs = selectedDir.split('/').filter(dir => dir !== '');
    const parentDir = fDirs.splice(0, fDirs.length - 1).reduce((dir, current) => {
      return dir[current];
    }, cDirs);
    delete parentDir[fDirs[fDirs.length - 1]];
    this.props.actions.updateDirectories(cDirs);
    this.props.actions.updateSelectedDir(fDirs.splice(0, fDirs.length - 1).join('/'));
  }

  onSubmit(event) {
    const {selectedDir, dirs, showDirModal} = this.props;
    event.preventDefault();
    this.props.actions.showHideDirModal(false);
    const cDirs = Object.assign({}, dirs);
    const currentDir = selectedDir.split('/').filter(dir => dir !== '').reduce((dir, current) => {
      return dir[current];
    }, cDirs);
    currentDir[this.state.dirName] = {};
    this.props.actions.updateDirectories(cDirs);
    return false;
  }

  render() {
    const {selectedDir, dirs, showDirModal} = this.props;
    let currentDir = dirs;
    let path = '';
    if(selectedDir) {
      currentDir = selectedDir.split('/').filter(dir => dir !== '').reduce((dir, current) => {
        path += "/" + current;
        return dir[current];
      }, dirs);
    }
    this.currentDir = currentDir;
    return (
      <div className="body_content">
         <div className="body_content__head">
            <div className="body_content__head--title">
              Folders
            </div>
            <div className="body_content__head--path">
              <input className="form_input" disabled={true} name="path" value={this.props.selectedDir}/>
            </div>
            <div className="body_content__head--actions">
              <button disabled={path === ''} onClick={() => this.goBack(path)} className="btn primary-btn">Back</button>
              <button onClick={this.openModal}  className="btn primary-btn">Create Folder</button>
              <button disabled={path === ''} onClick={this.deleteThisFolder} className="btn primary-btn">Delete this folder</button>
            </div>
         </div>
         <div className="body_content__main">
            {Object.keys(currentDir).map(dir => <div onClick={() => this.selectDirectory(path+"/"+dir)} className="folder">
               <span>{dir}</span>
            </div>)}
         </div>

         <div className="modal" style={{display:showDirModal ? 'block' : 'none'}}>
            <div className="modal-content">
              <span onClick={() => this.props.actions.showHideDirModal(false)} className="close">&times;</span>
              <form onSubmit={this.onSubmit}>
                <div className="body_content__modal_form">
                  <input className="form_input" name="dirName" onChange={this.handleChange} value={this.state.dirName}/>
                  <button className="btn primary-btn" disabled={!this.state.dirNameValid || this.state.dirName === ''}>Create</button>
                </div>
                <div className="body_content__modal_form__error">
                  {!this.state.dirNameValid && 'Please enter valid directory name'}
                </div>
              </form>
            </div>
          </div>
      </div>
    )
  }
}

export default connect(
  state => ({
    selectedDir:state.app.selectedDir,
    showDirModal:state.app.showDirModal,
    dirs:state.app.dirs
  }),
  dispatch => ({
    actions: bindActionCreators(appActions, dispatch)
  })
)(App);
