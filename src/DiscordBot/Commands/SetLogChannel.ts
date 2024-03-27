import BotCommandsEnum from "../Core/Enums/BotCommandsEnum";
import OptionTypesEnum from "../Core/Enums/OptionTypes";
import { CacheType, ChatInputCommandInteraction, Client, TextChannel } from "discord.js";
import Command from "../Core/Commands/Command";
import BotDataManager from "../Core/Data/BotDataManager";
import BotData from "../Core/Data/BotData";


class SetLogChannel extends Command {
    CommandName = BotCommandsEnum.SetLogChannel;
    CommandDescription = "Sets the Discord Text Channel to send Bot and Server Logs to";
    IsEphemeralResponse: boolean = false;
    RunCommand = (client: Client, interaction: ChatInputCommandInteraction<CacheType>, dataManager: BotDataManager) => {
        this.AddToAllResponseMessages(this.ReplyMessage)

        const logChannel = interaction.options.getChannel('logchannel');

        if (logChannel && logChannel instanceof TextChannel) {
            if (logChannel) {
                dataManager.SetLogChannelID(logChannel.id);
                this.AddToAllResponseMessages(this.SuccessMessage)
            }
            else {
                this.AddToAllResponseMessages(this.ErrorMessage + "(Log Channel ID provided does not match to a Text Channel)")
                throw new Error("Log Channel ID provided does not match to a Text Channel");
            }
        }
        else {
            this.AddToAllResponseMessages(this.ErrorMessage + "(Log Channel provided is not a Text Channel)")
            throw new Error("Log Channel provided is not a Text Channel");
        }

        this.LogAndRespond();
    };
    ReplyMessage = "Log Channel is being set :arrows_clockwise:";
    LogMessage = "Log Channel is being set :arrows_clockwise:";
    ErrorMessage = ":warning: Could not set the Log Channel, the Channel provided is not Text Channel :warning:";
    SuccessMessage = ":white_check_mark: Log Channel has been set Successfully :white_check_mark:";
    Options = [
        {
            type: OptionTypesEnum.Channel,
            name: "logchannel",
            description: "Channel ID to send Bot and Server Logs to",
            required: true
        }
    ];
}

export = SetLogChannel;