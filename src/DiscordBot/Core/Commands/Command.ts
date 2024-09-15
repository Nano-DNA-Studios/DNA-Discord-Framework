import ICommand from "../Interfaces/ICommand";
import ICommandOption from "../Interfaces/ICommandOption";
import BotDataManager from "../Data/BotDataManager";
import { CacheType, ChatInputCommandInteraction, Client, InteractionResponse } from 'discord.js';
import ICommandHandler from "../Interfaces/ICommandHandler";
import DefaultCommandHandler from "../Defaults/DefaultCommandHandler";
import BotResponse from "../Communication/BotResponse";
import CommandData from "../Data/CommandData";
import BotCommunication from "../Communication/BotCommunication";
import DefaultBotCommunication from "../Communication/DefaultBotCommunication";

//Split this into a Configure and Execute part?

/**
 * Represents a Command for a Discord Bot
 */
abstract class Command implements ICommand {

    /* <inheritdoc> */
    public abstract CommandName: string;

    /* <inheritdoc> */
    public abstract CommandDescription: string;

    public DataManager: BotDataManager;

    /* <inheritdoc> */
    public abstract RunCommand: (client: Client, interaction: ChatInputCommandInteraction<CacheType>, BotDataManager: BotDataManager) => void;

    /* <inheritdoc> */
    public abstract IsEphemeralResponse: boolean;

    /* <inheritdoc> */
    public abstract IsCommandBlocking: boolean;

    /* <inheritdoc> */
    public FailMessages?: string[];

    /* <inheritdoc> */
    public Options?: ICommandOption[];

    /* <inheritdoc> */
    public CommandHandler: ICommandHandler = DefaultCommandHandler.Instance();

    /* <inheritdoc> */
    public Response: BotCommunication = new DefaultBotCommunication();

    /* <inheritdoc> */
    public UserResponse: InteractionResponse | undefined;

    constructor(dataManager: BotDataManager) {
        this.DataManager = dataManager;
    }

    /* <inheritdoc> */
    public SetCommandData(commandData: CommandData): void {
        if (commandData.CommandInteraction)
            this.Response = new BotResponse(commandData.CommandInteraction, this.IsEphemeralResponse);
    }

    /* <inheritdoc> */
    public AddToMessage(content: string, delayUpdate: boolean = false): void {
        this.Response.AddMessage(content, delayUpdate);
    }

    /* <inheritdoc> */
    public AddFileToMessage(filePath: string, delayUpdate: boolean = false): void {
        this.Response.AddFile(filePath, delayUpdate);
    }

    /* <inheritdoc> */
    public AddTextFileToMessage(content: string, fileName: string, delayUpdate: boolean = false): void {
        this.Response.AddTextFile(content, fileName, delayUpdate);
    }
}

export default Command;