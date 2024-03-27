import BotCommandsEnum from "../Core/Enums/BotCommandsEnum";
import { CacheType, ChatInputCommandInteraction, Client, TextChannel } from "discord.js";
import BotDataManager from "../Core/Data/BotDataManager";
import Command from "../Core/Commands/Command";

class GetLogs extends Command {
    CommandName = BotCommandsEnum.GetLogs;
    CommandDescription = "Returns the Log File";
    IsEphemeralResponse: boolean = false;
    RunCommand = (client: Client, interaction: ChatInputCommandInteraction<CacheType>, dataManager: BotDataManager) => {
        this.AddToAllResponseMessages(this.ReplyMessage);

        let logChannel = interaction.client.channels.cache.get(`${dataManager.LOG_CHANNEL_ID}`) as TextChannel

        if (logChannel) {
            interaction.user.send({ content: "Here are the Log Files", files: [`${dataManager.LOG_FILE_PATH}`] })

            this.AddToAllResponseMessages(this.SuccessMessage);
        }
        else {
            this.AddToResponseMessage(this.ErrorMessage + "(Log Channel ID provided does not match to a Text Channel)");
            this.AddToLogMessage(this.ErrorMessage);
            throw new Error("Log Channel ID provided does not match to a Text Channel");
        }

        this.LogAndRespond();
    };
    ReplyMessage = "Sending Log File :arrows_clockwise:";
    LogMessage = "Sending Log File :arrows_clockwise:";
    ErrorMessage = ":warning: Could not send the Log File :warning:";
    SuccessMessage = ":white_check_mark: Log File sent Successfully :white_check_mark:";
}

export = GetLogs;