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
const BotCommandsEnum_1 = __importDefault(require("../Core/Enums/BotCommandsEnum"));
const OptionTypes_1 = __importDefault(require("../Core/Enums/OptionTypes"));
const discord_js_1 = require("discord.js");
const Command_1 = __importDefault(require("../Core/Commands/Command"));
/**
 * Sets the Log Channel where the non Ephemeral Responses will be sent.
 */
class SetLogChannel extends Command_1.default {
    constructor() {
        super(...arguments);
        this.CommandName = BotCommandsEnum_1.default.SetLogChannel;
        this.CommandDescription = "Sets the Discord Text Channel to send Bot and Server Logs to";
        this.IsEphemeralResponse = true;
        this.IsCommandBlocking = false;
        this.RunCommand = (client, interaction, dataManager) => __awaiter(this, void 0, void 0, function* () {
            //this.InitializeUserResponse(interaction, this.RunningMessage);
            this.AddToMessage(this.RunningMessage);
            const logChannel = interaction.options.getChannel('logchannel');
            //this.AddToResponseMessage(this.LogMessage)
            this.AddToMessage(this.LogMessage);
            if (logChannel && logChannel instanceof discord_js_1.TextChannel) {
                if (logChannel) {
                    dataManager.SetLogChannelID(logChannel.id);
                    //this.AddToResponseMessage(this.SuccessMessage)
                    this.AddToMessage(this.SuccessMessage);
                }
                else {
                    //this.AddToResponseMessage(this.ErrorMessage + "(Log Channel ID provided does not match to a Text Channel)")
                    this.AddToMessage(this.ErrorMessage + "(Log Channel ID provided does not match to a Text Channel)");
                    let error = new Error("Log Channel ID provided does not match to a Text Channel");
                    dataManager.AddErrorLog(error);
                    throw error;
                }
            }
            else {
                //this.AddToResponseMessage(this.ErrorMessage + "(Log Channel provided is not a Text Channel)")
                this.AddToMessage(this.ErrorMessage + "(Log Channel provided is not a Text Channel)");
                let error = new Error("Log Channel ID provided does not match to a Text Channel");
                dataManager.AddErrorLog(error);
                throw error;
            }
        });
        this.RunningMessage = `Running ${this.CommandName} :arrows_clockwise:`;
        this.LogMessage = "Log Channel is being set :arrows_clockwise:";
        this.ErrorMessage = ":warning: Could not set the Log Channel, the Channel provided is not Text Channel :warning:";
        this.SuccessMessage = ":white_check_mark: Log Channel has been set Successfully :white_check_mark:";
        this.Options = [
            {
                type: OptionTypes_1.default.Channel,
                name: "logchannel",
                description: "Channel ID to send Bot and Server Logs to",
                required: true
            }
        ];
    }
}
module.exports = SetLogChannel;
