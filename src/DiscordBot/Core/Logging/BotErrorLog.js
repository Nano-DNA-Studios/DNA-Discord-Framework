"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Class representing an instance of a Discord Bot Error Log
 */
class BotErrorLog {
    /**
     * Default Constructor for a Bot Error Log
     * @param message The Error Instance
     */
    constructor(message) {
        this.ExceptionDate = new Date();
        this.ExceptionMessage = message.message;
        this.ExceptionName = message.name;
        if (message.stack == null)
            this.ExceptionStack = "No Stack Trace Available";
        else
            this.ExceptionStack = message.stack;
    }
}
exports.default = BotErrorLog;
