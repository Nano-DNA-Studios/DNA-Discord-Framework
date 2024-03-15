"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const BotCommandsEnum_1 = __importDefault(require("../Core/Enums/BotCommandsEnum"));
const OptionTypes_1 = __importDefault(require("../Core/Enums/OptionTypes"));
const discord_js_1 = require("discord.js");
const DefaultCommandHandler_1 = __importDefault(require("../Core/Defaults/DefaultCommandHandler"));
const Command_1 = __importDefault(require("../Core/Commands/Command"));
class SetLogChannel extends Command_1.default {
    constructor() {
        super(...arguments);
        this.CommandName = BotCommandsEnum_1.default.SetLogChannel;
        this.CommandDescription = "Sets the Discord Text Channel to send Bot and Server Logs to";
        this.CommandFunction = (interaction, BotDataManager) => {
            const logChannel = interaction.options.getChannel('logchannel');
            if (logChannel && logChannel instanceof discord_js_1.TextChannel) {
                if (logChannel)
                    BotDataManager.SetLogChannelID(logChannel.id);
                else
                    throw new Error("Log Channel ID provided does not match to a Text Channel");
            }
            else
                throw new Error("Log Channel provided is not a Text Channel");
        };
        this.ReplyMessage = "Log Channel is being set :arrows_clockwise:";
        this.LogMessage = "Log Channel is being set :arrows_clockwise:";
        this.ErrorMessage = ":warning: Could not set the Log Channel, the Channel provided is not Text Channel :warning:";
        this.SuccessMessage = ":white_check_mark: Log Channel has been set Successfully :white_check_mark:";
        this.FailMessages = [];
        this.Options = [
            {
                type: OptionTypes_1.default.Channel,
                name: "logchannel",
                description: "Channel ID to send Bot and Server Logs to",
                required: true
            }
        ];
        this.CommandHandler = DefaultCommandHandler_1.default.Instance();
    }
}
module.exports = SetLogChannel;
