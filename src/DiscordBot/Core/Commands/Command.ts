import ICommand from "../Interfaces/ICommand";
import ICommandOption from "../Interfaces/ICommandOption";
import BotDataManager from "../Data/BotDataManager";
import { CacheType, ChatInputCommandInteraction, Client, Message, MessageCreateOptions, MessagePayload, MessagePayloadOption, VoiceStateEditOptions } from 'discord.js';
import ICommandHandler from "../Interfaces/ICommandHandler";
import DefaultCommandHandler from "../Defaults/DefaultCommandHandler";
import BotResponse from "../Response/BotResponse";
import CommandLogger from "../Logging/CommandLogger";

/**
 * Represents a Command for a Discord Bot
 */
abstract class Command implements ICommand {
    public abstract CommandName: string;
    public abstract CommandDescription: string;
    public abstract RunCommand: (client: Client, interaction: ChatInputCommandInteraction<CacheType>, BotDataManager: BotDataManager) => void;
    public abstract ReplyMessage: string;
    public abstract LogMessage: string;
    public abstract ErrorMessage: string;
    public abstract SuccessMessage: string;
    public abstract IsEphemeralResponse: boolean;


    public FailMessages?: string[];
    public Options?: ICommandOption[];


    public CommandHandler: ICommandHandler = DefaultCommandHandler.Instance();
    public EphemeralResponse: BotResponse = new BotResponse();
    public Response: BotResponse = new BotResponse();

    private Logger: CommandLogger = new CommandLogger();


    public AddToResponseMessage(content: string): void {
        this.EphemeralResponse.content += content + "\n";
    }

    public AddToLogMessage(content: string): void {

        this.Response.content += content + "\n";
    }

    public AddToAllResponseMessages(content: string): void {
        this.AddToResponseMessage(content);
        this.AddToLogMessage(content);
    }

    public async InitializeCommandLogger(interaction: ChatInputCommandInteraction<CacheType>, client: Client) {
        this.AddToAllResponseMessages(`Running ${interaction.commandName} :arrows_clockwise:`)
        await this.Logger.InitializeResponse(interaction, client, this.IsEphemeralResponse, this.Response)

    }

    public LogAndRespond(): void {

        this.Logger.LogAndRespond(this.Response, this.EphemeralResponse);
    }
}

export default Command;