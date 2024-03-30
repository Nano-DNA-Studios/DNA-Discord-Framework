import ICommand from "../Interfaces/ICommand";
import ICommandOption from "../Interfaces/ICommandOption";
import BotDataManager from "../Data/BotDataManager";
import { CacheType, ChatInputCommandInteraction, Client, InteractionResponse } from 'discord.js';
import ICommandHandler from "../Interfaces/ICommandHandler";
import DefaultCommandHandler from "../Defaults/DefaultCommandHandler";
import BotResponse from "../Response/BotResponse";

//Split this into a Configure and Execute part?

/**
 * Represents a Command for a Discord Bot
 */
abstract class Command implements ICommand {

    /* <inheritdoc> */
    public abstract CommandName: string;

    /* <inheritdoc> */
    public abstract CommandDescription: string;

    /* <inheritdoc> */
    public abstract RunCommand: (client: Client, interaction: ChatInputCommandInteraction<CacheType>, BotDataManager: BotDataManager) => void;

    /* <inheritdoc> */
    public abstract IsEphemeralResponse: boolean;

    /* <inheritdoc> */
    public FailMessages?: string[];

    /* <inheritdoc> */
    public Options?: ICommandOption[];

    /* <inheritdoc> */
    public CommandHandler: ICommandHandler = DefaultCommandHandler.Instance();

    /* <inheritdoc> */
    public Response: BotResponse = new BotResponse();

    /* <inheritdoc> */
    public UserResponse: InteractionResponse | undefined;

    /**
     * Boolean Flag to indicate when the Response Instance sent to the User has been received and the Promise has been accomplished
     */
    private _responseReceived: boolean = false;

    /* <inheritdoc> */
    public InitializeUserResponse(interaction: ChatInputCommandInteraction<CacheType>, message: string): void {
        this.Response.content = message + "\n";
        const reply = interaction.reply({ content: this.Response.content, ephemeral: this.IsEphemeralResponse });

        reply.then((interactionResponse: InteractionResponse) => {
            this.UserResponse = interactionResponse;
            this._responseReceived = true;
        });
    }

    /* <inheritdoc> */
    public AddToResponseMessage(content: string): void {
        const attemptToAdd = () => {
            if (this._responseReceived)
                this.UserResponse?.edit(this.Response);
            else
                setTimeout(attemptToAdd, 100);
        };

        this.Response.content += content + "\n";
        attemptToAdd();
    }
}

export default Command;