// Generated by CoffeeScript 1.7.1
(function() {
  var ChildProcess, spawn;

  ChildProcess = require('child_process');

  spawn = function(command, args, options) {
    var cmdArgs, cmdOptions;
    this.emitter = new Emitter;
    if (options == null) {
      options = {};
    }
    if (process.platform === "win32") {
      if (args != null) {
        cmdArgs = args.filter(function(arg) {
          return arg != null;
        });
        cmdArgs = cmdArgs.map(function(arg) {
          if ((command === 'explorer.exe' || command === 'explorer') && /^\/[a-zA-Z]+,.*$/.test(arg)) {
            return arg;
          } else {
            return "\"" + (arg.toString().replace(/"/g, '\\"')) + "\"";
          }
        });
      } else {
        cmdArgs = [];
      }
      if (/\s/.test(command)) {
        cmdArgs.unshift("\"" + command + "\"");
      } else {
        cmdArgs.unshift(command);
      }
      cmdArgs = ['/s', '/c', "\"" + (cmdArgs.join(' ')) + "\""];
      cmdOptions = _.clone(options);
      cmdOptions.windowsVerbatimArguments = true;
      return this.process = ChildProcess.spawn(process.env.comspec || 'cmd.exe', cmdArgs, cmdOptions);
    } else {
      return this.process = ChildProcess.spawn(command, args, options);
    }
  };

  module.exports = spawn;

}).call(this);

//# sourceMappingURL=index.map
