module.exports = {
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
      // If you are using Yarn Workspaces, you may have multiple node_modules folders
      // List them all here so that VCP Electron Builder can find them
      nodeModulesPath: ['../../node_modules', './node_modules'],
      // preload: 'src/preload.js',
      // // Or, for multiple preload files:
      // preload: { preload: 'src/preload.js' }
    }
  }
}