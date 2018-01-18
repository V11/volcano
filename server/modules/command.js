/**
 * Created by kurpav on 6/10/15.
 */
var LIGHT = "light",
    MEDIUM = "medium",
    ADVANCED = "advanced";

module.exports.buildCommand = function(url, mode, commands) {
    var command = '';
    switch (mode) {
        case LIGHT:
            command = commands[LIGHT];
            break;
        case MEDIUM:
            command = commands[MEDIUM];
            break;
        case ADVANCED:
            command = commands[ADVANCED];
            break;
    }
    command = command.replace('%url', url);
    return command;
};