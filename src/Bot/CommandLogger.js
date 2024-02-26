"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const BotCommandLog_1 = __importDefault(require("./BotCommandLog"));
class CommandLogger {
    /**
    * Initializes all info needed for the Response to the Command
    * @param interaction Command Interaction
    * @param client Discord Bot Client
    * @param BotDataManager Data Manager
    */
    static InitializeResponse(interaction, client, dataManager) {
        return __awaiter(this, void 0, void 0, function* () {
            this.ResponseMessage = `Running ${interaction.commandName} :arrows_clockwise: \n`;
            this.LogChannel = client.channels.cache.get(`${dataManager.LOG_CHANNEL_ID}`);
            this.Response = (yield interaction.reply({ content: this.ResponseMessage, ephemeral: true }));
        });
    }
    /**
     * Logs the Command and Responds to the User
     * @param message Message to Log and Respond
     */
    static LogAndRespond(message) {
        var _a;
        (_a = this.LogChannel) === null || _a === void 0 ? void 0 : _a.send(message);
        this.ResponseMessage += `${message} \n`;
        this.Response.edit({ content: this.ResponseMessage });
    }
    static GetCommandLog(interaction) {
        let log = new BotCommandLog_1.default(interaction);
        log.AddLogMessage(this.ResponseMessage);
        return log;
    }
}
/**
 * Stores the Response Message to the Command
 */
CommandLogger.ResponseMessage = "";
module.exports = CommandLogger;
