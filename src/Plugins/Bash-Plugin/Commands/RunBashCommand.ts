import BotDataManager from "../../../DiscordBot/Core/Data/BotDataManager";
import Command from "../../../DiscordBot/Core/Commands/Command";
import OptionTypesEnum from "../../../DiscordBot/Core/Enums/OptionTypes";
import BotCommandsEnum from "../../../DiscordBot/Core/Enums/BotCommandsEnum";
import { CacheType, ChatInputCommandInteraction, Client } from "discord.js";
import BashScriptRunner from "../BashScriptRunner";
import fs from "fs";

/**
 * Gets the Logs the Bot has collected and sends the file to the User through a Private Message
 */
class RunBashCommand extends Command {
    /* <inheritdoc> */
    CommandName = BotCommandsEnum.RunBashCommand;

    /* <inheritdoc> */
    CommandDescription = "Returns the Log File";

    /* <inheritdoc> */
    IsEphemeralResponse = true;

    /* <inheritdoc> */
    IsCommandBlocking: boolean = true;

    /* <inheritdoc> */
    RunCommand = async (client: Client, interaction: ChatInputCommandInteraction<CacheType>, dataManager: BotDataManager) => {
        //this.InitializeUserResponse(interaction, this.RunningMessage);
        this.AddToMessage(this.RunningMessage);

        const command = interaction.options.getString("command");

        let runner = new BashScriptRunner();

        if (command) {
            this.AddToMessage(this.LogMessage);
            await runner.RunLocally(command);
        }

        else { this.AddToMessage("Command has not been provided"); }

        if (runner.StandardOutputLogs.length > 1900) {
            const filePath = dataManager.TEMP_DATA_SAVE_PATH + `/bashResult.txt`;
            try { fs.rmSync(filePath); } catch (e) {
                if (e instanceof Error)
                    dataManager.AddErrorLog(e);
            }
            fs.writeFileSync(filePath, runner.StandardOutputLogs);
            this.AddFileToMessage(filePath);
        } else
            this.AddToMessage("Results: \n" + runner.StandardOutputLogs);
    };

    /**
     * The Running Message
     */
    RunningMessage = `Running ${this.CommandName} :arrows_clockwise:`;

    /**
     * The Log Message
     */
    LogMessage = "Bash Command is running :arrows_clockwise:";

    /* <inheritdoc> */
    Options = [
        {
            type: OptionTypesEnum.String,
            name: "command",
            description: "The Bash Command to run",
            required: true
        }
    ]
}

export = RunBashCommand;