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
Object.defineProperty(exports, "__esModule", { value: true });
const BotDataManager_1 = __importDefault(require("../Data/BotDataManager"));
const BotCommandLog_1 = __importDefault(require("./BotCommandLog"));
const BotData_1 = __importDefault(require("../Data/BotData"));
/**
 * Logs the Command Responses and Stores the Log
 */
class CommandLogger {
    /**
    * Initializes all info needed for the Response to the Command
    * @param interaction Command Interaction
    * @param client Discord Bot Client
    * @param BotDataManager Data Manager
    */
    InitializeResponse(interaction, client, isEphemeral, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataManager = BotData_1.default.Instance(BotDataManager_1.default);
            // let ResponseMessage = `Running ${interaction.commandName} :arrows_clockwise: \n`;
            let LogChannel = client.channels.cache.get(`${dataManager.LOG_CHANNEL_ID}`);
            this.Response = (yield interaction.reply({ content: response.content, ephemeral: isEphemeral }));
            this.LogMessage = yield LogChannel.send({ content: response.content });
        });
    }
    LogInChannel(logMessage) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            (_a = this.LogMessage) === null || _a === void 0 ? void 0 : _a.edit(logMessage);
        });
    }
    RespondToUser(response) {
        var _a;
        (_a = this.Response) === null || _a === void 0 ? void 0 : _a.edit(response);
    }
    /**
     * Logs the Command and Responds to the User
     * @param message Message to Log and Respond
     */
    LogAndRespond(logMessage, response) {
        this.LogInChannel(logMessage);
        this.RespondToUser(response);
    }
    GetCommandLog(interaction) {
        let log = new BotCommandLog_1.default(interaction);
        // log.AddLogMessage(this.ResponseMessage);
        return log;
    }
}
exports.default = CommandLogger;
