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
const BotCommandsEnum_1 = __importDefault(require("../../DiscordBot/Core/Enums/BotCommandsEnum"));
const Command_1 = __importDefault(require("../../DiscordBot/Core/Commands/Command"));
const OptionTypes_1 = __importDefault(require("../../DiscordBot/Core/Enums/OptionTypes"));
const BashScriptRunner_1 = __importDefault(require("../BashScriptRunner"));
/**
 * Gets the Logs the Bot has collected and sends the file to the User through a Private Message
 */
class RunBashCommand extends Command_1.default {
    constructor() {
        super(...arguments);
        this.CommandName = BotCommandsEnum_1.default.RunBashCommand;
        this.CommandDescription = "Returns the Log File";
        this.IsEphemeralResponse = true;
        this.RunCommand = (client, interaction, dataManager) => __awaiter(this, void 0, void 0, function* () {
            this.InitializeUserResponse(interaction, this.RunningMessage);
            const command = interaction.options.getString("command");
            let runner = new BashScriptRunner_1.default();
            if (command) {
                this.AddToResponseMessage(this.LogMessage);
                yield runner.RunLocally(command);
            }
            else {
                this.AddToResponseMessage("Command has not been provided");
            }
            this.AddToResponseMessage("Results: \n" + runner.StandardOutputLogs);
        });
        this.RunningMessage = `Running ${this.CommandName} :arrows_clockwise:`;
        this.LogMessage = "Bash Command is running :arrows_clockwise:";
        this.ErrorMessage = ":warning: Could not run the Bash Command :warning:";
        this.SuccessMessage = ":white_check_mark: Bash Command ran Successfully :white_check_mark:";
        this.Options = [
            {
                type: OptionTypes_1.default.String,
                name: "command",
                description: "The Bash Command to run",
                required: true
            }
        ];
    }
}
module.exports = RunBashCommand;
