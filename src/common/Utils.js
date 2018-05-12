export default {
  resolvePath(path) {
    const dirs = path.split('/').filter(dirPath => dirPath.trim() !== '').join('/');
    return dirs;
  }
};
