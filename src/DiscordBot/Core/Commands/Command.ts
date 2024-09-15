import ICommand from "../Interfaces/ICommand";
import ICommandOption from "../Interfaces/ICommandOption";
import BotDataManager from "../Data/BotDataManager";
import { CacheType, ChatInputCommandInteraction, Client, InteractionResponse, Attachment, AttachmentBuilder } from 'discord.js';
import ICommandHandler from "../Interfaces/ICommandHandler";
import DefaultCommandHandler from "../Defaults/DefaultCommandHandler";
import BotResponse from "../Communication/BotResponse";
import BotData from "../Data/BotData";
import CommandData from "../Data/CommandData";

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
    public Response: BotResponse | undefined = undefined;

    /* <inheritdoc> */
    public UserResponse: InteractionResponse | undefined;

    /**
     * Boolean Flag to indicate when the Response Instance sent to the User has been received and the Promise has been accomplished
     */
    private _responseReceived: boolean = false;

    constructor(commandData: CommandData) {
        this.DataManager = commandData.DataManager;

        //this.SetCommandData(commandData);
    }

    public SetCommandData(commandData: CommandData) {

        console.log(`Setting Command Data : ${this.IsEphemeralResponse}`);
        if (commandData.CommandInteraction)
            this.Response = new BotResponse(commandData.CommandInteraction, this.IsEphemeralResponse);
    }

    public AddToMessage(content: string, delayUpdate: boolean = false): void {
        this.Response?.AddMessage(content, delayUpdate);
    }

    public AddFileToMessage(filePath: string, delayUpdate: boolean = false): void {
        this.Response?.AddFile(filePath, delayUpdate);
    }

    public AddTextFileToMessage(content: string, fileName: string, delayUpdate: boolean = false): void {
        this.Response?.AddTextFile(content, fileName, delayUpdate);
    }

    ///* <inheritdoc> */
    //public InitializeUserResponse(interaction: ChatInputCommandInteraction<CacheType>, message: string): void {
    //
    //    if (!this.Response)
    //        this.Response = new BotResponse(interaction);
    //
    //    this.Response.content = message + "\n";
    //    const reply = interaction.reply({ content: this.Response.content, ephemeral: this.IsEphemeralResponse });
    //
    //    this.DataManager.SetLastMessageChannelID(interaction.channelId);
    //
    //    reply.then((interactionResponse: InteractionResponse) => {
    //        this.UserResponse = interactionResponse;
    //        this._responseReceived = true;
    //    });
    //}
    //
    ///* <inheritdoc> */
    //public AddToResponseMessage(content: string): void {
    //    this.Response.content += content + "\n";
    //    this.UpdateResponse();
    //}
    //
    //public AddTextFileToResponseMessage(content: string, fileName: string): void {
    //    const buffer = Buffer.from(content, 'utf-8');
    //    const file = new AttachmentBuilder(buffer, { name: `${fileName}.txt` });
    //
    //    this.Response.files?.push(file);
    //
    //    this.UpdateResponse();
    //}
    //
    ///* <inheritdoc> */
    //public AddFileToResponseMessage(filePath: string): void {
    //
    //    if (!this.Response.files?.some(file => file === filePath)) {
    //        this.Response.files?.push(filePath);
    //    }
    //
    //    this.UpdateResponse();
    //}
    //
    ///**
    // * Updates the Bot Response sent to the User created from {@link InitializeUserResponse}
    // */
    //private UpdateResponse(): void {
    //
    //    const attemptToAdd = () => {
    //        if ((new Date(this.Response.CreatedDate.getUTCDate() - Date.now())).getMinutes() > BotResponse.MAX_RESPONSE_MINS) {
    //            console.log("Response has Taken too long, it's been over 15 minutes");
    //            return;
    //        }
    //
    //        if (this._responseReceived)
    //            this.UserResponse?.edit(this.Response);
    //        else
    //            setTimeout(attemptToAdd, 100);
    //    };
    //
    //    attemptToAdd();
    //}
}

export default Command;