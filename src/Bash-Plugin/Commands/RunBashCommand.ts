import BotCommandsEnum from "../../DiscordBot/Core/Enums/BotCommandsEnum";
import { CacheType, ChatInputCommandInteraction, Client, TextChannel } from "discord.js";
import BotDataManager from "../../DiscordBot/Core/Data/BotDataManager";
import Command from "../../DiscordBot/Core/Commands/Command";
import OptionTypesEnum from "../../DiscordBot/Core/Enums/OptionTypes";
import BashScriptRunner from "../BashScriptRunner";

/**
 * Gets the Logs the Bot has collected and sends the file to the User through a Private Message
 */
class RunBashCommand extends Command {
    CommandName = BotCommandsEnum.RunBashCommand;
    CommandDescription = "Returns the Log File";
    IsEphemeralResponse = true;
    RunCommand = async (client: Client, interaction: ChatInputCommandInteraction<CacheType>, dataManager: BotDataManager) => {
        this.InitializeUserResponse(interaction, this.RunningMessage);

        const command = interaction.options.getString("command");

        let runner = new BashScriptRunner();

        if (command) {
            this.AddToResponseMessage(this.LogMessage)
           
            await runner.RunLocally(command);
        }
        else { this.AddToResponseMessage("Command has not been provided"); }

        this.AddToResponseMessage("Results: \n" + runner.StandardOutputLogs);

    };
    RunningMessage = `Running ${this.CommandName} :arrows_clockwise:`;
    LogMessage = "Bash Command is running :arrows_clockwise:";
    ErrorMessage = ":warning: Could not run the Bash Command :warning:";
    SuccessMessage = ":white_check_mark: Bash Command ran Successfully :white_check_mark:";
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