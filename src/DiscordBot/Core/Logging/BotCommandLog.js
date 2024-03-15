"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Class representing an instance of a Discord Bot Log
 */
class BotCommandLog {
    constructor(interaction) {
        this.User = interaction.user.username;
        this.LogCommand = interaction.commandName;
        this.LogMessage = "";
        this.LogDate = new Date();
    }
    /**
     * Adds an additional message to the Log Instance
     * @param message Message to add to the Log
     */
    AddLogMessage(message) {
        this.LogMessage += message + "\n";
    }
}
exports.default = BotCommandLog;
