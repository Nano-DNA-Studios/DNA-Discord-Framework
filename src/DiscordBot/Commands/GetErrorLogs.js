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
const Command_1 = __importDefault(require("../Core/Commands/Command"));
const BotCommandsEnum_1 = __importDefault(require("../Core/Enums/BotCommandsEnum"));
/**
 * Gets the Error Logs the Bot has collected and sends the file to the User through a Private Message
 */
class GetErrorLogs extends Command_1.default {
    constructor() {
        super(...arguments);
        /* <inheritdoc> */
        this.CommandName = BotCommandsEnum_1.default.GetErrorLogs;
        /* <inheritdoc> */
        this.CommandDescription = "Sends the Error Log File to the User through a Private Message";
        /* <inheritdoc> */
        this.IsEphemeralResponse = true;
        /* <inheritdoc> */
        this.IsCommandBlocking = false;
        /* <inheritdoc> */
        this.RunCommand = (client, interaction, dataManager) => __awaiter(this, void 0, void 0, function* () {
            // this.InitializeUserResponse(interaction, this.RunningMessage);
            //this.AddToResponseMessage(this.LogMessage)
            this.AddToMessage(this.RunningMessage);
            this.AddToMessage(this.LogMessage);
            interaction.user.send({ content: "Here are the Error Log Files", files: [`${dataManager.ERROR_LOG_FILE_PATH}`] });
            this.AddToMessage(this.SuccessMessage);
            // this.AddToResponseMessage(this.SuccessMessage);
        });
        this.RunningMessage = `Running ${this.CommandName} :arrows_clockwise:`;
        this.LogMessage = "Sending Error Log File :arrows_clockwise:";
        this.ErrorMessage = ":warning: Could not send the Error Log File :warning:";
        this.SuccessMessage = ":white_check_mark: Error Log File sent Successfully :white_check_mark:";
    }
}
module.exports = GetErrorLogs;
