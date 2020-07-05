const path = require('path');

const buildDir = path.resolve(path.join(__dirname + '../build/'));

const extraNodeModules = {
  'testing-a11y': buildDir,
};
const watchFolders = [buildDir];

module.exports = {
  resolver: {
    extraNodeModules,
  },
  watchFolders,
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  },
};
