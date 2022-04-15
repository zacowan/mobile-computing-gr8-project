const { getData } = require("./redis");

const SLASH = process.platform === "win32" ? "\\" : "/";
const DEFAULT_DIRNAME = "atlasWorkingDir";
const DEFAULT_WORKING_DIR = "".concat(__dirname, SLASH, DEFAULT_DIRNAME);

const getAtlasWorkingDir = async () => {
  return (await getData("workingDir")) || DEFAULT_WORKING_DIR;
};

module.exports = getAtlasWorkingDir;
