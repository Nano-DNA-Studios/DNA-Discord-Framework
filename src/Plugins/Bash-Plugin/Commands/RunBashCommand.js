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
const Command_1 = __importDefault(require("../../../DiscordBot/Core/Commands/Command"));
const OptionTypes_1 = __importDefault(require("../../../DiscordBot/Core/Enums/OptionTypes"));
const BotCommandsEnum_1 = __importDefault(require("../../../DiscordBot/Core/Enums/BotCommandsEnum"));
const BashScriptRunner_1 = __importDefault(require("../BashScriptRunner"));
const fs_1 = __importDefault(require("fs"));
/**
 * Gets the Logs the Bot has collected and sends the file to the User through a Private Message
 */
class RunBashCommand extends Command_1.default {
    constructor() {
        super(...arguments);
        /* <inheritdoc> */
        this.CommandName = BotCommandsEnum_1.default.RunBashCommand;
        /* <inheritdoc> */
        this.CommandDescription = "Returns the Log File";
        /* <inheritdoc> */
        this.IsEphemeralResponse = true;
        /* <inheritdoc> */
        this.IsCommandBlocking = true;
        /* <inheritdoc> */
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
            if (runner.StandardOutputLogs.length > 1900) {
                const filePath = dataManager.TEMP_DATA_SAVE_PATH + `/bashResult.txt`;
                try {
                    fs_1.default.rmSync(filePath);
                }
                catch (e) {
                    if (e instanceof Error)
                        dataManager.AddErrorLog(e);
                }
                fs_1.default.writeFileSync(filePath, runner.StandardOutputLogs);
                this.AddFileToResponseMessage(filePath);
            }
            else
                this.AddToResponseMessage("Results: \n" + runner.StandardOutputLogs);
        });
        /**
         * The Running Message
         */
        this.RunningMessage = `Running ${this.CommandName} :arrows_clockwise:`;
        /**
         * The Log Message
         */
        this.LogMessage = "Bash Command is running :arrows_clockwise:";
        /* <inheritdoc> */
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
