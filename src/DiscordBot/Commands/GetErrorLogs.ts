import { Client, ChatInputCommandInteraction, CacheType } from "discord.js";
import Command from "../Core/Commands/Command";
import BotDataManager from "../Core/Data/BotDataManager";
import BotCommandsEnum from "../Core/Enums/BotCommandsEnum";

/**
 * Gets the Error Logs the Bot has collected and sends the file to the User through a Private Message
 */
class GetErrorLogs extends Command {
    /* <inheritdoc> */
    CommandName = BotCommandsEnum.GetErrorLogs;

    /* <inheritdoc> */
    CommandDescription = "Sends the Error Log File to the User through a Private Message";

    /* <inheritdoc> */
    IsEphemeralResponse = true;

    /* <inheritdoc> */
    IsCommandBlocking: boolean = false;

    /* <inheritdoc> */
    RunCommand = async (client: Client, interaction: ChatInputCommandInteraction<CacheType>, dataManager: BotDataManager) => {
        this.InitializeUserResponse(interaction, this.RunningMessage);
        this.AddToResponseMessage(this.LogMessage)
        interaction.user.send({ content: "Here are the Error Log Files", files: [`${dataManager.ERROR_LOG_FILE_PATH}`] })
        this.AddToResponseMessage(this.SuccessMessage);
    };

    RunningMessage = `Running ${this.CommandName} :arrows_clockwise:`;

    LogMessage = "Sending Error Log File :arrows_clockwise:";

    ErrorMessage = ":warning: Could not send the Error Log File :warning:";

    SuccessMessage = ":white_check_mark: Error Log File sent Successfully :white_check_mark:";
}

export = GetErrorLogs;