import BotCommandsEnum from "../Core/Enums/BotCommandsEnum";
import { CacheType, ChatInputCommandInteraction, Client, TextChannel } from "discord.js";
import BotDataManager from "../Core/Data/BotDataManager";
import Command from "../Core/Commands/Command";
import BashScriptRunner from "../../Bash-Plugin/BashScriptRunner";

/**
 * Gets the Logs the Bot has collected and sends the file to the User through a Private Message
 */
class GetLogs extends Command {
    CommandName = BotCommandsEnum.GetLogs;
    CommandDescription = "Returns the Log File";
    IsEphemeralResponse = true;
    RunCommand = async (client: Client, interaction: ChatInputCommandInteraction<CacheType>, dataManager: BotDataManager) => {
        this.InitializeUserResponse(interaction, this.RunningMessage);

        let logChannel = interaction.client.channels.cache.get(`${dataManager.LOG_CHANNEL_ID}`) as TextChannel;
        this.AddToResponseMessage(this.LogMessage)

        if (logChannel) {
            interaction.user.send({ content: "Here are the Log Files", files: [`${dataManager.LOG_FILE_PATH}`] })
            this.AddToResponseMessage(this.SuccessMessage);
        }
        else {
            this.AddToResponseMessage(this.ErrorMessage + "(Log Channel ID provided does not match to a Text Channel)");
            throw new Error("Log Channel ID provided does not match to a Text Channel");
        }
    };
    RunningMessage = `Running ${this.CommandName} :arrows_clockwise:`;
    LogMessage = "Sending Log File :arrows_clockwise:";
    ErrorMessage = ":warning: Could not send the Log File :warning:";
    SuccessMessage = ":white_check_mark: Log File sent Successfully :white_check_mark:";
}

export = GetLogs;