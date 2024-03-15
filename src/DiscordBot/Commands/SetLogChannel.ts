import BotCommandsEnum from "../Core/Enums/BotCommandsEnum";
import OptionTypesEnum from "../Core/Enums/OptionTypes";
import { CacheType, ChatInputCommandInteraction, TextChannel } from "discord.js";
import DefaultCommandHandler from "../Core/Defaults/DefaultCommandHandler";
import ICommand from "../Core/Interfaces/ICommand";
import Command from "../Core/Commands/Command";
import BotDataManager from "../Core/Data/BotDataManager";


class SetLogChannel extends Command implements ICommand {
    CommandName = BotCommandsEnum.SetLogChannel;
    CommandDescription = "Sets the Discord Text Channel to send Bot and Server Logs to";
    CommandFunction = (interaction: ChatInputCommandInteraction<CacheType>, BotDataManager: BotDataManager) => {

        const logChannel = interaction.options.getChannel('logchannel');

        if (logChannel && logChannel instanceof TextChannel) {
            if (logChannel)
                BotDataManager.SetLogChannelID(logChannel.id);
            else
                throw new Error("Log Channel ID provided does not match to a Text Channel");
        }
        else
            throw new Error("Log Channel provided is not a Text Channel");
    };
    ReplyMessage = "Log Channel is being set :arrows_clockwise:";
    LogMessage = "Log Channel is being set :arrows_clockwise:";
    ErrorMessage = ":warning: Could not set the Log Channel, the Channel provided is not Text Channel :warning:";
    SuccessMessage = ":white_check_mark: Log Channel has been set Successfully :white_check_mark:";
    FailMessages = [];
    Options = [
        {
            type: OptionTypesEnum.Channel,
            name: "logchannel",
            description: "Channel ID to send Bot and Server Logs to",
            required: true
        }
    ];
    CommandHandler = DefaultCommandHandler.Instance();
}

export = SetLogChannel;