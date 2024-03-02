"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const BotCommandsEnum_1 = __importDefault(require("./BotCommandsEnum"));
const DefaultCommandHandler_1 = __importDefault(require("../Bot/DefaultCommandHandler"));
const Command_1 = __importDefault(require("../Bot/Command"));
class GetLogs extends Command_1.default {
    constructor() {
        super(...arguments);
        this.CommandName = BotCommandsEnum_1.default.GetLogs;
        this.CommandDescription = "Returns the Log File";
        this.CommandFunction = (interaction, dataManager) => {
            let logChannel = interaction.client.channels.cache.get(`${dataManager.LOG_CHANNEL_ID}`);
            if (logChannel)
                logChannel.send({ files: [`${dataManager.LOG_FILE_PATH}`] });
            else
                throw new Error("Log Channel ID provided does not match to a Text Channel");
        };
        this.ReplyMessage = "Sending Log File :arrows_clockwise:";
        this.LogMessage = "Sending Log File :arrows_clockwise:";
        this.ErrorMessage = ":warning: Could not send the Log File :warning:";
        this.SuccessMessage = ":white_check_mark: Log File sent Successfully :white_check_mark:";
        this.FailMessages = [];
        this.Options = [];
        this.CommandHandler = DefaultCommandHandler_1.default.Instance();
    }
}
module.exports = GetLogs;
