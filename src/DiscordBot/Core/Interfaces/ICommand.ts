import IDiscordCommand from "./IDiscordCommand";
import BotDataManager from "../Data/BotDataManager";
import { CacheType, ChatInputCommandInteraction, Client, MessageCreateOptions } from 'discord.js';
import ICommandHandler from "./ICommandHandler";
import BotResponse from "../Response/BotResponse";

/**
 * Describes the structure of a command for a Discord Bot
 */
interface ICommand extends IDiscordCommand {

    /**
     * The message to reply with when the command is executed successfully.
     */
    ReplyMessage: string;

    /**
     * Function that is executed when the command is run
     * @param BotDataManager BotDataManager that contains all Bot Settings
     * @param interaction Interaction instance that triggered running the command
     * @returns void
     */
    RunCommand: (client: Client, interaction: ChatInputCommandInteraction<CacheType>, BotDataManager: BotDataManager) => void;

    /**
     * The message to log when the command is executed.
     */
    LogMessage: string;

    /**
     * The error message to display when the command fails.
     */
    ErrorMessage: string;

    /**
     * The success message to display when the command succeeds.
     */
    SuccessMessage: string;

    /**
     * The array of fail messages to display when the command fails.
     */
    FailMessages?: string[];

    /**
     * Boolean Flag determining if the Response to the User will be Ephemeral or Not
     */
    IsEphemeralResponse: boolean;

    /**
     * The Custom Command Handler for the command
     * @param BotDataManager Data Manager that contains all Bot Settings
     * @param interaction Interaction instance that triggered running the command
     * @returns Nothing
     */
    CommandHandler: ICommandHandler;

    /**
     * The Ephemeral Response sent back to the User who called the Command
     */
    EphemeralResponse: BotResponse;

    /**
     * The Response sent back to the User that is visible to everyone
     */
    Response: BotResponse;
}

export default ICommand;