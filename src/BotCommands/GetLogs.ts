import BotCommandsEnum from "./BotCommandsEnum";
import { CacheType, ChatInputCommandInteraction, TextChannel } from "discord.js";
import DefaultCommandHandler from "../Bot/DefaultCommandHandler";
import ICommand from "../Bot/ICommand";
import Command from "../Bot/Command";
import BotDataManager from "../Bot/BotDataManager";

class GetLogs extends Command implements ICommand {
    CommandName = BotCommandsEnum.GetLogs;
    CommandDescription = "Returns the Log File";
    CommandFunction = (interaction: ChatInputCommandInteraction<CacheType>, dataManager: BotDataManager) => {

        let logChannel = interaction.client.channels.cache.get(`${dataManager.LOG_CHANNEL_ID}`) as TextChannel
        
        if (logChannel)
            logChannel.send({ files: [`${dataManager.LOG_FILE_PATH}`] });
        else
        throw new Error("Log Channel ID provided does not match to a Text Channel");
       
    };
    ReplyMessage = "Sending Log File :arrows_clockwise:";
    LogMessage = "Sending Log File :arrows_clockwise:";
    ErrorMessage = ":warning: Could not send the Log File :warning:";
    SuccessMessage = ":white_check_mark: Log File sent Successfully :white_check_mark:";
    FailMessages = [];
    Options = [];
    CommandHandler = DefaultCommandHandler.Instance();
}

export default GetLogs;