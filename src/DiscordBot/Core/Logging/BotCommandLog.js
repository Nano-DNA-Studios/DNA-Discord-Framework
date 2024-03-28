"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BotResponse_1 = __importDefault(require("../Response/BotResponse"));
/**
 * Class representing an instance of a Discord Bot Log
 */
class BotCommandLog {
    /* <inheritdoc */
    constructor(interaction) {
        this.User = interaction.user.username;
        this.LogCommand = interaction.commandName;
        this.LogMessage = new BotResponse_1.default();
        this.LogDate = new Date();
    }
    /**
     * Adds an additional message to the Log Instance
     * @param message Message to add to the Log
     */
    AddLogMessage(message) {
        this.LogMessage = message;
    }
}
exports.default = BotCommandLog;
