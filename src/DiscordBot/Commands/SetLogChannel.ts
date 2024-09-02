import BotCommandsEnum from "../Core/Enums/BotCommandsEnum";
import OptionTypesEnum from "../Core/Enums/OptionTypes";
import { CacheType, ChatInputCommandInteraction, Client, TextChannel } from "discord.js";
import Command from "../Core/Commands/Command";
import BotDataManager from "../Core/Data/BotDataManager";

/**
 * Sets the Log Channel where the non Ephemeral Responses will be sent.
 */
class SetLogChannel extends Command {
    CommandName = BotCommandsEnum.SetLogChannel;
    CommandDescription = "Sets the Discord Text Channel to send Bot and Server Logs to";
    IsEphemeralResponse: boolean = true;
    IsCommandBlocking: boolean = false;
    RunCommand = (client: Client, interaction: ChatInputCommandInteraction<CacheType>, dataManager: BotDataManager) => {
        this.InitializeUserResponse(interaction, this.RunningMessage);

        const logChannel = interaction.options.getChannel('logchannel');
        this.AddToResponseMessage(this.LogMessage)

        if (logChannel && logChannel instanceof TextChannel) {
            if (logChannel) {
                dataManager.SetLogChannelID(logChannel.id);
                this.AddToResponseMessage(this.SuccessMessage)
            }
            else {
                this.AddToResponseMessage(this.ErrorMessage + "(Log Channel ID provided does not match to a Text Channel)")
                let error = new Error("Log Channel ID provided does not match to a Text Channel");
                dataManager.AddErrorLog(error);
                throw error;
            }
        }
        else {
            this.AddToResponseMessage(this.ErrorMessage + "(Log Channel provided is not a Text Channel)")
            let error = new Error("Log Channel ID provided does not match to a Text Channel");
            dataManager.AddErrorLog(error);
            throw error;
        }
    };
    RunningMessage = `Running ${this.CommandName} :arrows_clockwise:`;
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