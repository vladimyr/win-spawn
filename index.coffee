_            = require 'lodash'
ChildProcess = require 'child_process'

spawn = (command, args, options) ->
  options ?= {}
  # Related to joyent/node#2318
  if process.platform is "win32"
    # Quote all arguments and escapes inner quotes
    if args?
      cmdArgs = args.filter (arg) -> arg?
      cmdArgs = cmdArgs.map (arg) ->
        if command in ['explorer.exe', 'explorer'] and /^\/[a-zA-Z]+,.*$/.test(arg)
          # Don't wrap /root,C:\folder style arguments to explorer calls in
          # quotes since they will not be interpreted correctly if they are
          arg
        else
          "\"#{arg.toString().replace(/"/g, '\\"')}\""
    else
      cmdArgs = []
    if /\s/.test(command)
      cmdArgs.unshift("\"#{command}\"")
    else
      cmdArgs.unshift(command)
    cmdArgs = ['/s', '/c', "\"#{cmdArgs.join(' ')}\""]
    cmdOptions = _.clone(options)
    cmdOptions.windowsVerbatimArguments = true
    @process = ChildProcess.spawn(process.env.comspec or 'cmd.exe', cmdArgs, cmdOptions)
  else
    @process = ChildProcess.spawn(command, args, options)

module.exports = spawn