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
const Command_1 = __importDefault(require("../Core/Commands/Command"));
/**
 * Gets the Logs the Bot has collected and sends the file to the User through a Private Message
 */
class GetLogs extends Command_1.default {
    constructor() {
        super(...arguments);
        /* <inheritdoc> */
        this.CommandName = BotCommandsEnum_1.default.GetLogs;
        /* <inheritdoc> */
        this.CommandDescription = "Returns the Log File";
        /* <inheritdoc> */
        this.IsEphemeralResponse = true;
        /* <inheritdoc> */
        this.IsCommandBlocking = false;
        /* <inheritdoc> */
        this.RunCommand = (client, interaction, dataManager) => __awaiter(this, void 0, void 0, function* () {
            this.InitializeUserResponse(interaction, this.RunningMessage);
            let logChannel = interaction.client.channels.cache.get(`${dataManager.LOG_CHANNEL_ID}`);
            this.AddToResponseMessage(this.LogMessage);
            if (logChannel) {
                interaction.user.send({ content: "Here are the Log Files", files: [`${dataManager.LOG_FILE_PATH}`] });
                this.AddToResponseMessage(this.SuccessMessage);
            }
            else {
                this.AddToResponseMessage(this.ErrorMessage + "(Log Channel ID provided does not match to a Text Channel)");
                let error = new Error("Log Channel ID provided does not match to a Text Channel");
                dataManager.AddErrorLog(error);
                throw error;
            }
        });
        this.RunningMessage = `Running ${this.CommandName} :arrows_clockwise:`;
        this.LogMessage = "Sending Log File :arrows_clockwise:";
        this.ErrorMessage = ":warning: Could not send the Log File :warning:";
        this.SuccessMessage = ":white_check_mark: Log File sent Successfully :white_check_mark:";
    }
}
module.exports = GetLogs;
