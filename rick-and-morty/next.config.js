module.exports = {
  poweredByHeader: false,
  excludeFile: (str) => /\*.{spec,test}.js/.test(str)
}
