var path         = require('path');
var through      = require('through2');

module.exports = function (file) {
  var file = path.parse(file);
  var name = file.name;
  var dir = file.dir.split(path.sep);
      dir = dir[dir.length-1];
  var data = ""
  var read = function (buf, enc, callback) {
    data += buf
    callback()
  }
  var write = function (callback) {
    try {
      /* remove debug block */
      (!sourceMap) && (data = data.replace(/\/\*\s*debug:start\s*\*\/[\s\S]*?\/\*\s*debug:stop\s*\*\//g, ""));
      /* magical $className inheritance transformation */
      data = data.replace(/render\(\)/g, 'render(props)');
      data = data.replace(/\$className\ *=\ *\{([\w ]+)\}/g, 'className = { classnames(props.className,$1) }');
      data = data.replace(/\$className\ *=\ *(['"][\w- ]+['"])/g, 'className = { classnames(props.className,$1) }');
      /* magical filename injection */
      data = data.replace(/__FILENAME__/g, name);
      data = data.replace(/__DIRNAME__/g, dir);
      this.push(String(data))
    }
    catch (er) {
      callback(new Error(er.toString().replace("Error: ", "") + " (" + file + ")"))
    }
    callback()
  }
  return through(read, write)
}
