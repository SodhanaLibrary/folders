import React from 'react';
import * as appActions from './actions/appActions'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Utils from './common/Utils';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.selectDirectory = this.selectDirectory.bind(this);
  }

  selectDirectory(path) {
    this.props.actions.updateSelectedDir(path);
  }

  render() {
    const {selectedDir, dirs} = this.props;
    let currentDir = dirs;
    let path = '/';
    if(selectedDir) {
      currentDir = selectedDir.split('/').reduce((dir, current) => {
        path += current;
        return dir[current];
      }, dirs);
    }
    console.log(currentDir, path);
    return (
      <div className="body_content">
         <div className="body_content__head">
            <div className="body_content__head--title">
              Folders
            </div>
            <div className="body_content__head--actions">
              <button className="btn primary-btn">Create Folder</button>
              <button className="btn primary-btn">Delete</button>
            </div>
         </div>
         <div className="body_content__main">
            {Object.keys(currentDir).map(dir => <div onClick={() => this.selectDirectory(path+dir)} className="folder">
               <span>{dir}</span>
            </div>)}
         </div>
      </div>
    )
  }
}

export default connect(
  state => ({
    selectedDir:state.app.selectedDir,
    dirs:state.app.dirs
  }),
  dispatch => ({
    actions: bindActionCreators(appActions, dispatch)
  })
)(App);
